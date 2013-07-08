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