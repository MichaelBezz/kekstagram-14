'use strict';
// модуль для отрисовки миниатюры //
(function () {

  // var MAX_COMMENT_COUNT = 5;

  var mainPhotocard = document.querySelector('.big-picture');
  var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');
  // var commentShow = mainPhotocard.querySelector('.comments-show');
  // var socialLoadmore = mainPhotocard.querySelector('.social__loadmore');
  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onOverlayOpenClick = function () {
    mainPhotocard.classList.remove('hidden');
    document.addEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onOverlayClose = function () {
    mainPhotocard.classList.add('hidden');
    document.removeEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия по esc
  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      onOverlayClose();
    }
  };
  // обработчик события - закрываем форму оверлея по нажатию на esc
  mainPhotocard.addEventListener('keydown', onOverlayClose);
  // обработчик события - закрываем форму оверлея по клику
  bigPicturesCancel.addEventListener('click', onOverlayClose);

  /*

  // функция, которая создает массив из комментариев
  var getArrayComments = function () {
    var arrayComments = Array.from(mainPhotocard.querySelectorAll('.social__comment'));
    return arrayComments;
  };

  var getSocialComments = function () {
    var socialComments = getArrayComments();
    if (socialComments.length <= MAX_COMMENT_COUNT) {
      socialLoadmore.classList.add('hidden');
    } else {
      var numberSocialComments = MAX_COMMENT_COUNT;

    }
  };

  var showSocialComments = function () {
    var socialComments = getArrayComments();

  };


*/

  /*
  // функция, которая создает массив из комментариев
  var getArrayComments = function () {
    var arrayComments = Array.from(mainPhotocard.querySelectorAll('.social__comment'));
    return arrayComments;
  };
  // функция, которая определяет сколько всего комментариев показанно в данный момент
  var getNumberSocialComments = function () {
    var socialComments = getArrayComments();
    var commentCounter = 0;
    for (var i = 0; i < socialComments.length; i++) {
      if (socialComments[i].style.display === '') {
        commentCounter += 1;
      }
    }
    commentShow.textContent = commentCounter;
  };
  // функция, которая скрывает лишние комментарии
  var hideSocialComments = function () {
    var socialComments = getArrayComments();
    if (socialComments.length > MAX_COMMENT_COUNT) {
      for (var i = MAX_COMMENT_COUNT; i < socialComments.length; i++) {
        socialComments[i].style.display = 'none';
      }
    }
    getNumberSocialComments();
  };
  // функция, которая загружает дополнительные комментарии
  var onSocialCommentsLoadmore = function () {
    var socialComments = getArrayComments();
    socialComments.filter(function (comment) {
      return comment.style.display === 'none';
    });

    for (var i = 0; i < MAX_COMMENT_COUNT; i++) {
      socialComments[i].style.display = '';
    }

    getNumberSocialComments();
  };
  // функция, которая скрывает кнопку загрузки дополнительных комментариев
  var hideSocialCommentsLoadmore = function () {
    var socialComments = getArrayComments();
    if (socialComments.length <= MAX_COMMENT_COUNT) {
      socialLoadmore.classList.add('hidden');
    }
  };
*/
  window.gallery = {
    mainPhotocard: mainPhotocard,
    onOverlayOpenClick: onOverlayOpenClick
  };

})();
