;(function(exports) {
  var States = function(game, canvas) {
    this.game = game;
    this.
  };

  States.prototype.addState = function(stateName, stateFn) {
    this.game.states[stateName] = stateFn;
  }

  States.prototype.removeState = function(stateName) {
    delete this.game.states[stateName];
  }

  exports.States = States;
})(this);