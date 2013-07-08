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

#### Handling User Input (input_manager.js)

#### Level Management (level_manager.js)

#### Handling State (state_manager.js)

#### Collision Detection (zone_checker.js)