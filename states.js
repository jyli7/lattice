;(function(exports) {
  var States = function(game, canvasId, tickInterval) {
    this.game = game;
    this.game.states = this.game.states || {};
  };

  States.prototype.addState = function(stateName, stateFn) {
    this.game.states[stateName] = stateFn;
  }

  States.prototype.removeState = function(stateName) {
    delete this.game.states[stateName];
  }

  exports.States = States;
})(this);