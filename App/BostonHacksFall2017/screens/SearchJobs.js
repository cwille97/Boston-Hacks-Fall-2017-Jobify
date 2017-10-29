import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';

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
    this._selectJob = this._selectJob.bind(this);
  }

  _selectJob() {
    this.props.navigation.navigate('CustomJob', {
      job_id: this.props.job_id,
      title: this.props.title,
      wage: this.props.wage,
      desc: this.props.desc
    });
  }

  render() {

    return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this._selectJob} style={styles.entireJob}>
            <Text style={styles.header}> {this.props.title} </Text>
            <Text style={styles.header}> {this.props.wage} </Text>
            <Text style={styles.desc}> {this.props.desc} </Text>
          </TouchableOpacity>
        </View>
    );
  }

}

export default class SearchJobs extends React.Component {
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
      if (thisJob.accepted || thisJob.user == userid) continue;
      renderJobs.push(
        <Job navigation={this.props.navigation} job_id={job} title={thisJob.title} desc={thisJob.desc} wage={thisJob.wage}/>
      );
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
  header: {
    color: '#2D2D2D',
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  desc: {
    color: '#2D2D2D',
    marginTop: 20,
    fontSize: 16,
  },
});

// Orange: #FFC228
//  Black: #2D2D2D
