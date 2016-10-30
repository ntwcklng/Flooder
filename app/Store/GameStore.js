import alt from '../alt';
import GameActions from '../Actions/GameActions';

class GameStore {
  constructor() {
    this.gamestate = false;
    this.grid = 14;

    this.bindListeners({
      handleUpdateGameState: GameActions.UPDATE_GAMESTATE,
      handleUpdateGrid: GameActions.UPDATE_GRID
    });
  }
  handleUpdateGrid(gridSize) {
    this.grid = gridSize;
  }
  handleUpdateGameState(gamestate) {
    this.gamestate = gamestate;
  }
}

module.exports = alt.createStore(GameStore, 'GameStore');