import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');

var balance = "";

var getBalance = function(done) {
  firebase_client.getBalance((res) => {
    if (res.error) {
      balance = "Error";
      done({loading: false, email: ""});
    }
    else {
      balance = +(JSON.stringify(res.balance));
      done({loading: false, email: res.email});
    }
  });
}

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this._doneLoading = this._doneLoading.bind(this);
    this._logout = this._logout.bind(this);
    this.state = {
      loading: true,
      email: ""
    }
    getBalance(this._doneLoading);
  }

  _logout() {
    firebase_client.signOut();

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  _doneLoading(data) {
    this.setState(data);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.loading ? "" : "Email: " + this.state.email}</Text>
        <Text style={styles.text}>{this.state.loading ? "" : "Balance: $" + balance}</Text>
        <Button onPress={this._logout} title="Logout"/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    alignItems: 'center',
    paddingTop: 25,
  },
  text: {
    margin: 10,
  	color: '#FFC228',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
