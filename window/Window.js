class Window extends WindowListeners {

	constructor(name, divId, superClass) {
		super();
		this.name = name;
		this.divId = divId;
		this.superClass = superClass;
		if (this.constructor == Window) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	getContext() {
		return this.context;
	}

	setContext(context) {
		this.context = context;
	}

	getName() {
		return this.name;
	}

	getDivId() {
		return this.divId;
	}

	getSuperClass() {
		return this.superClass;
	}


}