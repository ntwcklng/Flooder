import alt from '../alt';

class GameActions {
  updateGamestate(gamestate) {
    return gamestate;
  }
  updateGrid(grid) {
    return grid;
  }
}

module.exports = alt.createActions(GameActions);