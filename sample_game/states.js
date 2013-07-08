var playingState = function () {
	_lattice_.update(_lattice_.loopTimeElapsed);
	_lattice_.draw(_lattice_.ctx);
}

var gameOverState = function () {
	document.getElementById('primary-message').innerHTML = "Game over";
	document.getElementById('secondary-message').innerHTML = "Press 'enter' to play again";
	var that = this;
	var startGameOnEnter = function (e) {
		if (e.keyCode == 13) {
			clearInterval(_lattice_.loop);
			document.getElementById('primary-message').innerHTML = "";
			document.getElementById('secondary-message').innerHTML = "";
			var game = new Game('canvas', 600, 600);
      _lattice_.init(game, 'canvas');
      game.init();
      _lattice_.startLoop();
			removeEventListener("keypress", startGameOnEnter);
		}
	}
	addEventListener("keypress", startGameOnEnter);
}

