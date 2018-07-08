'use strict';
// модуль валидации формы //
(function () {

  var MAX_SIMBOL_HASHTAG = 20;
  var MAX_QUATINTY_HASHTAGS = 5;
  var MAX_SIMBOL_TEXT_DESCRIPTION = 140;

  var imgUploadText = document.querySelector('.img-upload__text');
  var textHashtags = imgUploadText.querySelector('.text__hashtags');
  var textDescription = imgUploadText.querySelector('.text__description');

  // функция, которая отвечает за валидацию формы
  var onFormHashtagsValidityBlur = function () {
    var hashtagsValue = textHashtags.value;
    hashtagsValue = hashtagsValue.toLowerCase();
    var arrHashtags = hashtagsValue.split(' ');

    if (hashtagsValue === '') {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('messege-error-border');
      return;
    }

    if (arrHashtags.length > MAX_QUATINTY_HASHTAGS) {
      textHashtags.setCustomValidity('Максимальное количество хэш-тегов 5');
      textHashtags.classList.add('messege-error-border');
      return;
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('messege-error-border');
    }

    arrHashtags.forEach(function (item) {
      if (item === '#') {
        textHashtags.setCustomValidity('Хэш-тег не может содержать только #');
        textHashtags.classList.add('messege-error-border');
      } else if (item[0] !== '#') {
        textHashtags.setCustomValidity('Хэш-тег должен начинаться с #');
        textHashtags.classList.add('messege-error-border');
      } else if (item.length > MAX_SIMBOL_HASHTAG) {
        textHashtags.setCustomValidity('Длина одного хэш-тега не может превышать 20 символов');
        textHashtags.classList.add('messege-error-border');
      } else {
        textHashtags.setCustomValidity('');
        textHashtags.classList.remove('messege-error-border');
      }
    });

    var newArrHashtags = [];
    arrHashtags.forEach(function (item, i) {
      if (arrHashtags.indexOf(item) === i) {
        newArrHashtags.push(item);
      }
    });
    textHashtags.value = newArrHashtags.join(' ');

  };

  // валидация отправки сообщений
  var onFormTextDescriptionValidityBlur = function (evtText) {
    var target = evtText.target;
    if (target.value.length > MAX_SIMBOL_TEXT_DESCRIPTION) {
      textDescription.classList.add('messege-error-border');
      textDescription.setCustomValidity('Длина комментария не может превышать 140 символов');
    } else {
      textDescription.classList.remove('messege-error-border');
      textDescription.setCustomValidity('');
    }
  };
  // обработчик события - отмена закрытия формы, если фокус на поле хэш-тегов
  textHashtags.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  // обработчик события - отмена закрытия формы, если фокус на поле комментариев
  textDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  var validationListenersAdd = function () {
    // обработчик события - запускает валидацию формы хэш-тегов
    textHashtags.addEventListener('blur', onFormHashtagsValidityBlur);
    // обработчик события - запускает валидацию формы сообщений
    textDescription.addEventListener('blur', onFormTextDescriptionValidityBlur);
  };

  var validationListenersRemove = function () {
    textHashtags.removeEventListener('blur', onFormHashtagsValidityBlur);
    textDescription.removeEventListener('blur', onFormTextDescriptionValidityBlur);
    textHashtags.value = '';
    textDescription.value = '';
  };

  window.validation = {
    validationListenersAdd: validationListenersAdd,
    validationListenersRemove: validationListenersRemove
  };

})();
