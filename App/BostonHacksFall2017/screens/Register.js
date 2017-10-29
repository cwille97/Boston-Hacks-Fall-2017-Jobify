import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this._newRegister = this._newRegister.bind(this);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
    }

  }

  _newRegister() {
    if (this.state.password === this.state.confirmPassword) {
      firebase_client.register(this.state.email, this.state.password, (error) => {
        if (error) this.setState({error: "Error"});
        else {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          });

          this.props.navigation.dispatch(resetAction);
        }
      });
    }
    else {
      this.setState({error: "Passwords must match"})
    }
  }

  render() {
    return(

      <View style={styles.container}>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          placeholder='email'
          placeholderTextColor='#FFC228'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='done'
          maxLength={20}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          secureTextEntry={true}
          placeholder='password'
          autoCapitalize='none'
          autoCorrect={false}
          placeholderTextColor='#FFC228'
          returnKeyType='done'
          maxLength={20}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          secureTextEntry={true}
          placeholder='confirm password'
          placeholderTextColor='#FFC228'
          returnKeyType='done'
          maxLength={20}
          onChangeText={(text) => this.setState({confirmPassword: text})}
        />
        <Text style={styles.text}>{this.state.error}</Text>
        <Button onPress={this._newRegister} title='Submit'/>
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
