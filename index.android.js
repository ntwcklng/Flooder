/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import GameView from './app/Views/GameView';

export default class Flooder extends Component {
  render() {
    return (
      <View style={styles.container}>
        <GameView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('Flooder', () => Flooder);
