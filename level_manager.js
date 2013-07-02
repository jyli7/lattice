;(function(exports) {
  var LevelManager = function(game, canvas) {
    this.game = game;
    this.levels = {};
  };

  LevelManager.prototype.currentLevelFn = function () {
    return this.levels[this.currentLevelNum];
  }

  LevelManager.prototype.addLevel = function(levelNum, levelFn) {
    this.levels[levelNum] = levelFn;
  }

  LevelManager.prototype.removeLevel = function(levelNum, stateName) {
    delete this.levels[levelNum];
  }

  exports.LevelManager = LevelManager;
})(this);