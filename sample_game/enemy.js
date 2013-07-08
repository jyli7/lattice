var Enemy = function () {
	_lattice_.zoneChecker.zonify(this);
	this.width = 20;
	this.height = 20;
	
	this.xLeft = canvas.width / 4;
	this.yBottom = canvas.height / 4;
	this.xRight = this.xLeft + this.width;
	this.yTop = this.yBottom - this.height;	
};

Enemy.prototype.draw = function (ctx) {
	ctx.fillStyle = "rgb(225, 225, 225)";
	ctx.beginPath();
	ctx.moveTo(this.xLeft, this.yBottom);
	ctx.lineTo(this.xLeft + this.width, this.yBottom);
	ctx.lineTo(this.xLeft + this.width, this.yBottom - this.height);
	ctx.lineTo(this.xLeft, this.yBottom - this.height);
	ctx.fill();
};

Enemy.prototype.update = function (elapsedTime) {
};