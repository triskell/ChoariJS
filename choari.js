var game = {

	canvas : null,

	/**********
	*
	*	Initializes the library and the canvas.
	*	Let width and/or height undefined to fit the canvas to the screen size.
	*
	*	Parameters :	canvas	: The canvas element.
	*					mode	: "fullscreen" to set the canvas fullscreen, else "windowed".
	*					width	: The width of the canvas. Precise the css unit of this attribute.
	*					height	: The width of the canvas. Precise the css unit of this attribute.	
	*
	**********/
	init : function (canvas, mode, width, height) {

		this.canvas = canvas;

		//set the size of the canvas
		if (typeof width === "undefined" || typeof height === "undefined") {
			this.canvas.setAttribute("width", screen.width);
			this.canvas.setAttribute("height", screen.height);
		} else {
			this.canvas.setAttribute("width", width);
			this.canvas.setAttribute("height", height);
		}

		//set fullscreen mode
		if (mode.toLowerCase() === "fullscreen") {
			this.setFullScreen(true, canvas);
		}
	},


	/**********
	*
	*	Set the element fullscreen, if fullscreen is supported by the browser.
	*
	*	Parameter	:	element			: The element to set fullscreen.
	*					setFullSreen	: true to set fullscreen, false to cancel it.
	*
	*	Return		:	false if fullscreen not supported. Else true.
	*
	**********/
	setFullScreen : function (element, setFullScreen) {

		if (setFullScreen === true) {

			element.requestFullScreen = element.mozRequestFullScreen || element.webkitRequestFullScreen || element.requestFullScreen;
			if (element.requestFullScreen) {
				element.requestFullScreen();
			} else {
				return false;
			}

		} else {

			element.cancelFullScreen = element.mozCancelFullScreen || element.webkitCancelFullScreen || element.cancelFullScreen;
			if (element.cancelFullScreen) {
				element.cancelFullScreen();
			} else {
				return false;
			}

		}

		return true;

	}

};