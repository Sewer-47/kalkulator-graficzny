class ToolsWindow extends Window {

	constructor() {
		super("Narzedzia", "toolsWindow", "toolbar");
		this.setContext(new ToolWindowContext());
	}

	onEnable() {
	    var toolListElement = document.getElementById("toolList");
	    var nextLine = false;
	    for (var tool of toolManager.getAll()) {
	        var toolName = tool.getName();
	        var toolIcon = tool.getIcon();
	        var toolElement = "<span onclick='selectTool(\"" + toolName +"\", this)'> <i class=' " + tool.getIcon() + "'></i></span>";
	        toolListElement.innerHTML += toolElement;
	        if (nextLine) {
				toolListElement.innerHTML += "<br><br>";
	        }
	        nextLine = !nextLine;    
	    }
	    
	}
}

function selectTool(toolName, element) {
    console.log(toolName);
    if (lastActiveElement != null) {
        lastActiveElement.classList.remove("toolActive");
    }
    lastActiveElement = element;

    element.classList.add("toolActive");

    var icon = element.children[0].classList[1].replace("fa-", "");

    $('body').awesomeCursor(icon, {
        hotspot: 'bottom left',
        color: 'darkgray',
        size: 32
    });
  
    toolManager.setToolActive(toolName);

}