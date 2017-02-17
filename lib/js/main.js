"use strict";

(function () {
  "use strict";

  $(document).ready(function () {

    console.clear();

    var APP = function APP() {

      var thing = 'something';
      console.log(thing);

      function init() {}

      return {
        begin: init
      };
    }; //end APP
  }); //end docready

  var THING = APP();
  THING.init();
})(); //end iife