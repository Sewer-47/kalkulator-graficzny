class WindowRenderer {

	renderAll(windowManager) {
		for (var window of windowManager.getAll()) {
			this.renderWindow(window);
			window.onEnable();
		}
	}

	renderWindow(window) {
		var element = document.getElementById("canvas");

		var stringHtml = this.getHTML(window);
		var div = document.createElement('div');
		div.innerHTML = stringHtml.trim();
		div = div.firstChild;

		element.parentNode.insertBefore(div, element.nextSibling);

		var divId = window.getDivId();

		$("#" + divId).modal({backdrop: false}, 'show').draggable({
    		handle: ".modal-header"
		});

	}


	getHTML(window) {
		var superClass = window.getSuperClass();
		var name = window.getName();
		var divId = window.getDivId();
		var context = window.getContext();
		var contextDivId = context.getDivId();
		var html = `
		  <div class="modal custom-modal fade" id="${divId}">
		    <div class="modal-dialog modal-sm">
		      <div class="modal-content ${superClass}">
		        <div class="modal-header">
		            ${name}
		          <button type="button" class="close btn btn-danger" data-dismiss="modal">&times;</button>
		        </div>
		        <div id="${contextDivId}" class="modal-body">
		        </div>
		      </div>
		    </div>
		  </div>
		`;
		return html;
	}
}