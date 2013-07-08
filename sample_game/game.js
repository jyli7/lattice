;(function(exports) {
  var Game = function(canvasId, width, height) {
  };

  Game.prototype = {
    init: function() {
      _lattice_.levelManager.addLevel(1, new FirstLevel(this));
      _lattice_.stateManager.addState('playing', playingState);

      _lattice_.stateManager.addState('gameOver', gameOverState);      
      _lattice_.stateManager.currentState = 'playing';
    },

    update: function() {
    },

    draw: function(ctx) {
      _lattice_.ctx.clearRect(0, 0, _lattice_.canvas.width, _lattice_.canvas.height);
    },

  };

  exports.Game = Game;
})(this);