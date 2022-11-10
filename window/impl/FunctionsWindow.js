class FunctionsWindow extends Window {

	constructor() {
		super("Twoje funkcje:", "functionsWindow", "");
		this.setContext(new FunctionsWindowContext());
	}
}