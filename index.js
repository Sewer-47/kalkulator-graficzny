var steps = 40;
var functionsCount = 0;

var lastActiveElement = null;
var toolManager = new ToolManager();
toolManager.registerDefaults();
var toolClientListeners = new ToolClientListeners();
toolClientListeners.initialize(toolManager);

var windowManager = new WindowManager();
windowManager.registerDefaults();
var windowRenderer = new WindowRenderer();
windowRenderer.renderAll(windowManager);

function draw() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.translate(canvas.width / 2 ,canvas.height / 2);
    context.scale(cameraZoom, cameraZoom);
    context.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y );
    
    context.font = "15px Arial";

    drawGridAxis(steps);
    drawAxies(steps);
    drawCoodrinates(steps);

    renderSketches();       

    requestAnimationFrame(draw);

}

function getEventLocation(e) {
    if (e.touches && e.touches.length == 1) {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY }        
    }
}

draw();
/*
jQuery(window).bind('beforeunload', function(){
    return 'ignored';
});*/