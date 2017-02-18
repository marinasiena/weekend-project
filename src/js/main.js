(function() {
  "use strict";

  const shitterModule = function() {
    let form = document.querySelector('.user-input-form');
    let nameInput = document.querySelector('.name-input');
    let usernameInput = document.querySelector('.username-input');
    let emailInput = document.querySelector('.email-input');
    let passwordInput = document.querySelector('.password-input');
    let imageInput = document.querySelector('.image-input');
    let tweetForm = document.querySelector('.new-tweet-form');
    let tweetText = document.querySelector('.tweet-text');


    let userObj = {};


    // class User {
    //   constructor(data) {
    //     this.email = data.email;
    //     this.userName = data.username;
    //     this.name = data.name;
    //     this.image = data.image;
    //     this.build();
    //   }
    //   build() {
    //     const source = $('').html();
    //     const template = Handlebars.compile(source);
    //     const context = {
    //       email: this.email,
    //       userName: this.userName,
    //       name: this.name,
    //       image: this.image
    //     };
    //     const html = template(context);
    //     $('.grid').prepend(html);
    //   }
    // }

    function bindEvents() {

      form.addEventListener('submit', () => {
        event.preventDefault();
        userObj = {
          name: nameInput.value,
          username: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          image: imageInput.value
        }
        form.reset();
        addUser(userObj);
      });

      tweetForm.addEventListener('submit', () => {
        event.preventDefault();
        tweetObj = {
          message: tweetText.value,

        }
        form.reset();
        addTweet(tweetObj);
      });

    } //end bindEvents


    function addUser(userObj) {
      $.ajax({
        type: 'POST',
        url: `https://chattertiy-api.herokuapp.com/auth?email=${userObj.email}&password=${userObj.password}&password_confirmation=${userObj.password}`,
        dataType: 'json',
        crossDomain: 'true',
        data: {
          name: userObj.name,
          username: userObj.username,
          email: userObj.email,
          password: userObj.password,
          image: userObj.image
        }
      }).then((response) => {
        console.log('sent!');
        //     getUserID();
      }).catch(function(status) {
        console.log(status);
      });
    } //end submitUser

    function addTweet(tweetObj) {
      $.ajax({
        type: 'POST',
        url: `http://chattertiy-api.herokuapp.com/messages?message[user_id]=1&message[text]=the ${tweetObj.message}`,
        dataType: 'json',
        crossDomain: 'true',
        data: {

        }
      }).then((response) => {
        console.log('sent!', response);
        //     getUserID();
      }).catch(function(status) {
        console.log(status);
      });
    } //end submitUser

    function init() {
      bindEvents();
    }

    return {
      init: init
    };
  }; //end APP

  const shitterApp = shitterModule();
  shitterApp.init();
})(); //end iife
