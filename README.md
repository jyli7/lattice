#Lattice

A lightweight framework for making JavaScript games. Handles user input, game states, level management, and collision detection.

## How to Use Lattice

### Getting started

Get started in just 5 easy steps.

1. Include lattice.js or lattice.min.js with the rest of your included javascript.

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

3. Simply by including lattice.js, you make globally available the _lattice_ object. Initialize this object by passing in your game object and the canvas element id.

	```javascript
	var game = new Game('canvas', 600, 600);
	_lattice_.init(game, 'canvas'); // <- new line
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
	game.init(); // <- new line
	```

5. Finally, start the loop on _lattice_.

	```javascript
	// main.js
	function() {
		var game = new Game('canvas', 600, 600);
		_lattice_.init(game, 'canvas');
		game.init();
		_lattice_.startLoop(); // <- new line
	});
	```

### Modules

Lattice consists of a bunch of modules, each of which is dedicated to handling a specific aspect of your game for you.

Each of these modules is automatically attached to the _lattice_ object.

#### Handling User Input (_lattice_.inputManager)

To determine if the 'enter' key is being held down, call _lattice_.InputManager.keyIsHeld() and pass in the keyCode for enter, i.e. 13.

Example:
```javascript
if (_lattice_.inputManager.keyIsHeld(13)) {
	// Do stuff
}
```
#### Level Management (_lattice_.levelManager)

Lattice assumes that your game has levels. But don't worry, if you don't want your game to have levels, that's fine - just create 1 level.

The level manager has 1 property of interest: currentLevelNum. This is set to 1 by default.

The level manager has 3 functions of interest:
* addLevel()
* removeLevel()
* currentLevelObj()

Here's how you use each of these

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

#### Collision Detection (_lattice_.zoneChecker)

