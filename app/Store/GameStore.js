import alt from '../alt';
import GameActions from '../Actions/GameActions';

class GameStore {
  constructor() {
    this.refreshHelper = false;
    this.grid = 14;

    this.bindListeners({
      handleUpdateGameState: GameActions.UPDATE_REFRESH_HELPER,
      handleUpdateGrid: GameActions.UPDATE_GRID
    });
  }
  handleUpdateGrid(gridSize) {
    this.grid = gridSize;
  }
  handleUpdateGameState(refreshHelper) {
    this.refreshHelper = refreshHelper;
  }
}

module.exports = alt.createStore(GameStore, 'GameStore');