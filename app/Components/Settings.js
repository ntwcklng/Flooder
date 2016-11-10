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
import colorPalette from '../Utils/colorPalette';
import COLORS from '../Utils/colors';

const styles = StyleSheet.create({
  saveSettingsButton: {
    marginTop: 50,
    marginHorizontal: 30,
    borderRadius: 5,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveSettingsButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  saveSettingsButtonIcon: {
    marginRight: 20,
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  saveSettingsButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  slider: {
    alignSelf: 'center',
    height: 20,
    margin: 15,
    padding: 20,
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
    flex:1,
  },
  settingsDesc: {
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.defaultText,
    margin: 10,
    textAlign: 'center',
  },
  settingsIcon: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      grid: GameStore.getState().SETTINGS.grid,
      selectedPalette: GameStore.getState().SETTINGS.selectedPalette,
    };
    this._refreshGame = this._refreshGame.bind(this);
    this._onColorChange = this._onColorChange.bind(this);
  }
  _settingsVisible(visible) {
    if (this.state.modalVisible) {
      // only update when the modal gets closed
      GameActions.updateGrid(this.state.grid);
      GameActions.updateColors(this.state.selectedPalette);
    }
    this.setState({modalVisible: visible});
  }
  _onColorChange(selectedPalette) {
    this.setState({
      selectedPalette
    });
  }
  _onValueChange(grid) {
    this.setState({
      grid
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
          {isSelectedPalette && <Icon name='check-square-o' size={28} style={{marginRight: 6}} color={COLORS.defaultText} />}
          {!isSelectedPalette && <Icon name='square-o' size={28} style={{marginRight: 6}} color={COLORS.defaultTextDisabled} />}
          {palette.map((color) =>
            <View style={[styles.colorPickerItem, { opacity: unselectedOpacity, backgroundColor: color }]} key={color+index} />
          )}
        </TouchableOpacity>);
    });
  }
  render() {
    const { grid, modalVisible } = this.state;
    const sliderWidth = Dimensions.get('window').width - 40;
    return (
      <View style={styles.settingsContainer}>
        <View style={{flex: .5}}>
          <TouchableOpacity style={styles.settingsIcon} onPress={this._refreshGame}>
            <Icon name='refresh' size={30} color={COLORS.green} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => {this._settingsVisible(true)}}>
            <Icon name='cogs' size={30} color={COLORS.defaultText} />
          </TouchableOpacity>
          <Modal
            visible={modalVisible}
            animationType='slide'
            onRequestClose={() => {/* function req. for android */}}
            transparent={false}>
            <View style={[styles.modalContainer, {width: Dimensions.get('window').width}]}>
              <View style={{flex:1}}>
                  <Text style={styles.settingsDesc}>Spielfeldgröße: {grid}x{grid}</Text>
                  <Slider
                    style={[styles.slider, { width: sliderWidth }]}
                    onValueChange={(val) => { this._onValueChange(val) }}
                    minimumValue={8}
                    maximumValue={20}
                    step={2}
                    value={grid}
                  />
                <Text style={styles.settingsDesc}>Farbpalette</Text>
                <View style={{height: 250}}>
                  <ScrollView>
                    {this.renderColors()}
                  </ScrollView>
                </View>
                <TouchableOpacity style={styles.saveSettingsButton} onPress={() => this._settingsVisible(false)}>
                  <View style={styles.saveSettingsButtonView}>
                    <Icon name='save' size={22} color={COLORS.white} style={styles.saveSettingsButtonIcon}/>
                    <Text style={styles.saveSettingsButtonText}>Speichern</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}


