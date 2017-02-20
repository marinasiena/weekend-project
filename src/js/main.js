(function() {
  "use strict";

  const shttr = function() {

    const inputForm = document.getElementById('user-input-form');

    const newBtn = document.querySelector('.new-btn');
    const newSubmitBtn = document.querySelector('.new-submit-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginSubmitBtn = document.querySelector('.login-submit-btn');


    const nameInput = document.querySelector('.name-input');
    const usernameInput = document.querySelector('.username-input');
    const emailInput = document.querySelector('.email-input');
    const passwordInput = document.querySelector('.password-input');
    const imageInput = document.querySelector('.image-input');

    let userObj = {};
    let authObj = {};
    let currUser = {};
    let newTweet = {};
    let tweets = [];

    function bindEvents() {

      newBtn.addEventListener('click', () => {
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

      loginBtn.addEventListener('click', () => {
        event.preventDefault();
        newBtn.classList.add('is-hidden');
        loginBtn.classList.add('is-hidden');
        emailInput.classList.remove('is-hidden');
        passwordInput.classList.remove('is-hidden');
        loginSubmitBtn.classList.remove('is-hidden');
      }); //loginBtn


      newSubmitBtn.addEventListener('click', () => {
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


      loginSubmitBtn.addEventListener('click', () => {
        event.preventDefault();
        authObj = {
          email: emailInput.value,
          password: passwordInput.value,
        };
        // console.log('authUser', authObj);
        authUser(authObj);
        inputForm.reset();
      }); //loginSubmitBtn
    } //end bindEvents

    function addUser(userObj) {
      $.ajax({
        type: 'POST',
        url: `https://chattertiy-api.herokuapp.com/auth`,
        dataType: 'json',
        crossDomain: 'true',
        data: {
          name: userObj.name,
          nickname: userObj.nickname,
          email: userObj.email,
          password: userObj.password,
          image: userObj.image
        }
      }).then((response) => {
        // console.log('sent!', response);
        currUser = response.data;
        // console.log(currUser);
        inputForm.classList.add('is-hidden');
        new CurrentUser(currUser);
      }).catch(function(status) {
        console.log(status);
      });
    } //end addUser


    function authUser(authObj) {
      // console.log('authObj', authObj);
      const settings = {
        method: 'POST',
        url: 'https://chattertiy-api.herokuapp.com/auth/sign_in',
        dataType: 'json',
        crossDomain: 'true',
        data: {
          email: authObj.email,
          password: authObj.password,
        }
      };
      $.ajax(settings)
        .then((response) => {
          currUser = response.data;
          // console.log('sent! currUser', currUser);
          inputForm.classList.add('is-hidden');
          getTweets();
          new CurrentUser(currUser);
        }).catch(function(status) {
          console.log(status);
        });
    } //end authUser

    class CurrentUser {
      constructor(data) {
        this.name = data.name;
        this.nickname = data.nickname;
        this.image = data.image;
        this.buildLeftBlock();
        this.buildCenterBlock();
        this.buildRightBlock();
        this.listenForTweets();
      }
      buildLeftBlock() {
        const source = $('#user-content-template').html();
        const template = Handlebars.compile(source);
        const context = {
          name: this.name,
          nickname: this.nickname,
          image: this.image
        };
        const html = template(context);
        $('.left-container').prepend(html);
      } //buildLeftBlock

      buildCenterBlock() {
        const source = $('#new-tweet-template').html();
        const template = Handlebars.compile(source);
        const context = {
          image: this.image
        };
        const html = template(context);
        $('.center-container').prepend(html);
      } //buildCenterBlock

      buildRightBlock() {
        $('.right-container').removeClass('is-hidden');
      } //buildRightBlock}

      listenForTweets() {
        const tweetBtn = $('.new-tweet button');
        const tweetTextarea = $('.new-tweet-text');
        const tweetForm = $('.new-tweet-form');

        tweetTextarea.on('focus', () => {
          tweetBtn.fadeIn();
        });
        tweetForm.on('submit', () => {
          event.preventDefault();
          let message = tweetTextarea.val();
          tweetBtn.fadeOut();
          // console.log('message', message);
          addTweet(message);
          tweetTextarea.val('');
        });
      } //listenForTweets

      listenForDelete() {
        $('.x-button').on('click', () => {
          event.preventDefault();

          console.log(this);
          deleteTweet();
        });
      }
    } //CurrentUser

    function deleteTweet() {

    }

    function addTweet(newTweet) {
      $.ajax({
        type: 'POST',
        url: 'https://chattertiy-api.herokuapp.com/messages',
        dataType: 'json',
        crossDomain: 'true',
        data: {
          'message[text]': newTweet,
          'message[user_id]': currUser.id
        }
      }).then((response) => {
        // console.log('sent tweet!', response);
        getTweets();
      }).catch(function(status) {
        console.log(status);
      });
    } //end addTweet

    function getTweets() {
      $.get(`https://chattertiy-api.herokuapp.com/users/${currUser.id}`)
        .then((response) => {
          // console.log('getT response', response);
          let tweets = response.user.messages;
          // console.log('tweets', tweets);
          let tweetObj = {};
          let tweetArr = []; ///
          for (let i = 0; tweets.length > i; i++) {
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

        }).catch(function(status) {
          console.log(status);
        });
    } //end getTweets

    function buildTweets(array) {
      console.log('array', array);
      $('.tweets-right').remove();
      array = array.reverse();
      // for (let i = 0; array.length > i; i++) {
      const source = $('#my-tweet-template').html();
      const template = Handlebars.compile(source);
      const context = {
        text: array
      };
      const html = template(context);
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

  const ourTwitter = shttr();
  ourTwitter.init();

})(); //end iife
