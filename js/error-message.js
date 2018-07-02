'use strict';
// служебные сообщения //
(function () {

  window.errorMessage = function (text) {
    var message = document.createElement('div');
    message.classList.add = 'error-message';
    message.textContent = text;

    document.body.insertAdjacentElement('afterbegin', message);
  };

})();
