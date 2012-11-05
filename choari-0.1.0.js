/***********************************************************************************************

	ChoariJS - A Javacsript game library
	Original source at https://github.com/triskell/ChoariJS

	Copyright(C)Thomas Abot, 2012.


	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*************************************************************************************************/

var game = {
	
	canvas : null,
	context : null,
	
	/**********
	*
	*	Initializes the canvas.
	*	Let width and/or height undefined to fit the canvas to the screen size (fullscreen size).
	*
	*	Parameters :	canvas		: The canvas element.
	*					contextId	: Property of the context.
	*					width		: The width of the canvas. You can precise the css unit of this attribute in a String.
	*					height		: The width of the canvas. You can precise the css unit of this attribute in a String.
	*
	**********/
	initCanvas : function (canvas, contextId, width, height) {
		
		this.canvas = canvas;
		this.setCanvasSize(width, height);
		
		this.context = canvas.getContext(contextId);
		
	},
	
	/**********
	*
	*	Set game.canvas size.
	*
	*	Let width and/or height undefined to fit the canvas to the screen size (fullscreen).
	*
	*	Parameters :	width	: The width of the canvas. You can precise the css unit of this attribute in a String.
	*					height	: The width of the canvas. You can precise the css unit of this attribute in a String.
	*
	**********/
	setCanvasSize : function (width, height) {
		
		if (typeof width === "undefined" || typeof height === "undefined") {
			//fit to the screen size (fullscreen)
			this.canvas.setAttribute("width", screen.width);
			this.canvas.setAttribute("height", screen.height);
		} else {
			this.canvas.setAttribute("width", width);
			this.canvas.setAttribute("height", height);
		}
		
	},
	
	/**********
	*
	*	Returns the canvas' height.
	*
	*	Returns : The canvas' height.
	*
	**********/
	getCanvasHeight : function () {
		
		return this.canvas.height;
		
	},
	
	/**********
	*
	*	Returns the canvas' width.
	*
	*	Returns : The canvas' width.
	*
	**********/
	getCanvasWidth : function () {
		
		return this.canvas.width;
		
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
		
	},
	
/********************************
		Gameloop handling part
 ********************************/	

	gameLoopInterval : null,
	fps : 60,
	dbCanvas : null,
	
	
	/**********
	 *
	 *	Starts or restarts the game loop which will run at the max speed limited by game.fps.
	 *	See game.setFPS() to set the max FPS rate.
	 *
	 **********/
	start : function () {
		this.dbCanvas = document.createElement("canvas");
		this.dbCanvas.setAttribute("width", this.canvas.width);
		this.dbCanvas.setAttribute("height", this.canvas.height);
		this.gameLoopInterval = setInterval(function () { game.run();}, 1000 / this.fps);
	},
	
	/**********
	 *
	 *	Run once the game loop.
	 *
	 **********/
	run : function () {
		
		//TODO : those functions are not functions ??? (WTF?)
		this.update();
		this.render(this.dbCanvas);
		this.display();
		
	},
	
	/**********
	 *
	 *	Stops the game loop.
	 *
	 **********/
	stop : function () {
		clearInterval(this.gameLoopInterval);
	},
	
	/**********
	 *
	 *	Updates the game behavior.
	 *	Overwrite it to create your game behavior.
	 *
	 **********/
	update : function () {},
	
	/**********
	*
	*	Renders the game in a buffer.
	*	Overwrite it to render your game.
	*	Don't forget to clear the buffer !
	*
	*	Parameter	:	bufferedCanvas :	The buffered canvas in which you will draw your game. It will be copied in the gale canvas at the end (double buffering).
	*
	**********/
	render : function (bufferCanvas) {},
	
	/**********
	 *
	 *	Display your game in the game canvas.
	 *
	 **********/
	display : function () {
		this.context.drawImage(this.dbCanvas, 0, 0, this.dbCanvas.width, this.dbCanvas.height);
	},
	
	/**********
	 *
	 *	Set the Frame Per Second with which the game will be displayed
	 *
	 *	Parameter : fps : The number of Frame Per Second to display.
	 *
	 **********/
	setFPS : function (fps) {
		this.fps = fps;
	}
	
};
