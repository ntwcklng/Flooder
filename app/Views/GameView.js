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
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Settings />
          <Grid />
        </View>
      </ScrollView>
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

