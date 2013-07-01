;(function(exports) {
  var Lattice = function(game, canvasId, tickInterval) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    var tickInterval = tickInterval || 15;

    var then = Date.now();
    game.loop = setInterval(function () {
      var nextState = game.states[game.currentState].call(game);
      // if nextState is returned, update current state
      if (nextState !== undefined) {
        game.currentState = nextState;
      }

      var now = Date.now();
      game.loopTimeElapsed = (now - then) / 1000;
      then = now;
      
    }, tickInterval);
  };

  exports.Lattice = Lattice;
})(this);