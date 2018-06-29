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
      window.preview.renderMainPhotocard(item); // из файла превью
      window.preview.mainPhotocard.classList.remove('hidden'); // из файла превью
    });

    photocardElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.form.ESC_KEYCODE) {
        window.preview.mainPhotocard.classList.add('hidden'); // из файла превью
      }
    });

    return photocardElement;
  };

  var fragment = document.createDocumentFragment();

  var createListElement = function () {
    for (var i = 0; i < window.data.PHOTOCARD_QUANTITY; i++) { // из файла дата
      fragment.appendChild(renderPhotocard(window.data.createPhotocards()[i])); // из файла дата
    }
    photocardListElement.appendChild(fragment);
  };

  createListElement();

})();
