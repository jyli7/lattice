#Lattice

A lightweight framework for making JavaScript games. Handles user input, game states, level management, and collision detection.

## How to Use Lattice

The easiest way to figure out how to use lattice is to read/skim this readme and then check out the code for the sample game (link to game).

### Getting started

Get started in just 5 easy steps.

1. Include lattice.js or lattice.min.js with the rest of the javascript you're including in your game.

	```html
	// CODE FOR THIS GOES HERE
	```

2. You will need to define your own game object (e.g. game.js). To make your game object work properly with lattice, you will need to instantiate the game object and pass in the id of your canvas element, the desired width of the canvas, and the desired height of the canvas.

	```javascript
	// game.js
	var Game = function(canvasId, width, height) {
	};

	// main.js (wherever your main code lives)
	var game = new Game('canvas', 600, 600);
	```

3. Simply by including lattice.js, you make globally available the \_lattice\_ object. Initialize this object by passing in your game object and the canvas element id.

	```javascript
	var game = new Game('canvas', 600, 600);
	_lattice_.init(game, 'canvas'); // <- newest line
	```

4. Now, create an initial level, create an initial state within that level, and set the current state. You can specify for yourself the names of the things you pass into the three functions below, but you do need to call these three functions.

	```javascript
	// game.js
	Game.prototype = {
	    init: function() {
	      _lattice_.levelManager.addLevel(1, new FirstLevel(this));
	      _lattice_.stateManager.addState('playing', playingState);
	      _lattice_.stateManager.currentState = 'playing';
	    },
	}

	// main.js
	var game = new Game('canvas', 600, 600);
	_lattice_.init(game, 'canvas');
	game.init(); // <- newest line
	```

5. Finally, start the loop on \_lattice\_.

	```javascript
	// main.js
	function() {
		var game = new Game('canvas', 600, 600);
		_lattice_.init(game, 'canvas');
		game.init();
		_lattice_.startLoop(); // <- newest line
	});
	```

### Modules

Lattice consists of a bunch of modules, each of which is dedicated to handling a specific aspect of your game for you.

Each of these modules is automatically attached to the \_lattice\_ object.

### Lattice itself (_lattice_)

Lattice is responsible for starting the game loop (_lattice_.startLoop()) and for updating and drawing the entities in the game.

```javascript
// Always pass into update function the time elapsed since the last tick of the clock (_lattice_.loopTimeElapsed).
_lattice_.update(_lattice_.loopTimeElapsed);

// Always pass into the draw function the context of the canvas (_lattice_.ctx)
	_lattice_.draw(_lattice_.ctx);
```

#### Handling User Input (_lattice_.inputManager)

To determine if the 'enter' key is being held down, call \_lattice\_.InputManager.keyIsHeld() and pass in the keyCode for enter, i.e. 13.

Example:
```javascript
if (_lattice_.inputManager.keyIsHeld(13)) {
	// Do stuff
}
```
#### Level Management (_lattice_.levelManager)

Lattice assumes that your game has levels. But don't worry, if you don't want your game to have levels, that's fine - just create 1 level.

The level manager has 1 property of interest: currentLevelNum. This is set to 1 by default.

The level manager has 3 functions of interest. Here's how you use each of these. Levels numbers and level objects are stored on the global \_lattice\_ object.

```javascript
// Demonstration of addLevel()
	// Pass as arguments (1) the level number that corresponds to the new level and an instantiation of (2) the level object (which you have created).
	_lattice_.levelManager.addLevel(1, new FirstLevel(this));

// Demonstration of removeLevel()
	// Note that if you remove level 2, level 3 will NOT automatically become level 2.
	// Instead, level 2 will not have any corresponding level object.
	_lattice_.levelManager.removeLevel(2);

// Demonstration of currentLevelObj()
	var levelObject = _lattice_.levelManager.currentLevelObj();
```

#### Handling State (_lattice_.stateManager)

Lattice also assumes you want different states in your game (e.g. the 'intro' state, the 'countdown' state, the playing' state, the 'game over' state, etc.). Again, if you don't want to have states in your game, you can just have 1 state. But you do need to instantiate 1 state (as mentioned above). States are represented by a state name (e.g. 'playing') and a corresponding state function (e.g. playingState).

There is no default current_state, you'll need to initialize it (as mentioned above), e.g.

```javascript
_lattice_.stateManager.currentState = 'playing';
```

The state manager has 3 functions of interest. Here's how you use each of these. State names and functions are also stored on the global \_lattice\_ object.

```javascript
_lattice_.stateManager.addState('playing', playingState);
_lattice_.stateManager.removeState('playing');

// Where the playing state is defined elsewhere:
	// states.js
	var playingState = function () {
		_lattice_.update(_lattice_.loopTimeElapsed);
		_lattice_.draw(_lattice_.ctx);
	}
```

#### Collision Detection (_lattice_.zoneChecker)

Given the number of different methods available within the collision detection module, it's best to just point you toward [the source code](https://github.com/jyli7/lattice/blob/master/src/zone_checker.js). The zoneChecker lets you determine if a "collision" has occurred between two objects (each of which is defined by 4 points), where a collision is either the presence of a vertex within a zone, or the present of an entire zone within another zone (the exact meaning of "zone" is provided within the zone_checker.js source code).

To make your game entities compatible with the zone checker, you'll need to specify the four points that define the entity on the canvas: xLeft, xRight, yBottom, and yTop.

For instance:
```javascript
var Hero = function () {
	_lattice_.zoneChecker.zonify(this);
	this.width = 20;
	this.height = 20;

	this.xLeft = canvas.width / 2;
	this.xRight = this.xLeft + this.width;
	this.yBottom = canvas.height / 2;
	this.yTop = this.yBottom - this.height;	
};
```
