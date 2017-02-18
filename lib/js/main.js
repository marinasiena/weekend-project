'use strict';

(function () {
	"use strict";

	var shttr = function shttr() {
		var inputForm = document.querySelector('.user-input-form');
		var nameInput = document.querySelector('.name-input');
		var usernameInput = document.querySelector('.username-input');
		var emailInput = document.querySelector('.email-input');
		var passwordInput = document.querySelector('.password-input');
		var imageInput = document.querySelector('.image-input');
		var tweetForm = document.querySelector('.new-tweet-form');
		var tweetText = document.querySelector('.tweet-text');
		var newBtn = document.querySelector('.new-btn');
		var authBtn = document.querySelector('.auth-btn');

		var userObj = {};
		var authObj = {};
		var currUser = {};
		var tweetObj = {};

		function bindEvents() {

			newBtn.addEventListener('click', function () {
				event.preventDefault();
				userObj = {
					name: nameInput.value,
					nickname: usernameInput.value,
					email: emailInput.value,
					password: passwordInput.value,
					image: imageInput.value
				};
				console.log('newUser', userObj);
				addUser(userObj);
				inputForm.reset();
			});

			authBtn.addEventListener('click', function () {
				event.preventDefault();
				authObj = {
					email: emailInput.value,
					password: passwordInput.value
				};
				console.log('authUser', authObj);
				authUser(authObj);
				inputForm.reset();
			});

			tweetForm.addEventListener('submit', function () {
				event.preventDefault();
				tweetObj = {
					text: tweetText.value,
					id: currUser.id
				};
				addTweet(tweetObj);
				inputForm.reset();
			});
		} //end bindEvents

		function addUser(userObj) {

			$.ajax({
				type: 'POST',
				url: 'https://chattertiy-api.herokuapp.com/auth?email=' + userObj.email + '&password=' + userObj.password + '&password_confirmation=' + userObj.password,
				dataType: 'json',
				crossDomain: 'true',
				data: {
					name: userObj.name,
					username: userObj.username,
					email: userObj.email,
					password: userObj.password,
					image: userObj.image
				}
			}).then(function (response) {
				console.log('sent!', response);
				currUser = response.data;
				console.log(currUser);

				//     getUserID();
			}).catch(function (status) {
				console.log(status);
			});
		} //end submitUser


		function authUser(authObj) {

			$.ajax({
				type: 'POST',
				url: 'http://chattertiy-api.herokuapp.com/auth/sign_in',
				dataType: 'json',
				crossDomain: 'true',
				data: {
					email: authObj.email,
					password: authObj.password
				}
			}).then(function (response) {
				console.log('sent!', response);
				currUser = response.data;
			}).catch(function (status) {
				console.log(status);
			});
		} //end submitUser

		function addTweet(tweetObj) {
			$.ajax({
				type: 'POST',
				url: 'http://chattertiy-api.herokuapp.com/messages',
				dataType: 'json',
				crossDomain: 'true',
				data: {
					message: tweetObj.text,
					id: tweetObj.id
				}
			}).then(function (response) {
				console.log('sent!', response);
				//     getUserID();
			}).catch(function (status) {
				console.log(status);
			});
		} //end addTweet

		function init() {
			bindEvents();
		}

		return {
			init: init
		};
	}; //end shttr

	var ourTwitter = shttr();
	ourTwitter.init();

	// } ); //end docready
})(); //end iife