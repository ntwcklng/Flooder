/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';

import Grid from '../Components/Grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../Components/Settings';

export default class GameView extends Component {
  constructor(props) {
    super();
    this.state = {
      x: 14,
      y: 14,
    };
  }
  render() {
    return (
      <View style={styles.container}>
      <Settings x={this.state.x} onChange={(val) => this.setState({x: val, y: val})}/>
        <Grid x={this.state.x} y={this.state.y}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: 15,
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

