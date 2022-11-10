class ToolManager {
	
	constructor() {
		this.byName = new Map();
	}

	registerDefaults() {
		for (var tool of [
			new PenTool(),
			new PaintBrushTool(),
			new ColorPickerTool(),
			new EraserTool(),
			new PaletteTool(),
			new RulerTool(),
			new TextTool(),
			new DragTool(),
		]) {
			this.byName.set(tool.getName(), tool);
		}
	}

	isToolActive() {
		return this.activeTool != null;
	}

	getToolActive() {
		return this.activeTool;
	}

	setToolActive(toolName) {
		if (this.activeTool != null) {
			this.activeTool.onDisable();
		}
		this.activeTool = this.getByName(toolName);
		this.activeTool.onEnable();
	}

	//default tools
	getTextTool() {
		return this.byName.get("text");
	}

	getByName(name) {
		return this.byName.get(name);
	}

	getAll() {
		return this.byName.values();
	}
}