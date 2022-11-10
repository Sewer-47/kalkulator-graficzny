class RulerTool extends Tool {

	constructor() {
		super("ruler", "fa-solid fa-ruler fa-2x");
	}

	onDisable() {
		for (var i = 0; i < sketchArray.length; i++) {
			if (
				sketchArray[i] == this.firstPoint ||
				sketchArray[i] == this.secondPoint ||
				sketchArray[i] == this.lineSketch ||
				sketchArray[i] == this.textSketch
			) {
				console.log(sketchArray[i].getType());
				sketchArray.splice(i, 1);
			}
		}
	}

	onCursorDown(event) {
		var x = event.clientX;
		var y = event.clientY;
		var fixedX = (x / 80) - 10;
		var fixedY = (y / 80) - 10;
		console.log("start" + fixedX + ":" + fixedY);


		x = getEventLocation(event).x/cameraZoom - cameraOffset.x
		y = getEventLocation(event).y/cameraZoom - cameraOffset.y

		if (this.firstPoint != null) {
			for (var i = 0; i < sketchArray.length; i++) {
				if (sketchArray[i] == this.firstPoint) {
					sketchArray.splice(i, 1);
				}
			}
		}
	    this.firstPoint = new PointSketch(new Vector(x, y), "white");
	    sketchArray.push(this.firstPoint);				
	}

	onCursorMove(event) {
		if (this.firstPoint != null) {
			var x = getEventLocation(event).x/cameraZoom - cameraOffset.x
			var y = getEventLocation(event).y/cameraZoom - cameraOffset.y
			if (this.secondPoint != null) {
				for (var i = 0; i < sketchArray.length; i++) {
					if (sketchArray[i] == this.secondPoint) {
						sketchArray.splice(i, 1);
					}
				}
			}
		    this.secondPoint = new PointSketch(new Vector(x, y), "white");
		    sketchArray.push(this.secondPoint);					

			if (this.lineSketch != null) {
				for (var i = 0; i < sketchArray.length; i++) {
					if (sketchArray[i] == this.lineSketch) {
						sketchArray.splice(i, 1);
					}
				}
			}

			var firstVector = new Vector(this.firstPoint.getX(), this.firstPoint.getY());
			var secondVector = new Vector(x, y);

			this.lineSketch = new LineSketch(firstVector, "blue", secondVector);
			sketchArray.push(this.lineSketch);

			var halfX = (firstVector.getX() + secondVector.getX()) / 2;
			var halfY = (firstVector.getY() + secondVector.getY()) / 2;


			if (this.textSketch != null) {
				for (var i = 0; i < sketchArray.length; i++) {
					if (sketchArray[i] == this.textSketch) {
						sketchArray.splice(i, 1);
					}
				}
			}
			//var distance = firstVector.getX() - secondVector.getX() + firstVector.getY() - secondVector.getY();
			//distance = distance / 40;

			var distanceX = Math.sqrt(firstVector.getX()**2 + secondVector.getX()**2);
			var distanceY = Math.sqrt(firstVector.getY()**2 + secondVector.getY()**2);
			var distance = distanceX + distanceY;
			distance = distance / 80;
			distance = distance.toFixed(2);

		    this.textSketch = new TextSketch(new Vector(halfX, halfY), "white", "odleglosc: " + distance);
		    sketchArray.push(this.textSketch);
		}
	}	
}