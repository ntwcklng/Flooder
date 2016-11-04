import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import hasWon from '../Utils/hasWon';
import GameStore from '../Store/GameStore';
import colorPalette from '../Utils/colors';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: GameStore.getState().SETTINGS.grid,
      selectedPalette: GameStore.getState().SETTINGS.selectedPalette,
      grid: [],
      clicks: 0,
      boxWidthAndHeight: 0,
      buttonHeight: 0,
    };
    this._generateGrid = this._generateGrid.bind(this);
    this._renderButtons = this._renderButtons.bind(this);
    this._itemPressed = this._itemPressed.bind(this);
    this._checkColor = this._checkColor.bind(this);
    this._resetGame = this._resetGame.bind(this);
    this._onStoreChange = this._onStoreChange.bind(this);
  }
  componentDidMount() {
    GameStore.listen(this._onStoreChange);
  }
  componentWillUnMount() {
    GameStore.unlisten(this._onStoreChange);
  }
  componentWillMount() {
    this._resetGame();
  }
  _onStoreChange(store) {
    this.setState({
      gridSize: store.SETTINGS.grid,
      selectedPalette: store.SETTINGS.selectedPalette
    }, this._resetGame);
  }
  _updateSize(gridSize) {
    const {height, width} = Dimensions.get('window');
    this.setState({
      boxWidthAndHeight: width / gridSize,
      buttonHeight: (width / colorPalette[this.state.selectedPalette].length) - 10,
    });
  }
  _resetGame() {
    this._generateGrid(this.state.gridSize);
  }
  _generateGrid(gridSize) {
    const x = gridSize;
    const y = gridSize;
    var gridObj = [];
    for (let i = 0; i < x; i++) {
      gridObj[i] = [];
      for (let o = 0; o < y; o++) {
        const randomColor = Math.floor(Math.random() * (colorPalette[this.state.selectedPalette].length));
        gridObj[i][o] = colorPalette[this.state.selectedPalette][randomColor];
      }
    }
    this.setState({
      grid: gridObj,
      clicks: 0
    }, this._updateSize(gridSize));
  }
  _checkColor(lastColor, newColor, x, y) {
    let newGrid = this.state.grid;
    if (lastColor === newColor || newGrid[x][y] !== lastColor) return;
    newGrid[x][y] = newColor;
    this.setState({
      grid: newGrid
    });
    if (x > 0) {
      this._checkColor(lastColor, newColor, x - 1, y);
    }
    if (x < this.state.gridSize - 1) {
      this._checkColor(lastColor, newColor, x + 1, y);
    }
    if (y > 0) {
      this._checkColor(lastColor, newColor, x, y - 1);
    }
    if (y < this.state.gridSize - 1) {
      this._checkColor(lastColor, newColor, x, y + 1);
    }

  }
  _itemPressed(color) {
    this.setState({
      clicks: this.state.clicks + 1
    }, () => {
      this._checkColor(this.state.grid[0][0], color, 0, 0);
      if (hasWon(this.state.grid, color)) {
        Alert.alert(`Gewonnen!`, `Du hast ${this.state.clicks} züge gebraucht.`, [{text: 'OK', onPress: () => this._resetGame()}]);
      }
    });
  }
  _renderGrid() {
    return this.state.grid.map((item, x) => {
      return (
        <View key={x} style={styles.row}>
        {this.state.grid[x].map((color, y) => {
          return (<View key={y+x} style={{backgroundColor: color, width: this.state.boxWidthAndHeight, height: this.state.boxWidthAndHeight}}></View>)
        })}
        </View>
      );
    });
  }
  _renderButtons() {
    return (
      <View style={styles.colorPickerContainer}>
        {colorPalette[this.state.selectedPalette].map((color, i) => {
          return <TouchableOpacity key={i} style={[styles.button, {backgroundColor: color, height: this.state.buttonHeight}]} onPress={() => this._itemPressed(color)} />
        })}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.zuegeText}>
          <Text style={{color: '#34495e'}}>{this.state.clicks}</Text>
        </Text>
        {this._renderGrid()}
        {this._renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  colorPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6
  },
  zuegeText:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    marginHorizontal: 5,
    marginVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 1,
    flex: 1,
    alignSelf: 'stretch',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
});

