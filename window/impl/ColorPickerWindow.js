var currentColor = "white";

class ColorPickerWindow extends Window {

	constructor() {
		super("Kolory", "colorWindow", "");
		this.setContext(new ColorPickerWindowContext());
	}

	onEnable() {
		var contextDoc = document.getElementById(this.getContext().getDivId());
		contextDoc.innerHTML += `<div class="colorPicker" style="margin:0px;"></div>`;
		this.colorPicker = new iro.ColorPicker(".colorPicker", {
			  width: 150,
			  color: "rgb(255, 255, 255)",
			  margin: 10,
			  borderWidth: 0,
			  padding: 0,
		});
		this.colorPicker.on(['color:init', 'color:change'], function(color) {
    		currentColor = color.hexString;
		});
	}
}