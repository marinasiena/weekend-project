( function() {
	"use strict";

	const shttr = function() {
		let inputForm = document.querySelector( '.user-input-form' );
		let nameInput = document.querySelector( '.name-input' );
		let usernameInput = document.querySelector( '.username-input' );
		let emailInput = document.querySelector( '.email-input' );
		let passwordInput = document.querySelector( '.password-input' );
		let imageInput = document.querySelector( '.image-input' );
		let tweetForm = document.querySelector( '.new-tweet-form' );
		let tweetText = document.querySelector( '.tweet-text' );
		let newBtn = document.querySelector( '.new-btn' );
		let authBtn = document.querySelector( '.auth-btn' );



		let userObj = {};
		let authObj = {};
		let currUser = {};
		let tweetObj = {};


    class CurrentUser {
     constructor(data) {
       this.name = nameInput.value;
       this.nickname = usernameInput.value;
       this.image = imageInput.value;
       this.build();
     }
     build() {
       const source = $('#twitter-block').html();
       const template = Handlebars.compile(source);
       const context = {
         name: this.name,
         nickname: this.nickname,
         image: this.image
       };
       const html = template(context);
       $('.page-wrapper').prepend(html);
     }
   }

		function bindEvents() {

			newBtn.addEventListener( 'click', () => {
				event.preventDefault();
				userObj = {
					name: nameInput.value,
					nickname: usernameInput.value,
					email: emailInput.value,
					password: passwordInput.value,
					image: imageInput.value
				};
				console.log( 'newUser', userObj );
				addUser( userObj );
        new CurrentUser(userObj);
				inputForm.reset();
			} );

			authBtn.addEventListener( 'click', () => {
				event.preventDefault();
				authObj = {
					email: emailInput.value,
					password: passwordInput.value,
				};
				console.log( 'authUser', authObj );
				authUser( authObj );
        new CurrentUser(userObj);
				inputForm.reset();
			} );

			// tweetForm.addEventListener( 'submit', () => {
			// 	event.preventDefault();
			// 	tweetObj = {
			// 		text: tweetText.value,
			// 		id: currUser.id
			// 	};
			// 	addTweet( tweetObj );
			// 	inputForm.reset();
			// } );
		} //end bindEvents

		function addUser( userObj ) {

			$.ajax( {
				type: 'POST',
				url: `https://chattertiy-api.herokuapp.com/auth`,
				dataType: 'json',
				crossDomain: 'true',
				data: {
					name: userObj.name,
					nickname: userObj.username,
					email: userObj.email,
					password: userObj.password,
					image: userObj.image
				}
			} ).then( ( response ) => {
				console.log( 'sent!', response );
				currUser = response.data;
				console.log( currUser );

				//     getUserID();
			} ).catch( function( status ) {
				console.log( status );
			} );
		} //end submitUser


		// method: 'POST',
		// url: 'http://chattertiy-api.herokuapp.com/auth',
		// data: {
		//   email: 'foo@bar.com',
		//   password: 'password1',
		//   password_confirmation: 'password1'




		function authUser( authObj ) {

			console.log( 'authObj', authObj );
			const settings = {

				method: 'POST',
				url: 'http://chattertiy-api.herokuapp.com/auth/sign_in',
				dataType: 'json',
				crossDomain: 'true',
				data: {
					email: authObj.email,
					password: authObj.password,
				}
			};

			$.ajax( settings )
				.then( ( response ) => {
					console.log( 'sent!', response );
					currUser = response.data;
				} ).catch( function( status ) {
					console.log( status );
				} );
		} //end submitUser

		function addTweet( tweetObj ) {
			$.ajax( {
				type: 'POST',
				url: 'http://chattertiy-api.herokuapp.com/messages',
				dataType: 'json',
				crossDomain: 'true',
				data: {
					'message[text]': tweetObj.text,
					'message[user_id]': currUser.id
				}
			} ).then( ( response ) => {
				console.log( 'sent!', response );
				//     getUserID();
			} ).catch( function( status ) {
				console.log( status );
			} );
		} //end addTweet

    function getTweets(  ) {
      $.get(`http://chattertiy-api.herokuapp.com/messages?user_id=17`)
      .then( ( response ) => {
        console.log( 'got tweets!', response );
        //     getUserID();
      } ).catch( function( status ) {
        console.log( status );
      } );
    } //end addTweet

		function init() {
			bindEvents();
      getTweets();
		}


		return {
			init: init
		};

	}; //end shttr

	const ourTwitter = shttr();
	ourTwitter.init();

	// } ); //end docready

} )(); //end iife
