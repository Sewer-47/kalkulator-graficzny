class PenTool extends Tool {

	constructor() {
		super("pen", "fa-solid fa-pen fa-2x");
		this.painting = false;
	}

	onCursorUp(event) {
		this.painting = false;
	}

	onCursorDown(event) {
		this.painting = true;
	}

	onCursorMove(event) {
		if (!this.painting) {
			return;
		}
	    var x = getEventLocation(event).x/cameraZoom - cameraOffset.x
	    var y = getEventLocation(event).y/cameraZoom - cameraOffset.y

	    var pointSketch = new PointSketch(new Vector(x, y), currentColor);
	    sketchArray.push(pointSketch);
	}
}