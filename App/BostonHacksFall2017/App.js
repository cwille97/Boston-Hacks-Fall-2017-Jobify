import React from 'react';
import {View} from 'react-native';

import {HomeNavStack} from './screens/HomeNavStack';
var firebase_client = require('./global/firebase_client');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    firebase_client.init();
  }

  render() {
    return (
      <View style={{marginTop: 24, flex: 1}}>
        <HomeNavStack />
      </View>
    );
  }
}
