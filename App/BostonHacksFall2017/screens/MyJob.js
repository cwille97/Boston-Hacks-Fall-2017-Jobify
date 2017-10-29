import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');
var stripe_client = require('../global/stripe_client');

export default class MyJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance_t: ""
    }
    this._transferMoney = this._transferMoney.bind(this);
    this._cancel = this._cancel.bind(this);
  }

  _transferMoney() {
    if (!isNaN(this.state.balance_t)) {
      balance_num = +this.state.balance_t;
      stripe_client.charge(balance_num);
      firebase_client.payJob(this.props.navigation.state.params.job_id, this.props.navigation.state.params.accepted, balance_num);

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });

      this.props.navigation.dispatch(resetAction);

    }
    else {
      this.setState({error: "Enter a valid number."});
    }
  }

  _cancel () {
    if (this.props.navigation.state.params.type === 'employer') {
      // Remove job for good.
      firebase_client.deleteJob(this.props.navigation.state.params.job_id);
    } else {
      // Remove accepted user.
      firebase_client.unacceptJob(this.props.navigation.state.params.job_id);
    }

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
        <Button onPress={this._cancel} title='Cancel Job'/>
        { this.props.navigation.state.params.type === 'employer' && this.props.navigation.state.params.accepted
          ?
          <View>
            <TextInput
              underlineColorAndroid='rgba(0,0,0,0)'
              style={styles.textInput}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='payment amount'
              placeholderTextColor='#FFC228'
              returnKeyType='done'
              maxLength={6}
              onChangeText={(text) => this.setState({balance_t: text})}
            />
            <Button onPress={this._transferMoney} title='Pay Employee'/>
          </View>
          : null
        }
        <Text style={styles.text}>{this.state.error}</Text>
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
  text: {
    color: '#FFC228',
    marginBottom: 25,
    fontSize: 22,
    textAlign: 'center'
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
  textInput: {
    fontSize: 18,
    borderColor: '#FFC228',
    borderWidth: 2,
    color: '#FFC228',
    borderRadius: 8,
    padding: 15,
    margin: 20
  },
});
