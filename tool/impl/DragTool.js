//thanks for https://codepen.io/chengarda/pen/wRxoyB
class DragTool extends Tool {

	constructor() {
		super("drag", "fa-solid fa-maximize fa-2x");

		this.isDragging = false
		this.dragStart = { x: 0, y: 0 }

		this.MAX_ZOOM = 5
		this.MIN_ZOOM = 0.1
		this.SCROLL_SENSITIVITY = 0.0005

		this.initialPinchDistance = null
		this.lastZoom = cameraZoom

	}

	onCursorUp(event) {
	    this.isDragging = false
	    this.initialPinchDistance = null
	    this.lastZoom = cameraZoom		
	}

	onCursorDown(event) {
	    this.isDragging = true
	    this.dragStart.x = getEventLocation(event).x/cameraZoom - cameraOffset.x
	    this.dragStart.y = getEventLocation(event).y/cameraZoom - cameraOffset.y		
	}

	onCursorMove(event) {
	    if (this.isDragging) {
	        cameraOffset.x = getEventLocation(event).x/cameraZoom - this.dragStart.x
	        cameraOffset.y = getEventLocation(event).y/cameraZoom - this.dragStart.y
	    }		
	}

	onMouseScroll(event) {
	    this.adjustZoom(event.deltaY*this.SCROLL_SENSITIVITY);
	}

	onTouchstart(event, touchHandler) {
		this.handleTouch(event, touchHandler);
	}

	onTouchend(event, touchHandler) {
		this.handleTouch(event, touchHandler);
	}

	onTouchMove(event, touchHandler) {
		this.handleTouch(event, touchHandler);
	}


	handlePinch(e) {
	    e.preventDefault()
	    
	    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
	    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
	    
	    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
	    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
	    
	    if (this.initialPinchDistance == null) {
	        this.initialPinchDistance = currentDistance
	    } else {
	        this.adjustZoom(null, currentDistance/this.initialPinchDistance )
	    }
	}


	handleTouch(e, singleTouchHandler) {
	    if (!isToolActive(MOVE_TOOL_INDEX)) {
	        return;
	    }    
	    if (e.touches.length == 1) {
	        singleTouchHandler(e)
	    } else if (e.type == "touchmove" && e.touches.length == 2) {
	        this.isDragging = false
	        this.handlePinch(e)
	    }
	}

	adjustZoom(zoomAmount, zoomFactor) {
	    if (!this.isDragging) {
	        if (zoomAmount) {
	            cameraZoom += zoomAmount
	        }
	        else if (zoomFactor) {
	            console.log(zoomFactor)
	            cameraZoom = zoomFactor*this.lastZoom
	        }
	        
	        cameraZoom = Math.min(cameraZoom, this.MAX_ZOOM)
	        cameraZoom = Math.max(cameraZoom, this.MIN_ZOOM)
	        
	        console.log(zoomAmount)
	    }
	}	
}