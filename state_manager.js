;(function(exports) {
  var StateManager = function(game, canvas) {
    this.game = game;
    this.states = {};
  };

  StateManager.prototype.addState = function(stateName, stateFn) {
    this.states[stateName] = stateFn;
  }

  StateManager.prototype.removeState = function(stateName) {
    delete this.states[stateName];
  }

  exports.States = States;
})(this);