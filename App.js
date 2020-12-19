/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AppState,
} from 'react-native';
import Voice from '@react-native-community/voice'
import Tts from 'react-native-tts'
import {NavigationContainer} from '@react-navigation/native'
import Navigator from './src/navigation/Navigator';

export default class App extends Component {

  constructor(props) {
    super(props)
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      Voice.destroy()
      Tts.stop()
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange)
  }


  render() {
    return(
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    );
  }
}
