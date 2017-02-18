( function() {
	"use strict";

	$( document ).ready( () => {

		const shttr = (function() {

			const inputForm = document.querySelector( '.user-input-form' );
			const nameInput = document.querySelector( '.name-input' );
			const usernameInput = document.querySelector( '.username-input' );
			const emailInput = document.querySelector( '.email-input' );
			const passwordInput = document.querySelector( '.password-input' );
			const imageInput = document.querySelector( '.image-input' );


      let userObj = {};


			function bindEvents() {
				inputForm.addEventListener( 'submit', () => {
					event.preventDefault();
          userObj = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            image: imageInput.value
          };
					console.log( 'newUser',userObj );
          addUser(userObj);
          inputForm.reset();
				} );

        inputForm.addEventListener( 'submit', () => {
					event.preventDefault();
          userObj = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            image: imageInput.value
          };
					console.log( 'newUser',userObj );
          addUser(userObj);
          inputForm.reset();
				} );

			} //end bindEvents

function addUser(userObj) {
  if (userObj) {
  const newUserURL = `https://chattertiy-api.herokuapp.com/auth?email=${userObj.email}&password=${userObj.password}&password_confirmation=${userObj.password}`;
} else
  const authUserURL = `http://chattertiy-api.herokuapp.com/auth/sign_in?email=${userObj.email}&password=${userObj.password}`;

  $.ajax( {
    type: 'POST',
    url: 'url',
    dataType: 'json',
    crossDomain: 'true',
    data: {
      name: userObj.name,
      username: userObj.username,
      email: userObj.email,
      password: userObj.password,
      image: userObj.image
    }
  } ).then( (response) => {
    console.log( 'sent!', response );
    //     getUserID();
  } ).catch( function( status ) {
    console.log( status );
  } );
} //end submitUser

			function init() {
				bindEvents();
			}

			return {
				init: init
			};

    });

		const ourTwitter = shttr();
		ourTwitter.init();
	}); //end docready
} )(); //end iife

// class User {
//      constructor(data) {
//        this.name = data.name;
//        this.userName = data.username;
//        this.email = data.email;
//        this.password = data.password;
//        this.image = data.image;
//        this.build();
//      }
//      build() {
//        const source = $('').html();
//        const template = Handlebars.compile(source);
//        const context = {
//          name: this.name,
//          userName: this.userName,
//          email: this.email,
//          password: this.password,
//          image: this.image
//        };
//        const html = template(context);
//        $('.grid').prepend(html);
//      }
//    }
// }
