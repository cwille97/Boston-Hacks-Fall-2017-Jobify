import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');

export default class CustomJobs extends React.Component {
  constructor(props) {
    super(props);
    this._contact = this._contact.bind(this);
    this._acceptJob = this._acceptJob.bind(this);
  }

  _contact() {

  }

  _acceptJob () {
    firebase_client.acceptJob(this.props.navigation.state.params.job_id);

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'MyJobs' })],
    });

    this.props.navigation.dispatch(resetAction);

  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.jobName}>{this.props.navigation.state.params.title}</Text>
        <Text style={styles.wage}>{this.props.navigation.state.params.wage}</Text>
        <Text style={styles.jobDescription}>{this.props.navigation.state.params.desc}</Text>
        {/*   <Button onPress={this._contact} title='Contact buyer'/>   */}
        <Button onPress={this._acceptJob} title='Accept job'/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
  },
  jobName: {
    color: '#FFC228',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobDescription: {
    color: '#FFC228',
    margin: 10,
    fontSize: 16,
  },
  wage: {
    color: '#FFC228',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
