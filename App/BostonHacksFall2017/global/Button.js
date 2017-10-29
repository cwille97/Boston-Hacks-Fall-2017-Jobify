import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={{
          margin: 20,
          backgroundColor: '#FFC228',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          padding: 15
        }}
      >
        <Text style={{color: '#2D2D2D', fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
