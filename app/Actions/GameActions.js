import alt from '../alt';

class GameActions {
  updateRefreshHelper(refreshHelper) {
    return refreshHelper;
  }
  updateGrid(grid) {
    return grid;
  }
}

module.exports = alt.createActions(GameActions);