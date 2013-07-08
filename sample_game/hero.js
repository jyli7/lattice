var Hero = function () {
	_lattice_.zoneChecker.zonify(this);
	this.width = 20;
	this.height = 20;

	this.xLeft = canvas.width / 2;
	this.xRight = this.xLeft + this.width;
	this.yBottom = canvas.height / 2;
	this.yTop = this.yBottom - this.height;
};

Hero.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	ctx.moveTo(this.xLeft, this.yBottom);
	ctx.lineTo(this.xRight, this.yBottom);
	ctx.lineTo(this.xRight, this.yTop);
	ctx.lineTo(this.xLeft, this.yTop);
	ctx.fill();
};

Hero.prototype.update = function (elapsedTime) {
	if (_lattice_.zoneChecker.vertexInAnyTargetZones(this, [_lattice_.levelManager.currentLevelObj().enemy])) {
		_lattice_.stateManager.currentState = 'gameOver';
	}

	// Player holding up
	if (_lattice_.inputManager.keyIsHeld(38)) { 
		this.yBottom -= 100 * elapsedTime;
		this.yTop -= 100 * elapsedTime;
	}
	
	// Player holding down
	if (_lattice_.inputManager.keyIsHeld(40)) { 
		this.yBottom += 100 * elapsedTime;
		this.yTop += 100 * elapsedTime;
	}
	
	// Player holding left
	if (_lattice_.inputManager.keyIsHeld(37)) { 
		this.xLeft -= 100 * elapsedTime;
		this.xRight -= 100 * elapsedTime;
	}
	
	// Player holding right
	if (_lattice_.inputManager.keyIsHeld(39)) {
		this.xLeft += 100 * elapsedTime;
		this.xRight += 100 * elapsedTime;
	}
};