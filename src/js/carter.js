(function() {
"use strict";

$(document).ready(() => {

    console.clear();

    const APP = function() {

      const thing = 'something';
      console.log(thing);




      function init() {
        //bindEvents();
      }
      // add genre function
      function addUser(userObj) {
        const addUser = {
          method: 'POST',
          url: "https://chattertiy-api.herokuapp.com/auth?email=test@test.com&password=password&password_confirmation=password",
          headers: {
            'content-type': 'application/json;charset=utf-8'
          },
          data: JSON.stringify({
            "email": userObj.email,
            "name": userObj.name,
            "uid": userObj.email,
            "image": userObj.image
          })
        };
        $.ajax(addUser).then((response) => {
          // let user know edit was successful
          alert('User successfully created. welcome to Sh*tter');
        });
        console.log(response);
      }).catch((error) => {
      console.log(error);
    });
  }
  return {
    begin: init
  };
}; //end APP


const THING = APP();
THING.init();

}); //end docready
})(); //end iife
