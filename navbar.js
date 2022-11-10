const powerArray = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹", "⁺", "⁻", "⁼", "⁽", ")"];
var navOpened = false;


functionColorPicker = new iro.ColorPicker(".functionColorPicker", {
	width: 150,
	color: "rgb(255, 0, 0)",
	margin: 10,
	borderWidth: 0,
	padding: 0,
});
functionColorPicker.on(['color:init', 'color:change'], function(color) {
	functionColor = color.hexString;
	document.getElementById("functionSpan").style.color = functionColor;
});

function openNav() {
	if (!navOpened) {
		document.getElementById("mySidebar").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";

		document.getElementById("functionSpan").style.color = functionColorPicker.color.hexString;	
	} else {
		document.getElementById("mySidebar").style.width = "0";
		document.getElementById("main").style.marginLeft= "0";
	}
	navOpened = !navOpened;
}

function calcFunction() {
	var functionInputElement = document.getElementById("functionInput");
	var functionValue = functionInputElement.value;
	var functionColor = functionColorPicker.color.hexString;
	renderFunction(functionValue, functionColor);
}

function renderFunction(functionValue, functionColor) {
	powerFunctionReplaced = functionValue;
	var doReplace = false;
	for (var i = 0; i < functionValue.length; i++) {
		var c = functionValue.charAt(i);
		if (c >= '0' && c <= '9') {
			if (doReplace) {
				var power = powerArray[parseInt(functionValue.charAt(i))];
				powerFunctionReplaced = powerFunctionReplaced.substring(0,i) + power + powerFunctionReplaced.substring(i+1);
				//console.log(functionValue.charAt(i));
			}
		} else {
			doReplace = false;
		}
		if (functionValue.charAt(i) == "^") {
			doReplace = true;
		}		
	}
	powerFunctionReplaced = powerFunctionReplaced.replace("^", "");




    var functionListElement = document.getElementById("functionsList");
    functionListElement.innerHTML += "<p style='color:" + functionColor + "'> - F(x) = " + powerFunctionReplaced + "</p>";	
	
	var functionSketch = new FunctionSketch(functionColor, functionValue);
	sketchArray.push(functionSketch);
}

function reload() {
	window.location.reload();
}

function fullScreen() {
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}