import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Button from '../global/Button';

var firebase_client = require('../global/firebase_client');

var jobs = [];

var get_jobs = function(fin) {
  firebase_client.getAllJobs((data) => {
    jobs = data;
    fin({loading: false});
  })
}

class Job extends React.Component {
  constructor(props) {
    super(props);
    this._goToJobPage = this._goToJobPage.bind(this);

  }

  _goToJobPage() {
    this.props.navigation.navigate('MyJob', {
      job_id: this.props.job_id,
      title: this.props.title,
      wage: this.props.wage,
      desc: this.props.desc,
      type: this.props.type,
      accepted: this.props.accepted,
    });
  }

  render() {

    accepted = this.props.accepted;

    return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this._goToJobPage} style={styles.entireJob}>
            <Text style={styles.header}> {this.props.title} </Text>
            <Text style={styles.header}> {this.props.wage} </Text>
            <Text style={styles.type}>{this.props.type === 'employer' ? "You are the employer" : "You are the employee"}</Text>

            { this.props.type ==='employer' ?
              <Text style={{
                marginTop: 10,
                fontSize: 20,
                fontWeight: 'bold',
                color: (accepted ? 'green' : 'red')
              }}>
                {accepted ? "Accepted!" : " Not Accepted"}
              </Text>
              : null
            }

            <Text style={styles.desc}> {this.props.desc} </Text>
          </TouchableOpacity>
        </View>
    );
  }

}

export default class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.extSetState = this.extSetState.bind(this);
    get_jobs(this.extSetState);
  }

  extSetState(data) {
    this.setState(data);
  }

  render() {


    renderJobs = [];

    userid = firebase_client.currentUserId();

    for (job in jobs) {
      thisJob = jobs[job];
      if (thisJob.paid) continue;
      if (thisJob.accepted == userid) {
        renderJobs.push(
          <Job navigation={this.props.navigation} job_id={job} title={thisJob.title} desc={thisJob.desc} wage={thisJob.wage} type='employee' accepted={thisJob.accepted}/>
        );
      }
      else if (thisJob.user == userid) {
        renderJobs.push(
          <Job navigation={this.props.navigation} job_id={job} title={thisJob.title} desc={thisJob.desc} wage={thisJob.wage} type='employer' accepted={thisJob.accepted}/>
        );
      } else {
        continue;
      }
    }


    return (
      <View style={{flex: 1, backgroundColor: '#2D2D2D'}}>
        <ScrollView contentContainerStyle={styles.container}>
          {renderJobs}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
  },
  entireJob: {
    backgroundColor: '#FFC228',
    borderRadius: 15,
    flex: 1,
    margin: 15,
    padding: 15,
  },
  type: {
    color: '#2D2D2D',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    color: '#2D2D2D',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    color: '#2D2D2D',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
  },
});
