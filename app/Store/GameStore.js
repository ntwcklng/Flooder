import alt from '../Utils/alt';
import GameActions from '../Actions/GameActions';

export class GameStore {
  constructor() {
    this.refreshHelper = false;
    this.SETTINGS = {
      grid: 14,
      selectedPalette: 0
    }

    this.bindListeners({
      handleUpdateGameState: GameActions.UPDATE_REFRESH_HELPER,
      handleUpdateGrid: GameActions.UPDATE_GRID,
      handleUpdateColors: GameActions.UPDATE_COLORS
    });
  }

  handleUpdateGrid(gridSize) {
    this.SETTINGS.grid = gridSize;
  }
  handleUpdateColors(selected) {
    this.SETTINGS.selectedPalette = selected;
  }
  handleUpdateGameState(refreshHelper) {
    this.refreshHelper = refreshHelper;
  }
}

export default alt.createStore(GameStore, 'GameStore');