( function() {
	"use strict";

	$( document ).ready( () => {

		console.clear();

		const APP = function() {

			const thing = 'something';
			console.log(thing);




			function init() {

			}

			return {
				begin: init
			};

		}; //end APP

	} ); //end docready

	const THING = APP();
	THING.init();

} )(); //end iife
