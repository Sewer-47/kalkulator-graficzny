class WindowContext {

	constructor(divId) {
		if (this.constructor == WindowContext) {
			throw new Error("Abstract classes can't be instantiated.");
		}

		this.divId = divId;
	}

	getDivId() {
		return this.divId;
	}	
}