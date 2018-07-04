'use strict';
// модуль для отрисовки миниатюры //
(function () {

  var mainPhotocard = document.querySelector('.big-picture');
  var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');
  var commentShow = mainPhotocard.querySelector('.comments-show');
  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onOverlayOpen = function () {
    mainPhotocard.classList.remove('hidden');
    socialCommentsCounter();
    // hiddenSocialCommentsLoadmore();
    // hiddenSocialComments();
    document.addEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onOverlayClose = function () {
    mainPhotocard.classList.add('hidden');
    // socialLoadmore.removeEventListener('click', addSocialCommentsLoadmore);
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
  // функция, которая определяет сколько всего комментариев показанно в данный момент
  var socialCommentsCounter = function () {
    var socialComment = mainPhotocard.querySelectorAll('.social__comment');
    var valueCommentCounter = 0;
    for (var i = 0; i < socialComment.length; i++) {
      valueCommentCounter += 1;
    }
    commentShow.textContent = valueCommentCounter;
  };

  window.gallery = {
    mainPhotocard: mainPhotocard,
    onOverlayOpen: onOverlayOpen
  };

})();
