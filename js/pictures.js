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
      window.gallery.onOverlayOpen();
    });

    return photocardElement;
  };
  // функция, которая добавяляет фотографии на страницу
  var fragment = document.createDocumentFragment();

  var createPhotoList = function (photocards) {
    for (var i = 0; i < photocards.length; i++) {
      fragment.appendChild(renderPhotocard(photocards[i]));
    }
    photocardListElement.appendChild(fragment);
  };
  // загрузка данных с сервера
  var usersPhoto = [];
  var getUsersPhotoFromServer = function (photo) {
    usersPhoto = photo;
    createPhotoList(usersPhoto);
  };
  window.backend.download(getUsersPhotoFromServer, window.errorMessage);

})();
