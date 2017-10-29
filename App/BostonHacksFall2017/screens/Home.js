import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../global/Button';
import {NavigationActions} from 'react-navigation';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this._searchButtonPressed = this._searchButtonPressed.bind(this);
    this._addButtonPressed = this._addButtonPressed.bind(this);
    this._myJobs = this._myJobs.bind(this);
    this._myAccount = this._myAccount.bind(this);
  }

  _searchButtonPressed() {
    this.props.navigation.navigate('SearchJobs');
  }

  _addButtonPressed() {
    this.props.navigation.navigate('AddJobs');
  }

  _myJobs() {
    this.props.navigation.navigate('MyJobs');
  }

  _myAccount() {
    this.props.navigation.navigate('MyAccount');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome!</Text>
        <Button onPress={this._addButtonPressed} title="Add a New Job"/>
        <Button onPress={this._searchButtonPressed} title="Search For a Job"/>
        <Button onPress={this._myJobs} title="My Jobs"/>
        <Button onPress={this._myAccount} title="My Account"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
  },
  text: {
    color: '#FFC228',
    margin: 25,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

// Orange: #FFC228
//  Black: #2D2D2D
