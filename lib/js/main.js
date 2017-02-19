'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var shttr = function shttr() {
    var inputForm = document.getElementById('user-input-form');
    var nameInput = document.querySelector('.name-input');
    var usernameInput = document.querySelector('.username-input');
    var emailInput = document.querySelector('.email-input');
    var passwordInput = document.querySelector('.password-input');
    var imageInput = document.querySelector('.image-input');
    var tweetForm = document.querySelector('.new-tweet-form');
    var tweetText = document.querySelector('.tweet-text');
    var newBtn = document.querySelector('.new-btn');
    var signInBtn = document.querySelector('.sign-in');
    var authBtn = document.querySelector('.auth-btn');
    var inBtn = document.querySelector('.in-there');

    var userObj = {};
    var authObj = {};
    var currUser = {};
    var tweetObj = {};

    var CurrentUser = function () {
      function CurrentUser(data) {
        _classCallCheck(this, CurrentUser);

        this.name = data.name;
        this.nickname = data.nickname;
        this.image = data.image;
        this.build();
      }

      _createClass(CurrentUser, [{
        key: 'build',
        value: function build() {
          var source = $('#content-template').html();
          var template = Handlebars.compile(source);
          var context = {
            name: this.name,
            nickname: this.nickname,
            image: this.image
          };
          var html = template(context);
          $('.content-container').prepend(html);
        }
      }]);

      return CurrentUser;
    }();

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
        // inputForm.setAttribute('class', 'is-hidden');
        // inputForm2.setAttribute('class', 'is-hidden');
        console.log('newUser', userObj);
        addUser(userObj);
        inputForm.reset();
      });
      //
      // signInBtn.addEventListener('click', () => {
      //   event.preventDefault();
      //   inputForm.classList.add('is-hidden');
      //   inputForm2.classList.remove('is-hidden');
      // });

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

      if (!tweetForm) {} else {
        tweetForm.addEventListener('submit', function () {
          event.preventDefault();
          tweetObj = {
            text: tweetText.value,
            id: currUser.id
          };
          addTweet(tweetObj);
          inputForm.reset();
        });
      }
    } //end bindEvents

    function addUser(userObj) {

      $.ajax({
        type: 'POST',
        url: 'https://chattertiy-api.herokuapp.com/auth',
        dataType: 'json',
        crossDomain: 'true',
        data: {
          name: userObj.name,
          nickname: userObj.nickname,
          email: userObj.email,
          password: userObj.password,
          image: userObj.image
        }
      }).then(function (response) {
        console.log('sent!', response);
        currUser = response.data;
        console.log(currUser);

        inputForm.classList.add('is-hidden');

        new CurrentUser(currUser);

        //     getUserID();
      }).catch(function (status) {
        console.log(status);
      });
    } //end submitUser


    function authUser(authObj) {

      console.log('authObj', authObj);
      var settings = {

        method: 'POST',
        url: 'http://chattertiy-api.herokuapp.com/auth/sign_in',
        dataType: 'json',
        crossDomain: 'true',
        data: {
          email: authObj.email,
          password: authObj.password
        }
      };

      $.ajax(settings).then(function (response) {
        console.log('sent!', response);
        currUser = response.data;
        inputForm.classList.add('is-hidden');

        new CurrentUser(currUser);
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
          'message[text]': tweetObj.text,
          'message[user_id]': currUser.id
        }
      }).then(function (response) {
        console.log('sent!', response);
        //     getUserID();
      }).catch(function (status) {
        console.log(status);
      });
    } //end addTweet

    function getTweets() {
      $.get('http://chattertiy-api.herokuapp.com/messages?user_id=17').then(function (response) {
        console.log('got tweets!', response);
        //     getUserID();
      }).catch(function (status) {
        console.log(status);
      });
    } //end addTweet

    function init() {
      bindEvents();
      // getTweets();
    }

    return {
      init: init
    };
  }; //end shttr

  var ourTwitter = shttr();
  ourTwitter.init();
})(); //end iife