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

	static fromJson(json) {
		var parsedJson = JSON.parse(json);
		var type = parsedJson.type;
		var color = parsedJson.color;
		var position = parsedJson.position;
		switch (type) {
			case SketchType.POINT:
				return new PointSketch(new Vector(position.x, position.y), color);
			case SketchType.TEXT:
				var text = parsedJson.text;
				return new TextSketch(new Vector(position.x, position.y), color, text);
		        break;
		    case SketchType.FUNCTION:
				var functionValue = parsedJson.functionValue;
				return new FunctionSketch(color, functionValue);
		    case SketchType.LINE:
		        break;       
		}

	}
}

class SketchType {//jako string bo byly problemy z serializacja
	static POINT = 'point';
	static FUNCTION = 'function';
	static TEXT = 'text';
	static LINE = 'line';
	static CIRCLE = 'circle';
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

/*
    steps = 80;
    context.fillStyle = "#BEBEBE";
    for (var x = -canvas.width / 2; x <= canvas.width / 2; x = x + steps) {
        //dziwna konstrukcja, ale chodzi o zaokreglenie, a potem zrobienie liczby zmiennoprzecinkowej
        var fixedX = parseInt(x / steps, 10).toFixed(1);      
*/

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
		var skipTimes = 0;

		this.functionValue = this.functionValue.replaceAll("^", "**");

		var xStart = parseInt(-canvas.width / 2 / 80, 10); 
		var xEnd = parseInt(canvas.width / 2 / 80, 10); 	
		for (var x = xStart; x < xEnd; x += 0.001) {
			if (skipTimes > 0) {
				skipTimes--;
				continue;
			}

			replacedX = x;
			if (x < 0) {
				replacedX = "(" + x + ")";
			}

			var result = this.functionValue.replaceAll("x", replacedX);
			var y = new Function('return ' + result)();

			if (y > 10 || y < -10) {
				skipTimes = 100;
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