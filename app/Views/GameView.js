/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';

import Grid from '../Components/Grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../Components/Settings';

export default class GameView extends Component {
  constructor(props) {
    super();
    this.state = {
      gridSize: 14,
      refresh: false,
    };
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Settings
            gridSize={this.state.gridSize}
            onChange={(val) => this.setState({ gridSize })}
            refreshGame={() => this.setState({ refresh: !this.state.refresh }) }
            />
          <Grid gridSize={this.state.gridSize} refreshGame={this.state.refresh} />
        </View>
      </ScrollView>
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

