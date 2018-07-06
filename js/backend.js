'use strict';
// модуль работы с сервером //
(function () {

  var SERVER_URL_GET = 'https://js.dump.academy/kekstagram/data';
  var SERVER_URL_POST = 'https://js.dump.academy/kekstagram';
  var Code = {
    SUCCESSFUL: 200,
    REDIRECT: 300,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
  };
  var TIMEOUT = 10000;

  var setupInquiry = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESSFUL) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      var messageError = '';
      switch (xhr.status) {
        case Code.REDIRECT:
          messageError = 'Ресурс переехал';
          break;

        case Code.BAD_REQUEST:
          messageError = 'Неправильный запрос';
          break;

        case Code.INTERNAL_SERVER_ERROR:
          messageError = 'Внутренняя ошибка сервера';
          break;

        default:
          messageError = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      onError(messageError);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;

  };

  var upload = function (data, onLoad, onError) {
    var xhr = setupInquiry(onLoad, onError);
    xhr.open('POST', SERVER_URL_POST);
    xhr.send(data);
  };

  var download = function (onLoad, onError) {
    var xhr = setupInquiry(onLoad, onError);
    xhr.open('GET', SERVER_URL_GET);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    download: download
  };

})();
