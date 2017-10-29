import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../global/Button';
import { NavigationActions } from 'react-navigation';

var firebase_client = require('../global/firebase_client');

export default class AddJobs extends React.Component {
  constructor(props) {
    super(props);
    this._submitJob = this._submitJob.bind(this);
    this.state = {
      title: "",
      desc: "",
      wage: ""
    }
  }

  _submitJob() {
    firebase_client.submitJob(this.state.title, this.state.desc, this.state.wage);

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'MyJobs' })],
    });

    this.props.navigation.dispatch(resetAction);

  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.text}>Enter a job name:</Text>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          placeholder="(up to 30 characters)"
          placeholderTextColor = '#FFC228'
          returnKeyType='done'
          maxLength={30}
          onChangeText={(text) => this.setState({title: text})}
        />
        <Text style={styles.text}>Enter a job description:</Text>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          placeholder="(up to 500 words)"
          placeholderTextColor='#FFC228'
          multiline={true}
          returnKeyType='done'
          maxLength={1000}
          onChangeText={(text) => this.setState({desc: text})}
        />
        <Text style={styles.text}>Enter a wage:</Text>
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.textInput}
          placeholder="(in USD)"
          placeholderTextColor = '#FFC228'
          returnKeyType='done'
          maxLength={30}
          onChangeText={(text) => this.setState({wage: text})}
        />
        <Button onPress={this._submitJob} title='Submit Job Offer'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
  	color: '#FFC228',
    marginTop: 10,
    marginLeft: 20,
    fontSize: 22,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#2D2D2D',
    padding: 10,
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

// Orange: #FFC228
//  Black: #2D2D2D
