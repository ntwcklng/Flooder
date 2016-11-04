import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Slider,
  Dimensions,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import GameActions from '../Actions/GameActions';
import GameStore from '../Store/GameStore';
import colorPalette from '../Utils/colors';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      value: GameStore.getState().SETTINGS.grid,
      selectedPalette: GameStore.getState().SETTINGS.selectedPalette
    };
    this.refreshGame = this.refreshGame.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
  }
  settingsVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _onColorChange(selected) {
    GameActions.updateColors(selected);
    this.setState({
      selectedPalette: selected
    });
  }
  _onValueChange(val) {
    GameActions.updateGrid(val);
    this.setState({
      value: val
    });
  }
  refreshGame() {
    GameActions.updateRefreshHelper(!GameStore.getState().refreshHelper);
  }
  renderColors() {
    return colorPalette.map((palette, index) => {
      const { selectedPalette } = this.state;
      const unselected = (selectedPalette === index) ? 1 : 0.3;
      return (
        <TouchableOpacity key={index} style={{flexDirection: 'row', margin: 10,}} onPress={() => {this._onColorChange(index)}}>
          {selectedPalette === index && <Icon name='chevron-right' size={20} style={{marginRight: 6}} color='limegreen'/>}
          {palette.map((color) => {
            return (
              <View style={{backgroundColor: color, height: 20, width: 20, marginHorizontal: 2, opacity: unselected}} key={color+index} />
            )
          })}
          {selectedPalette === index && <Icon name='chevron-left' size={20} style={{marginLeft: 6}} color='limegreen'/>}
        </TouchableOpacity>);
    });
  }
  render() {
    const sliderWidth = Dimensions.get('window').width - 40;
    return (
      <View style={{flexDirection: 'row',  justifyContent: 'space-between', flex: 1}}>
        <View style={{flex: .5}}>
          <TouchableOpacity style={styles.settingsIcon} onPress={this.refreshGame}><Icon name='refresh' size={30} color='#1abc9c' /></TouchableOpacity>
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
                <Text style={styles.settingsDesc}>Spielfeldgröße: {this.state.value}x{this.state.value}</Text>
                <Slider
                  style={{alignSelf: 'center',height: 20, margin: 15, width: sliderWidth}}
                  onValueChange={(val) => { this._onValueChange(val) }}
                  minimumValue={4}
                  maximumValue={20}
                  step={4}
                  value={this.state.value}
                />
              </View>
              <ScrollView><Text style={styles.settingsDesc}>Farbpalette</Text>{this.renderColors()}</ScrollView>
              <TouchableOpacity style={{marginTop: 50, alignSelf: 'flex-end'}} onPress={() => this.settingsVisible(false)}><Icon name='check' size={48} color='#1abc9c' /></TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsDesc: {fontWeight: 'bold', fontSize: 20, color: '#34495e', margin: 10, textAlign: 'center',},
  settingsIcon: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
  },
});

