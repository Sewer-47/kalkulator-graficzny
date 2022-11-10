class PaletteTool extends Tool {

	constructor() {
		super("palette", "fa-regular fa-circle fa-2x");
	}

	onCursorDown(event) {
		var x = event.clientX;
		var y = event.clientY;
		var fixedX = (x / 80) - 10;
		var fixedY = (y / 80) - 10;
		console.log("start" + fixedX + ":" + fixedY);


		x = getEventLocation(event).x/cameraZoom - cameraOffset.x
		y = getEventLocation(event).y/cameraZoom - cameraOffset.y

		if (this.vector != null) {
			for (var i = 0; i < vectors.length; i++) {
				if (vectors[i] == this.vector) {
					vectors.splice(i, 1);
				}
			}
		}
		this.vector = {xPos:x, yPos:y, color:"white"};
		vectors.push(this.vector);		
	}

	onCursorMove(event) {
		if (this.vector != null) {
			var x = getEventLocation(event).x/cameraZoom - cameraOffset.x
			var y = getEventLocation(event).y/cameraZoom - cameraOffset.y
			if (this.secondVector != null) {
				for (var i = 0; i < vectors.length; i++) {
					if (vectors[i] == this.secondVector) {
						vectors.splice(i, 1);
					}
				}
			}
			this.secondVector = {xPos:x, yPos:y, color:"white"};
			vectors.push(this.secondVector);	

			if (this.line != null) {
				for (var i = 0; i < circles.length; i++) {
					if (circles[i] == this.line) {
						circles.splice(i, 1);
					}
				}
			}

			this.line = {firstX:this.vector.xPos, firstY:this.vector.yPos, secondX:x, secondY:y};
			circles.push(this.line);

			var halfX = (this.line.firstX + this.line.secondX) / 2;
			var halfY = (this.line.firstY + this.line.secondY) / 2;


			if (this.text != null) {
				for (var i = 0; i < texts.length; i++) {
					if (texts[i] == this.text) {
						texts.splice(i, 1);
					}
				}
			}
			//var distance = this.line.firstX - this.line.secondX + this.line.firstY - this.line.secondY;
			//distance = distance / 40;

			var distanceX = Math.sqrt(this.line.firstX**2 + this.line.secondX**2);
			var distanceY = Math.sqrt(this.line.firstY**2 + this.line.secondY**2);
			var distance = distanceX + distanceY;
			distance = distance / 80;
			distance = distance.toFixed(2);
			this.text = {x:halfX, y:halfY, color:"white", text:"odleglosc: " + distance};			
			texts.push(this.text);
		}
	}			
}