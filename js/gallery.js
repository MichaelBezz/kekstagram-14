'use strict';
// модуль для отрисовки миниатюры //
(function () {

  var MAX_COMMENTS = 5;

  var mainPhotocard = document.querySelector('.big-picture');
  var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');
  var commentShow = mainPhotocard.querySelector('.comments-show');
  var socialLoadmore = mainPhotocard.querySelector('.social__loadmore');
  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onOverlayOpen = function () {
    mainPhotocard.classList.remove('hidden');
    socialLoadmore.addEventListener('click', onSocialCommentsLoadmore);
    hideSocialComments();
    hideSocialCommentsLoadmore();
    document.addEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onOverlayClose = function () {
    mainPhotocard.classList.add('hidden');
    socialLoadmore.removeEventListener('click', onSocialCommentsLoadmore);
    document.removeEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия по esc
  var onOverlayEscPress = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      onOverlayClose();
    }
  };
  // обработчик события - закрываем форму оверлея по нажатию на esc
  document.addEventListener('keydown', function () {
    onOverlayClose();
  });
  // обработчик события - закрываем форму оверлея по клику
  bigPicturesCancel.addEventListener('click', function () {
    onOverlayClose();
  });
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
    if (socialComments.length > MAX_COMMENTS) {
      for (var i = MAX_COMMENTS; i < socialComments.length; i++) {
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

    for (var i = 0; i < socialComments.length; i++) {
      socialComments[i].style.display = '';
    }
    socialLoadmore.classList.add('hidden');
    getNumberSocialComments();
  };
  // функция, которая скрывает кнопку загрузки дополнительных комментариев
  var hideSocialCommentsLoadmore = function () {
    var socialComments = getArrayComments();
    if (socialComments.length <= MAX_COMMENTS) {
      socialLoadmore.classList.add('hidden');
    }
  };

  window.gallery = {
    mainPhotocard: mainPhotocard,
    onOverlayOpen: onOverlayOpen
  };

})();
