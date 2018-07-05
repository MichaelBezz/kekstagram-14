'use strict';
// служебные сообщения //
(function () {

  var uploadDataMessageError = function (message) {
    var node = document.createElement('div');
    node.classList.add('messege-error');
    node.textContent = message;

    var closeNode = document.createElement('button');
    closeNode.classList.add('messege-error-close');
    closeNode.textContent = 'Попробовать еще раз';

    closeNode.addEventListener('click', function () {
      window.location.reload();
    });

    node.appendChild(closeNode);
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var imgUploadMessageError = document.querySelector('#picture')
    .content
    .querySelector('.img-upload__message--error');

  var uploadMessageError = function (message) {
    var messageError = imgUploadMessageError.cloneNode(true);

    messageError.classList.remove('hidden');
    messageError.querySelector('.error__links').textContent = message;
    window.form.imgUploadOverlay.classList.add('hidden');

    document.body.appendChild(messageError);
  };

  window.errorMessage = {
    uploadDataMessageError: uploadDataMessageError,
    uploadMessageError: uploadMessageError
  };

})();
