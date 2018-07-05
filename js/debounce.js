'use strict';
// модуль для устранения дребезга //
(function () {

  var TIMEOUT = 500;

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, TIMEOUT);
    };
  };

})();
