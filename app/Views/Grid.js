/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const COLORS = [
  '#1abc9c',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e74c3c',
];

export default class Grid extends Component {
  constructor(props) {
    const {height, width} = Dimensions.get('window');
    super(props);
    this.state = {
      gridX: this.props.x,
      gridY: this.props.y,
      grid: [],
      clicks: 0,
      boxWidthAndHeight: width / this.props.x,
      buttonHeight: (width / COLORS.length) - 10,
    };
    this.generateGrid = this.generateGrid.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.itemPressed = this.itemPressed.bind(this);
    this.checkColor = this.checkColor.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  resetGame() {
    this.generateGrid(this.state.gridX, this.state.gridY);
  }
  generateGrid(x, y) {
    var gridObj = [];
    for (let i = 0; i <= x; i++) {
      gridObj[i] = [];
      for (let o = 0; o <= y; o++) {
        const randomColor = Math.floor(Math.random() * (COLORS.length - 1)) + 1;
        gridObj[i][o] = COLORS[randomColor];
      }
    }
    this.setState({
      grid: gridObj,
      clicks: 0
    });
  }
  componentWillMount() {
    this.generateGrid(this.state.gridX, this.state.gridY);
  }
  checkColor(lastColor, newColor, x, y) {
    let newGrid = this.state.grid;
    if (lastColor === newColor || newGrid[x][y] !== lastColor) return;
    newGrid[x][y] = newColor;
    this.setState({
      grid: newGrid
    });
    if (x > 0) {
      this.checkColor(lastColor, newColor, x - 1, y);
    }
    if (x < this.state.gridX) {
      this.checkColor(lastColor, newColor, x + 1, y);
    }
    if (y > 0) {
      this.checkColor(lastColor, newColor, x, y - 1);
    }
    if (y < this.state.gridY) {
      this.checkColor(lastColor, newColor, x, y + 1);
    }
  }
  itemPressed(color) {
    this.setState({
      clicks: this.state.clicks + 1
    });
    this.checkColor(this.state.grid[0][0], color, 0, 0);
  }
  renderGrid() {
    const render = this.state.grid.map((item, x) => {
      return (
        <View key={x} style={styles.row}>
        {this.state.grid[x].map((color, y) => {
          return (<View onPress={() => this.itemPressed(color)} key={y+x} style={{backgroundColor: color, width: this.state.boxWidthAndHeight, height: this.state.boxWidthAndHeight}}></View>)
        })}
        </View>
      );
    });
    return render;
  }
  renderButtons() {
    const render = COLORS.map((color, i) => {
      return <TouchableOpacity key={i} style={[styles.button, {backgroundColor: color, height: this.state.buttonHeight}]} onPress={() => this.itemPressed(color)} />
    });
    return render;
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderGrid()}
        <TouchableOpacity onPress={this.resetGame}><Text>Reset ({this.state.clicks})</Text></TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: 'stretch',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
});

