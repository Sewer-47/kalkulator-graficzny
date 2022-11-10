class Sketch {

	constructor(type, color, position) {
		this.type = type;
		this.color = color;
		this.position = position;
	}

	getType() {
		return this.type;
	}

	getColor() {
		return this.color;
	}

	getPosition() {
		return this.position;
	}

	getX() {
		return this.position.getX();
	}

	getY() {
		return this.position.getY();
	}
}

class SketchType {
	static POINT = new SketchType('point');
	static FUNCTION = new SketchType('function');
	static TEXT = new SketchType('text');
	static LINE = new SketchType('line');
	static CIRCLE = new SketchType('circle');

	constructor(name) {
		this.name = name;
	}
}

class Vector {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}	
}

class PointSketch extends Sketch {

	constructor(position, color) {
		super(SketchType.POINT, color, position);
	}
}

class FunctionSketch extends Sketch {

	constructor(color, functionValue) {
		super(SketchType.FUNCTION, color, null);
		this.functionValue = functionValue;
		this.init();
	}

	init() {
		this.positionArray = new Array();
		//replace(/[^-()\d/*+.]/g, '');
		var replacedX;

		this.functionValue = this.functionValue.replaceAll("^", "**");
		for (var x = -10.0; x < 10.0; x += 0.001) {
			replacedX = x;
			if (x < 0) {
				replacedX = "(" + x + ")";
			}

			var result = this.functionValue.replaceAll("x", replacedX);
			var y = new Function('return ' + result)();

			if (y > 10) {
				continue;
			}

	        this.positionArray.push(new Vector(x, y));
	    }
	}

	//zadbac o optymalizacje, bo ta metoda wykonuje sie kilkaset razy na ruch myszki
	hasPosition(x, y, threshold) {
		for (var position of this.positionArray) {
			var fixedX = position.getX() * 80;
    		var fixedY = -position.getY() * 80;
			if (
				x >= fixedX - 10 && x <= fixedX + 10 &&
				y >= fixedY - 10 && y <= fixedY + 10
			) {
				return true;
			}
		}
		return false;
	}

	removePosition(x, y, threshold) {
		var i = 0;
		for (var position of this.positionArray) {
			var fixedX = position.getX() * 80;
    		var fixedY = -position.getY() * 80;
			if (
				x >= fixedX - 10 && x <= fixedX + 10 &&
				y >= fixedY - 10 && y <= fixedY + 10
			) {
				this.positionArray.splice(i, 1);
			}
			i++;
		}
	}	

	getPositionArray() {
		return this.positionArray;
	}
}

class TextSketch extends Sketch {

	constructor(position, color, text) {
		super(SketchType.TEXT, color, position);
		this.text = text;
	}

	getText() {
		return this.text;
	}
}

class LineSketch extends Sketch {

	constructor(firstPosition, color, secondPosition) {
		super(SketchType.LINE, color, firstPosition);
		this.secondPosition = secondPosition;
	}

	getSecondPosition() {
		return this.secondPosition;
	}
}

class CircleSketch extends Sketch {

	constructor(firstPosition, color, secondPosition) {
		super(SketchType.CIRCLE, color, firstPosition);
		this.secondPosition = secondPosition;
	}

	getSecondPosition() {
		return this.secondPosition;
	}
}