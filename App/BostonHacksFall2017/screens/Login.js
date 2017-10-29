import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this._login = this._login.bind(this);
    this._register = this._register.bind(this);

    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  _login() {
    firebase_client.login(this.state.email, this.state.password, (error) => {
      if (error) this.setState({error: "Invalid credentials"});
      else {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });

        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  _register() {
    this.props.navigation.navigate('Register');
  }


  render() {
    return(
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          placeholder='email'
          autoCorrect={false}
          autoCapitalize='none'
          placeholderTextColor='#FFC228'
          returnKeyType='done'
          maxLength={20}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          secureTextEntry={true}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='password'
          placeholderTextColor='#FFC228'
          returnKeyType='done'
          maxLength={20}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Text style={styles.text}>{this.state.error}</Text>
        <Button onPress={this._login} color='#2D2D2D' title='Submit'/>
        <Button onPress={this._register} color='#2D2D2D' title='Register'/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2D2D2D',
    flex: 1,
    paddingTop: 15
  },
  text: {
    color: '#FFC228',
    marginBottom: 25,
    fontSize: 22,
    textAlign: 'center'
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
