'use strict';
// модуль для отрисовки миниатюры //
(function () {

  var mainPhotocard = document.querySelector('.big-picture');
  var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');
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


  var commentShow = mainPhotocard.querySelector('.comments-show');
  // var socialLoadmore = mainPhotocard.querySelector('.social__loadmore');
  // var MAX_SOCIAL_COMMENTS = 5;
  // функция, которая определяет сколько всего комментариев показанно в данный момент
  var socialCommentsCounter = function () {
    var socialComment = mainPhotocard.querySelectorAll('.social__comment');
    var valueCommentsCounter = 0;
    for (var i = 0; i < socialComment.length; i++) {
      valueCommentsCounter += 1;
    }
    commentShow.textContent = valueCommentsCounter;
  };
  /*
  // функция, которая скрывает загрузку дополнительных комментариев
  var hiddenSocialCommentsLoadmore = function () {
    var socialComment = mainPhotocard.querySelectorAll('.social__comment');
    if (socialComment.length <= MAX_SOCIAL_COMMENTS) {
      socialLoadmore.classList.add('hidden');
    }
  };
  // функция, которая скрывает лишние комментарии
  var hiddenSocialComments = function () {
    var socialComment = mainPhotocard.querySelectorAll('.social__comment');
    if (socialComment.length > MAX_SOCIAL_COMMENTS) {
      for (var i = MAX_SOCIAL_COMMENTS; i < socialComment.length; i++) {
        socialComment[i].style.display = 'none';
      }
    }
    socialCommentsCounter();
  };
  // функция, которая показывает скрытые комментарии
  var addSocialCommentsLoadmore = function () {
    var socialComment = mainPhotocard.querySelectorAll('.social__comment');
    var hiddenComments = [];
    for (var i = 0; i < socialComment.length; i++) {
      if (socialComment[i].style.display === 'none') {
        hiddenComments.push(socialComment[i]);
      }
    }
    return hiddenComments;
  };
  console.log(addSocialCommentsLoadmore());
  // обработчик события - отображает дополнительные комментарии
  socialLoadmore.addEventListener('click', addSocialCommentsLoadmore);
  */

  window.gallery = {
    mainPhotocard: mainPhotocard,
    onOverlayOpen: onOverlayOpen
  };


})();
