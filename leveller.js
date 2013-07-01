;(function(exports) {
  var Leveller = function(game, levelNum, levelFn) {
    this.game = game;
    this.game.levels = this.game.levels || {};
  };

  Leveller.prototype.addLevel = function(levelNum, levelFn) {
    this.game.levels[levelNum] = levelFn;
  }

  Leveller.prototype.removeLevel = function(levelNum, stateName) {
    delete this.game.levels[levelNum];
  }


  exports.Leveller = Leveller;
})(this);