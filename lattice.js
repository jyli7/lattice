;(function(exports) {

  var Lattice = function () {
  };

  Lattice.prototype.init = function (game, canvasId) {
    this.game = game;
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    this.stateManager = new StateManager(game, canvas);
    this.levelManager = new LevelManager(game, canvas);
    this.inputManager = new InputManager(game, canvas);
    this.zoneChecker = new ZoneChecker(game, canvas);

    this.canvas = canvas;    
    this.ctx = ctx;
  }

  Lattice.prototype.startLoop = function () {
    var tickInterval = 10;
    var that = this;
    
    var then = Date.now();
    this.loop = setInterval(function () {
      var nextState = that.stateManager.states[that.stateManager.currentState].call(that);
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
    this.levelManager.currentLevelObj().entities.forEach(function (entity) {
      entity.update(that.loopTimeElapsed);
    });
  }

  Lattice.prototype.draw = function () {
    var that = this;
    this.game.draw();
    this.levelManager.currentLevelObj().entities.forEach(function (entity) {
      entity.draw(that.ctx);
    });
  }

  exports.Lattice = Lattice;
})(this);

var _lattice_ = new Lattice();

;(function (exports) {
  exports.InputManager = function () {
    // Handle keyboard controls
    var keysHeldDown = {};

    // Setup keyup, keydown listeners
    addEventListener("keydown", function (e) {
      keysHeldDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
      delete keysHeldDown[e.keyCode];
    }, false);

    this.keyIsHeld = function (key) {
      return key in keysHeldDown;
    };
  }
})(this);

;(function(exports) {
  var LevelManager = function(game, canvas) {
    this.levels = {};
    this.currentLevelNum = 1;
  };

  LevelManager.prototype.currentLevelObj = function () {
    return this.levels[this.currentLevelNum];
  }

  LevelManager.prototype.addLevel = function(levelNum, levelObj) {
    this.levels[levelNum] = levelObj;
  }

  LevelManager.prototype.removeLevel = function(levelNum) {
    delete this.levels[levelNum];
  }

  exports.LevelManager = LevelManager;
})(this);

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

  exports.StateManager = StateManager;
})(this);

(function (exports) {
  /////////////////////////////////////////
  // HOW POINTS AND ZONES WORK
  /////////////////////////////////////////
  
  // POINTS have an 'x' and a 'y' attribute
  // targetZones have four attributes: yBottom, yTop, xLeft, and xRight
  // SOURCE_ZONES have 3 or 4 POINTS, depending on whether the SOURCE_ZONE is a triangle or rectangle
  
  // Examples of valid questions:
  // Is a POINT in the TARGET_ZONE?
  // Is an SOURCE_ZONE fully in the TARGET_ZONE?

  var ZoneChecker = function () {
  };

  ZoneChecker.prototype.pointInTargetZone = function (point, targetZone) {
    return ((point.y >= targetZone.yTop && point.y <= targetZone.yBottom) &&
            (point.x >= targetZone.xLeft && point.x <= targetZone.xRight));
  }

  ZoneChecker.prototype.pointInAnyOfTargetZones = function (point, targetZones) {
    var result = false;
    targetZones.forEach(function (targetZone) {
      if (this.pointInTargetZone(point, targetZone)) {
        result = true;
      };
    });
    return result;
  }

  // e.g. triangle is entirely within rectangle
  ZoneChecker.prototype.entirelyInAnyTargetZone = function (sourceZone, targetZones) {
    var result = true;
    sourceZone.points().forEach(function (point) {
      if (!this.pointInAnyOfTargetZones(point, targetZones)) {
        result = false;
      }
    });
    return result;
  }

  // e.g. triangle top tip is in specific rectangle
  ZoneChecker.prototype.vertexInTargetZone = function (sourceZone, targetZone) {
    var result = false;
    var that = this;

    sourceZone.points().forEach(function (point) {
      if (that.pointInTargetZone(point, targetZone)) {
        result = true;
      }
    });
    return result;
  }

  // e.g. triangle top tip is in any of 5 rectangles
  ZoneChecker.prototype.vertexInAnyTargetZones = function (sourceZone, targetZones) {
    var result = false;
    var that = this;
    if (targetZones) {
      targetZones.forEach(function (targetZone) {
        if (that.vertexInTargetZone(sourceZone, targetZone)) {
          result = true;
        }
      });
      return result;
    }
  }

  // e.g. if any of these triangle's vertices is in specific rectangle
  ZoneChecker.prototype.anyVertexInTargetZone = function (sourceZones, targetZone) {
    var result = false;
    var that = this;
    var relevantSourceZone;
    if (sourceZones) {
      sourceZones.forEach(function (sourceZone) {
        if (that.vertexInTargetZone(sourceZone, targetZone)) {
          result = true;
          relevantSourceZone = sourceZone;
          return false;
        }
      });
      return { result: result, sourceZone: relevantSourceZone };
    }
  }

  ZoneChecker.prototype.zonify = function (target) {
    this._mixin(target, this.mixins.zone);
  }

  ZoneChecker.prototype._mixin = function (obj, mixin) {
    for (var i in mixin) {
      obj[i] = mixin[i];
    }
  }

  ZoneChecker.prototype.mixins = {
    zone: {
      xLeft: 0
    , xRight: 0
    , yBottom: 0
    , yTop: 0
    , xMid: 0
    , width: 0
    , height: 0
    , points: function () {
      return [{x: this.xLeft, y: this.yBottom},
              {x: this.xRight, y: this.yBottom},
              {x: this.xLeft, y: this.yTop},
              {x: this.xRight, y: this.yTop}];
      }
    }
  }

  exports.ZoneChecker = ZoneChecker;
})(this);