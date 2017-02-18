'use strict';

(function () {
  "use strict";

  $(document).ready(function () {

    var shttr = function shttr() {

      var inputForm = document.querySelector('.user-input-form');
      var nameInput = document.querySelector('.name-input');
      var usernameInput = document.querySelector('.username-input');
      var emailInput = document.querySelector('.email-input');
      var passwordInput = document.querySelector('.password-input');
      var imageInput = document.querySelector('.image-input');

      var userObj = {};

      function bindEvents() {
        inputForm.addEventListener('submit', function () {
          event.preventDefault();
          userObj = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            image: imageInput.value
          };
          console.log('newUser', userObj);
          addUser(userObj);
          inputForm.reset();
        });

        inputForm.addEventListener('submit', function () {
          event.preventDefault();
          userObj = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            image: imageInput.value
          };
          console.log('newUser', userObj);
          addUser(userObj);
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
          //     getUserID();
        }).catch(function (status) {
          console.log(status);
        });
      } //end submitUser

      function init() {
        bindEvents();
      }

      return {
        init: init
      };
    };

    var ourTwitter = shttr();
    ourTwitter.init();
  }); //end docready
})(); //end iife

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