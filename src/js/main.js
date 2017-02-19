(function() {
  "use strict";

  const shttr = function() {
    let inputForm = document.getElementById('user-input-form');
    let nameInput = document.querySelector('.name-input');
    let usernameInput = document.querySelector('.username-input');
    let emailInput = document.querySelector('.email-input');
    let passwordInput = document.querySelector('.password-input');
    let imageInput = document.querySelector('.image-input');
    let tweetForm = document.querySelector('.new-tweet-form');
    let tweetText = document.querySelector('.tweet-text');
    let newBtn = document.querySelector('.new-btn');
    let signInBtn = document.querySelector('.sign-in');
    let authBtn = document.querySelector('.auth-btn');
    let inBtn = document.querySelector('.in-there');

    let userObj = {};
    let authObj = {};
    let currUser = {};
    let tweetObj = {};

    class CurrentUser {
      constructor(data) {
        this.name = data.name;
        this.nickname = data.nickname;
        this.image = data.image;
        this.build();
      }
      build() {
        const source = $('#content-template').html();
        const template = Handlebars.compile(source);
        const context = {
          name: this.name,
          nickname: this.nickname,
          image: this.image
        };
        const html = template(context);
        $('.content-container').prepend(html);
      }
    }

    function bindEvents() {

      newBtn.addEventListener('click', () => {
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

      authBtn.addEventListener('click', () => {
        event.preventDefault();
        authObj = {
          email: emailInput.value,
          password: passwordInput.value,
        };
        console.log('authUser', authObj);
        authUser(authObj);
        inputForm.reset();
      });

      if (!tweetForm) {

      } else {
        tweetForm.addEventListener('submit', () => {
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
        console.log('sent!', response);
        currUser = response.data;
        console.log(currUser);

        inputForm.classList.add('is-hidden');

        new CurrentUser(currUser);


        //     getUserID();
      }).catch(function(status) {
        console.log(status);
      });
    } //end submitUser


    function authUser(authObj) {

      console.log('authObj', authObj);
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

      $.ajax(settings)
        .then((response) => {
          console.log('sent!', response);
          currUser = response.data;
          inputForm.classList.add('is-hidden');

          new CurrentUser(currUser);
        }).catch(function(status) {
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
      }).then((response) => {
        console.log('sent!', response);
        //     getUserID();
      }).catch(function(status) {
        console.log(status);
      });
    } //end addTweet

    function getTweets() {
      $.get(`http://chattertiy-api.herokuapp.com/messages?user_id=17`)
        .then((response) => {
          console.log('got tweets!', response);
          //     getUserID();
        }).catch(function(status) {
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

  const ourTwitter = shttr();
  ourTwitter.init();

})(); //end iife
