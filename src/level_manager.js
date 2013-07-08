;(function(exports) {
  var LevelManager = function(game, canvas) {
    this.levels = {};
    this.currentLevelNum = 1;
  };

  LevelManager.prototype.currentLevelObj = function () {
    return this.levels[this.currentLevelNum];
  }

  LevelManager.prototype.addLevel = function(levelNum, levelObj) {
    this.levels[levelNum] = levelObj;
  }

  LevelManager.prototype.removeLevel = function(levelNum, stateName) {
    delete this.levels[levelNum];
  }

  exports.LevelManager = LevelManager;
})(this);