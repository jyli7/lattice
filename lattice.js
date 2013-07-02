var lattice = Lattice.new();

;(function(exports) {

  var Lattice = function () {
  };

  Lattice.prototype.init = function (game, canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    this.stateManager = new StateManager(game, canvas);
    this.levelManager = new LevelManager(game, canvas);
    this.inputManager = new UserInput(game, canvas);
  
    this.canvas = canvas;    
    this.ctx = ctx;

    var tickInterval = 10;
    var that = this;
    
    var then = Date.now();
    this.loop = setInterval(function () {
      var nextState = that.stateManager.states[that.currentState].call(that);
      // if nextState is returned, update current state
      if (nextState !== undefined) {
        that.currentState = nextState;
      }

      var now = Date.now();
      that.loopTimeElapsed = (now - then) / 1000;
      then = now;
      
    }, tickInterval);
  }


  Lattice.prototype.update = function () {
    var that = this;
    this.game.update();
    this.lat.levelManager.currentLevelObj.entities.forEach(function (entity) {
      entity.update(that.ctx);
    });
  }

  Lattice.prototype.draw = function () {
    var that = this;
    this.game.draw();
    this.levelManager.currentLevelObj.entities.forEach(function (entity) {
      entity.draw(that.ctx);
    });
  }

  exports.Lattice = Lattice;
})(this);