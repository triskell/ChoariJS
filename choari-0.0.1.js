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

	/**********
	*
	*	Initializes the library and the canvas.
	*	Let width and/or height undefined to fit the canvas to the screen size (fullscreen).
	*
	*	Parameters :	canvas	: The canvas element.
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
			this.setFullScreen(canvas, true);
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