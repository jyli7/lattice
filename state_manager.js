;(function(exports) {
  var StateManager = function(game, canvas) {
    this.states = {};
  };

  StateManager.prototype.currentStateFn = function () {
    return this.states[this.currentStateFn];
  }

  StateManager.prototype.addState = function(stateName, stateFn) {
    this.states[stateName] = stateFn;
  }

  StateManager.prototype.removeState = function(stateName) {
    delete this.states[stateName];
  }

  exports.States = States;
})(this);