class WindowManager {
	
	constructor() {
		this.byName = new Map();
	}

	registerDefaults() {
		for (var window of [
			new ColorPickerWindow(),
			new FunctionsWindow(),
			new ToolsWindow(),
		]) {
			this.byName.set(window.getName(), window);
		}
	}

	getByName(name) {
		return this.byName.get(name);
	}

	getAll() {
		return this.byName.values();
	}
}