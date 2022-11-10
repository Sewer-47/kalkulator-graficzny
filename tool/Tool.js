class Tool extends ToolListeners {

	constructor(name, icon) {
		super();
		this.name = name;
		this.icon = icon;
		if (this.constructor == Tool) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	getName() {
		return this.name;
	}

	getIcon() {
		return this.icon;
	}
}