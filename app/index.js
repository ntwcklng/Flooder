import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import GameView from './Views/GameView';

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
