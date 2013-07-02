;(function(exports) {
  var LevelManager = function(game, levelNum, levelFn) {
    this.game = game;
    this.game.levels = this.game.levels || {};
  };

  LevelManager.prototype.addLevel = function(levelNum, levelFn) {
    this.game.levels[levelNum] = levelFn;
  }

  LevelManager.prototype.removeLevel = function(levelNum, stateName) {
    delete this.game.levels[levelNum];
  }


  exports.LevelManager = LevelManager;
})(this);