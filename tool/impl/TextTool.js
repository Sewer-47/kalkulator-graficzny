class TextTool extends Tool {

	constructor() {
		super("text", "fa-solid fa-font fa-2x");
		this.inputBox = document.getElementById('typeText');
	}

	onEnable() {
		var textBoxElement = document.getElementById("typeText");
		var textBoxClasses = textBoxElement.classList;
		if (textBoxClasses.contains("hidden")) {
			textBoxClasses.remove("hidden");
		}

		textBoxElement.addEventListener('keypress', this.onTextEnter);
	}

	onDisable() {
		var textBoxElement = document.getElementById("typeText");
		var textBoxClasses = textBoxElement.classList;
		if (!textBoxClasses.contains("hidden")) {
			textBoxClasses.add("hidden");
		}
	}

	onCursorDown(event) {
	    this.inputBox.style.top = event.clientY + "px";
	    this.inputBox.style.left = event.clientX + "px";
	}

	onTextEnter(event) {
		var textBoxElement = document.getElementById("typeText");
		var textBoxStyle = textBoxElement.style;

		var x = parseInt(textBoxStyle.left.replace("px", ""));
		var y = parseInt(textBoxStyle.top.replace("px", ""));
		x = x - cameraOffset.x;
		y = y - cameraOffset.y;
		if (event.key === 'Enter') {
		    var textSketch = new TextSketch(new Vector(x, y), currentColor, textBoxElement.value);
		    sketchArray.push(textSketch);
		}
	}
}