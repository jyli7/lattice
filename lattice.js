;(function(exports) {
  var Lattice = function(game, canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    this.stateManager = new Lattice.StateManager(game, canvas);
    this.levelManager = new Lattice.LevelManager(game, canvas);
    
    this.ctx = ctx;
    this.game = game;

    var tickInterval = 10;
    var that = this;
    
    var then = Date.now();
    this.loop = setInterval(function () {
      var nextState = that.states[that.currentState].call(that);
      // if nextState is returned, update current state
      if (nextState !== undefined) {
        that.currentState = nextState;
      }

      var now = Date.now();
      that.loopTimeElapsed = (now - then) / 1000;
      then = now;
      
    }, tickInterval);
  };

  Lattice.prototype.startGame = function () {
    // Set up the canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    // Init the game
    var game = new Game(level, difficulty);

    this.game.ctx = ctx;
    // this.game.init(ctx);
    // this.game.draw(ctx);

    var then = Date.now();
    var that = this;

    // MAIN GAME LOOP
    this.game.loop = setInterval(function () {
      if (!that.game.isPaused) {
        var nextState = that.game.states[that.game.currentState].call(that.game);
        // if nextState is returned, update current state
        if (nextState !== undefined) {
          that.game.currentState = nextState;
        }
      }

      var now = Date.now();
      this.game.loopTimeElapsed = (now - then) / 1000;
      then = now;
      
    }, 10); // Execute as fast as possible
  }

  exports.Lattice = Lattice;
})(this);