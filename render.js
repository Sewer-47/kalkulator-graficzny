const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var cameraZoom = 1;
var cameraOutZoom = 1;
var cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }

const sketchArray = new Array();
const undoArray = new Array();

function doUndo() {
	undoArray.push(sketchArray.pop());
}

function doRedo() {
	sketchArray.push(undoArray.pop());
}

function save() {
    var index = 0;
    for (var sketch of sketchArray) {
        localStorage.setItem("sketch" + index, JSON.stringify(sketch));
        index++;
    }
}

function load() {
    for (var i = 0; localStorage.getItem("sketch" + i) != null; i++) {
        var item = localStorage.getItem("sketch" + i);
        var sketch = Sketch.fromJson(item);
        sketchArray.push(sketch);
    }
}

function renderSketches() {
	for (var sketch of sketchArray) {
		switch (sketch.getType()) {
			case SketchType.POINT:
		        context.fillStyle = sketch.getColor();
		        context.fillRect(sketch.getX(), sketch.getY() ,5,5);
		        context.stroke();
				break;
			case SketchType.TEXT:
		        context.beginPath();
		        context.fillStyle = sketch.getColor();
		        context.font = "30px Arial";    
		        context.fillText(sketch.getText(), sketch.getX(), sketch.getY());
		        context.closePath(); 
		        break;
		    case SketchType.FUNCTION:
		    	for (var vector of sketch.getPositionArray()) {
		    		drawPoint(vector.getX(), vector.getY(), sketch.getColor());
		    	}
		    	break;
		    case SketchType.LINE:
		    	var secondPosition = sketch.getSecondPosition();
		        context.beginPath();
		        context.moveTo(sketch.getX(), sketch.getY());
		        context.lineTo(secondPosition.getX(), secondPosition.getY());
		        context.stroke();       
		}
	} 
}
/*
    circles.forEach(element => {
        context.beginPath();
        context.arc(element.firstX, element.firstY, element.secondX, element.secondY, 2 * Math.PI);
        context.stroke();                
    });
    var circleSketch = new CircleSketch(new Vector(0,0), "blue", new Vector(5,5));
circleSketch.render();*/   

function drawText(x, y, color, text) {
    var fixedX = x * 80;
    var fixedY = -y * 80;
    context.beginPath();
    context.fillStyle = color;
    context.font = "30px Arial";    
    context.fillText(text, fixedX, fixedY);
    context.closePath();     
}

function drawPoint(x, y, color) {
    var fixedX = x * 80;
    var fixedY = -y * 80;
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(fixedX, fixedY, 2, 2);
    context.closePath();
    context.stroke();
}

function drawGridAxis(steps) {
    context.beginPath();
    context.strokeStyle = "#505050";    
    for (var x = -canvas.width / 2; x <= canvas.width / 2; x = x + steps) {
        // - canvas.height / 2 + 4.5; dodaje 4.5, zeby wyrownac os tak, by 0 bylo na srodku
        for (var y = -canvas.height / 2 + 4.5; y <= canvas.height / 2; y = y + steps) {
            //siatka na osi x
            context.moveTo(x, -canvas.height);
            context.lineTo(x, canvas.height);
            //siatka na osi y   
            context.moveTo(-canvas.width, y);
            context.lineTo(canvas.width, y);
        }
    }
    context.closePath();
    context.stroke();   
}

function drawAxies(steps) {
    context.beginPath();
    context.strokeStyle = "#BEBEBE";

    var screenDimensionX = (canvas.width * (cameraOutZoom * 2)) / 2;
    var screenDimensionY = (canvas.height * (cameraOutZoom * 2)) / 2;

    //os x
    context.moveTo(0,0);
    context.lineTo(screenDimensionX, 0);
    context.lineTo(-screenDimensionX, 0);
    //os y
    context.moveTo(0,0);
    context.lineTo(0, screenDimensionY / 2);
    context.lineTo(0, -screenDimensionY / 2);

    context.closePath();
    context.stroke();   
}

function drawCoodrinates(steps) {
    steps = steps * 2;
    context.fillStyle = "#BEBEBE";

    var screenDimensionX = (canvas.width * (cameraOutZoom * 2)) / 2;
    var screenDimensionY = (canvas.height * (cameraOutZoom * 2)) / 2;

    for (var x = -screenDimensionX; x <= screenDimensionX; x = x + steps) {
        var fixedX = parseInt(x / steps, 10).toFixed(1);     
        for (var y = screenDimensionY; y >= -screenDimensionY; y = y - steps) {
            var fixedY = parseInt(y * -1.0 / steps, 10).toFixed(1);

            if (fixedY > 0 && fixedY < 10) {
                context.fillText(fixedY, -30, y + steps);
            }
            if (fixedY < 0 && fixedY > -10) {
                context.fillText(fixedY, -30, y);
            }

            if (fixedY > 0 && fixedY > 9) {
                context.fillText(fixedY, -28, y + steps);
            }

            if (fixedY < 0 && fixedY < -9) {
                context.fillText(fixedY, -32, y);
            }       
        }
        if (x > 0) {
            context.fillText(fixedX, x - 5, 20);
        }
        if (x < 0) {
            context.fillText(fixedX, x - 10, 20);
        }   
    }
}
