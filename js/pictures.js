'use strict';
// модуль для отрисовки миниатюры //
(function () {

  var photocardListElement = document.querySelector('.pictures');
  var photocardTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');
  // функция, которая клонирует шаблон и заполняет его
  var renderPhotocard = function (item) {
    var photocardElement = photocardTemplate.cloneNode(true);

    photocardElement.querySelector('.picture__img').src = item.url;
    photocardElement.querySelector('.picture__stat--likes').textContent = item.likes;
    photocardElement.querySelector('.picture__stat--comments').textContent = item.comments.length;

    photocardElement.addEventListener('click', function () {
      window.preview.renderMainPhotocard(item);
      onOverlayOpen();
    });

    return photocardElement;
  };

  var fragment = document.createDocumentFragment();

  var createPhotoList = function () {
    var photocards = window.data.createPhotocards();
    for (var i = 0; i < photocards.length; i++) {
      fragment.appendChild(renderPhotocard(photocards[i]));
    }
    photocardListElement.appendChild(fragment);
  };

  createPhotoList();


  var bigPicturesCancel = window.preview.mainPhotocard.querySelector('.big-picture__cancel');
  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onOverlayOpen = function () {
    window.preview.mainPhotocard.classList.remove('hidden');
    document.addEventListener('keydown', onOverlayEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onOverlayClose = function () {
    window.preview.mainPhotocard.classList.add('hidden');
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

})();
