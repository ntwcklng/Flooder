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

const defaultColor = '#34495e';
const greenColor = '#1abc9c';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      value: GameStore.getState().SETTINGS.grid,
      selectedPalette: GameStore.getState().SETTINGS.selectedPalette
    };
    this._refreshGame = this._refreshGame.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
  }
  _settingsVisible(visible) {
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
  _refreshGame() {
    GameActions.updateRefreshHelper(!GameStore.getState().refreshHelper);
  }
  renderColors() {
    return colorPalette.map((palette, index) => {
      const { selectedPalette } = this.state;
      const isSelectedPalette = (selectedPalette === index);
      const unselectedOpacity = (isSelectedPalette) ? 1 : 0.3;
      const unselectedMargin = (isSelectedPalette) ? 15 : 4;
      return (
        <TouchableOpacity key={index} style={[styles.colorPickerContainer, {marginVertical: unselectedMargin}]} onPress={() => {this._onColorChange(index)}}>
          {isSelectedPalette && <Icon name='chevron-right' size={28} style={{marginRight: 6}} color={greenColor} />}
          {palette.map((color) => {
            return (
              <View style={[styles.colorPickerItem, { opacity: unselectedOpacity, backgroundColor: color }]} key={color+index} />
            )
          })}
          {isSelectedPalette && <Icon name='chevron-left' size={28} style={{marginLeft: 6}} color={greenColor} />}
        </TouchableOpacity>);
    });
  }
  render() {
    const { value, modalVisible } = this.state;
    const sliderWidth = Dimensions.get('window').width - 40;
    return (
      <View style={styles.settingsContainer}>
        <View style={{flex: .5}}>
          <TouchableOpacity style={styles.settingsIcon} onPress={this._refreshGame}>
            <Icon name='refresh' size={30} color={greenColor} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => {this._settingsVisible(true)}}>
            <Icon name='cog' size={30} color={defaultColor} />
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType='slide'
            onRequestClose={() => {}}
            transparent={false}>
            <View style={styles.modalContainer}>
              <View style={{marginTop: 30,}}>
                <Text style={styles.settingsDesc}>Spielfeldgröße: {value}x{value}</Text>
                <Slider
                  style={[styles.slider, { width: sliderWidth }]}
                  onValueChange={(val) => { this._onValueChange(val) }}
                  minimumValue={4}
                  maximumValue={24}
                  step={4}
                  value={value}
                />
              </View>
              <ScrollView ref='_scrollView'><Text style={styles.settingsDesc}>Farbpalette</Text>{this.renderColors()}</ScrollView>
              <TouchableOpacity style={styles.saveSettingsButton} onPress={() => this._settingsVisible(false)}><Icon name='check' size={48} color={greenColor} /></TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveSettingsButton: {
    marginTop: 50,
    alignSelf: 'flex-end'
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  slider: {
    alignSelf: 'center',
    height: 20,
    margin: 15
  },
  colorPickerItem: {
    height: 28,
    width: 28,
    marginHorizontal: 2,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
  },
  settingsDesc: {
    fontWeight: 'bold',
    fontSize: 22,
    color: defaultColor,
    margin: 10,
    textAlign: 'center',
  },
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

