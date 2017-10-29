import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

import Home from './Home';
import AddJobs from './AddJobs';
import SearchJobs from './SearchJobs';
import Register from './Register';
import Login from './Login';
import CustomJob from './CustomJob';
import MyJobs from './MyJobs';
import MyJob from './MyJob';
import MyAccount from './MyAccount';

export const HomeNavStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: "Home"
      })
    },
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({
        title: 'Register'
      })
    },
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        title: "Login"
      })
    },
    AddJobs: {
      screen: AddJobs,
      navigationOptions: ({navigation}) => ({
        title: "Add a Job"
      })
    },
    SearchJobs: {
      screen: SearchJobs,
      navigationOptions: ({navigation}) => ({
        title: "Find Jobs"
      })
    },
    CustomJob: {
      screen: CustomJob,
      navigationOptions: ({navigation}) => ({
        title: "Insert Custom Job Title"
      })
    },
    MyJobs: {
      screen: MyJobs,
      navigationOptions: ({navigation}) => ({
        title: "My Jobs"
      })
    },
    MyJob: {
      screen: MyJob,
      navigationOptions: ({navigation}) => ({
        title: "My Job"
      })
    },
    MyAccount: {
      screen: MyAccount,
      navigationOptions: ({navigation}) => ({
        title: "My Account"
      })
    },
  },
  {
    initialRouteName: 'Login',
  }
);
