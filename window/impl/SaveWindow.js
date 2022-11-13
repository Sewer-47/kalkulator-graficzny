class SaveWindow extends Window {

	constructor() {
		super("Zapisz", "saveWindow", "");
		this.setContext(new SaveWindowContext());
	}

	onEnable() {
		var contextDoc = document.getElementById(this.getContext().getDivId());
		contextDoc.innerHTML += `
			<div>
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <span class="input-group-text">Nazwa: </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
				</div>
				<button type="button" class="btn btn-dark btn-lg btn-block">Zapisz</button>
			</div>
		`;
	}
}

class SaveWindowContext extends WindowContext {

	constructor() {
		super("saveContext");
	}
}