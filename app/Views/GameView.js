/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Grid from './Grid';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <TouchableOpacity style={styles.settingsIcon} onPress={() => {this.setState({x: 10, y: 10})}}><Icon name='cog' size={30} color='#34495e' /></TouchableOpacity>
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

