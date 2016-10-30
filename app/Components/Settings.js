/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Slider,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import GameActions from '../Actions/GameActions';
import GameStore from '../Store/GameStore';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      value: GameStore.getState().grid,
    };
  }
  settingsVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _onValueChange(val) {
    GameActions.updateGrid(val);
    this.setState({
      value: val
    });
  }
  componentDidMount() {
  }
  render() {
    const sliderWidth = Dimensions.get('window').width - 40;
    return (
      <View style={{flexDirection: 'row',  justifyContent: 'space-between'}}>
        <View style={{flex: .5}}>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => {GameActions.updateRefreshHelper(!GameStore.getState().refreshHelper)}}><Icon name='refresh' size={30} color='#1abc9c' /></TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => {this.settingsVisible(true)}}><Icon name='cog' size={30} color='#34495e' /></TouchableOpacity>
          <Modal
            visible={this.state.modalVisible}
            animationType='slide'
            onRequestClose={() => {}}
            transparent={false}>
            <View style={styles.modalContainer}>
              <View style={{marginTop: 30,}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#34495e', margin: 7, textAlign: 'center',}}>Spielfeldgröße: {this.state.value}x{this.state.value}</Text>
                <Slider
                  style={{alignSelf: 'center',height: 20, margin: 5, width: sliderWidth}}
                  onValueChange={(val) => { this._onValueChange(val) }}
                  minimumValue={4}
                  maximumValue={20}
                  step={4}
                  value={this.state.value}
                />
              </View>
              <TouchableOpacity style={{marginTop: 50, alignSelf: 'flex-end'}} onPress={() => this.settingsVisible(false)}><Icon name='check' size={48} color='#1abc9c' /></TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsIcon: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
  },
});

