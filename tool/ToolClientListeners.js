class ToolClientListeners {

	//w sumie mozna to zrobic lepiej trzymajac w map<string, function>
	initialize(toolManager) {
		canvas.addEventListener('mouseup', function(event) {
			if (!toolManager.isToolActive()) {
				return;
			}
			toolManager.getToolActive().onCursorUp(event);
		});

		canvas.addEventListener('mousedown', function(event) {
			if (!toolManager.isToolActive()) {
				return;
			}	
			toolManager.getToolActive().onCursorDown(event);
		});

		canvas.addEventListener('mousemove', function(event) {
			if (!toolManager.isToolActive()) {
				return;
			}	

			toolManager.getToolActive().onCursorMove(event);
		});

		canvas.addEventListener('wheel', function(event) {
			if (!toolManager.isToolActive()) {
				return;
			}	

			toolManager.getToolActive().onMouseScroll(event);
		});

		canvas.addEventListener('touchstart', function(event, touchHandler) {
			if (!toolManager.isToolActive()) {
				return;
			}	
			toolManager.getToolActive().onTouchstart(event, touchHandler);
		});

		canvas.addEventListener('touchend', function(event, touchHandler) {
			if (!toolManager.isToolActive()) {
				return;
			}	
			toolManager.getToolActive().onTouchend(event, touchHandler);
		});

		canvas.addEventListener('touchmove', function(event, touchHandler) {
			if (!toolManager.isToolActive()) {
				return;
			}	
			toolManager.getToolActive().onTouchMove(event, touchHandler);
		});
	}
}