'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var shttr = function shttr() {

    var inputForm = document.getElementById('user-input-form');

    var newBtn = document.querySelector('.new-btn');
    var newSubmitBtn = document.querySelector('.new-submit-btn');
    var loginBtn = document.querySelector('.login-btn');
    var loginSubmitBtn = document.querySelector('.login-submit-btn');

    var nameInput = document.querySelector('.name-input');
    var usernameInput = document.querySelector('.username-input');
    var emailInput = document.querySelector('.email-input');
    var passwordInput = document.querySelector('.password-input');
    var imageInput = document.querySelector('.image-input');

    var userObj = {};
    var authObj = {};
    var currUser = {};
    var newTweet = {};
    var tweets = [];

    function bindEvents() {

      newBtn.addEventListener('click', function () {
        event.preventDefault();
        newBtn.classList.add('is-hidden');
        loginBtn.classList.add('is-hidden');
        nameInput.classList.remove('is-hidden');
        usernameInput.classList.remove('is-hidden');
        emailInput.classList.remove('is-hidden');
        passwordInput.classList.remove('is-hidden');
        imageInput.classList.remove('is-hidden');
        newSubmitBtn.classList.remove('is-hidden');
      }); //newBtn

      loginBtn.addEventListener('click', function () {
        event.preventDefault();
        newBtn.classList.add('is-hidden');
        loginBtn.classList.add('is-hidden');
        emailInput.classList.remove('is-hidden');
        passwordInput.classList.remove('is-hidden');
        loginSubmitBtn.classList.remove('is-hidden');
      }); //loginBtn


      newSubmitBtn.addEventListener('click', function () {
        event.preventDefault();
        userObj = {
          name: nameInput.value,
          nickname: usernameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
          image: imageInput.value
        };
        addUser(userObj);
        inputForm.reset();
      }); //newSubmitBtn


      loginSubmitBtn.addEventListener('click', function () {
        event.preventDefault();
        authObj = {
          email: emailInput.value,
          password: passwordInput.value
        };
        // console.log('authUser', authObj);
        authUser(authObj);
        inputForm.reset();
      }); //loginSubmitBtn
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
        // console.log('sent!', response);
        currUser = response.data;
        // console.log(currUser);
        inputForm.classList.add('is-hidden');
        new CurrentUser(currUser);
      }).catch(function (status) {
        console.log(status);
      });
    } //end addUser


    function authUser(authObj) {
      // console.log('authObj', authObj);
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
        currUser = response.data;
        // console.log('sent! currUser', currUser);
        inputForm.classList.add('is-hidden');
        getTweets();
        new CurrentUser(currUser);
      }).catch(function (status) {
        console.log(status);
      });
    } //end authUser

    var CurrentUser = function () {
      function CurrentUser(data) {
        _classCallCheck(this, CurrentUser);

        this.name = data.name;
        this.nickname = data.nickname;
        this.image = data.image;
        this.buildLeftBlock();
        this.buildCenterBlock();
        this.buildRightBlock();
        this.listenForTweets();
      }

      _createClass(CurrentUser, [{
        key: 'buildLeftBlock',
        value: function buildLeftBlock() {
          var source = $('#user-content-template').html();
          var template = Handlebars.compile(source);
          var context = {
            name: this.name,
            nickname: this.nickname,
            image: this.image
          };
          var html = template(context);
          $('.left-container').prepend(html);
        } //buildLeftBlock

      }, {
        key: 'buildCenterBlock',
        value: function buildCenterBlock() {
          var source = $('#new-tweet-template').html();
          var template = Handlebars.compile(source);
          var context = {
            image: this.image
          };
          var html = template(context);
          $('.center-container').prepend(html);
        } //buildCenterBlock

      }, {
        key: 'buildRightBlock',
        value: function buildRightBlock() {
          $('.right-container').removeClass('is-hidden');
        } //buildRightBlock}

      }, {
        key: 'listenForTweets',
        value: function listenForTweets() {
          var tweetBtn = $('.new-tweet button');
          var tweetTextarea = $('.new-tweet-text');
          var tweetForm = $('.new-tweet-form');

          tweetTextarea.on('focus', function () {
            tweetBtn.fadeIn();
          });
          tweetForm.on('submit', function () {
            event.preventDefault();
            var message = tweetTextarea.val();
            tweetBtn.fadeOut();
            // console.log('message', message);
            addTweet(message);
            tweetTextarea.val('');
          });
        } //listenForTweets

      }]);

      return CurrentUser;
    }(); //CurrentUser

    function addTweet(newTweet) {
      $.ajax({
        type: 'POST',
        url: 'http://chattertiy-api.herokuapp.com/messages',
        dataType: 'json',
        crossDomain: 'true',
        data: {
          'message[text]': newTweet,
          'message[user_id]': currUser.id
        }
      }).then(function (response) {
        // console.log('sent tweet!', response);
        getTweets();
      }).catch(function (status) {
        console.log(status);
      });
    } //end addTweet

    function getTweets() {
      $.get('https://chattertiy-api.herokuapp.com/users/' + currUser.id).then(function (response) {
        // console.log('getT response', response);
        var tweets = response.user.messages;
        // console.log('tweets', tweets);
        var tweetObj = {};
        var tweetArr = [];
        for (var i = 0; tweets.length > i; i++) {
          tweetObj = {
            name: currUser.name,
            nickname: currUser.nickname,
            text: tweets[i].text,
            image: currUser.image
          };
          tweetArr.push(tweetObj);
        }
        // console.log(tweetArr);
        buildTweets(tweetArr);
      }).catch(function (status) {
        console.log(status);
      });
    } //end getTweets

    function buildTweets(array) {
      console.log('array', array);
      $('.tweets-right').remove();
      array = array.reverse();
      // for (let i = 0; array.length > i; i++) {
      var source = $('#my-tweet-template').html();
      var template = Handlebars.compile(source);
      var context = {
        text: array
      };
      var html = template(context);
      $('.center-container').append(html);
      // }
    } //BuildTweets

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