class ColorPickerTool extends Tool {

	constructor() {
		super("colorPicker", "fa-solid fa-eye-dropper fa-2x");
	}

	onCursorDown(event) {
	    var x = event.x;
	    var y = event.y;	
		var data = context.getImageData(x, y, 1, 1).data;
		var decColor = ((data [0] << 16) + (data [1] << 8) + data [2]).toString(16);
		currentColor = "#" + decColor;
	}	
}