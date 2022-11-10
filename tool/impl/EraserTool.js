class EraserTool extends Tool {

	constructor() {
		super("eraser", "fa-solid fa-eraser fa-2x");
		this.erasing = false;
	}

	onCursorUp(event) {
		this.erasing = false;
	}

	onCursorDown(event) {
		this.erasing = true;
	}

	onCursorMove(event) {
		if (!this.erasing) {
			return;
		}
	    var x = getEventLocation(event).x/cameraZoom - cameraOffset.x
	    var y = getEventLocation(event).y/cameraZoom - cameraOffset.y

		for (var i = 0; i < sketchArray.length; i++) {
			var sketch = sketchArray[i];
			if (sketch.getPosition() != null) {
				if (
					x >= sketch.getX() - 10 && x <= sketch.getX() + 10 &&
					y >= sketch.getY() - 10 && y <= sketch.getY() + 10
				) {
					sketchArray.splice(i, 1); //do listy undo by wypadalo dodac
				}
			} else if (sketch.getType() == SketchType.FUNCTION) {
				sketch.removePosition(x, y, 10);
			}
		}	 
	}	
}