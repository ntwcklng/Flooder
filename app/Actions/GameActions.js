import alt from '../alt';

export class GameActions {
  updateRefreshHelper(refreshHelper) {
    return refreshHelper;
  }
  updateGrid(grid) {
    return grid;
  }
}

export default alt.createActions(GameActions);