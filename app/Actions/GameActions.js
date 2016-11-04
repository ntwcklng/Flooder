import alt from '../Utils/alt';

export class GameActions {
  updateRefreshHelper(refreshHelper) {
    return refreshHelper;
  }
  updateGrid(grid) {
    return grid;
  }
  updateColors(selected) {
    return selected;
  }
}

export default alt.createActions(GameActions);