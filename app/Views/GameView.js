import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import Grid from '../Components/Grid';
import Settings from '../Components/Settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topWrapper: {
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
  },
});

export default function GameView() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topWrapper} />
        <Settings />
        <Grid />
      </View>
    </ScrollView>
  );
}
