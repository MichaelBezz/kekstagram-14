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
  var getUserPhotosFromServer = function (photo) {
    var userPhotos = [];
    userPhotos = photo;
    saveUserPhotos(userPhotos);
    createPhotoList(userPhotos);
    imgFiltersForm.classList.remove('img-filters--inactive');
  };
  window.backend.download(getUserPhotosFromServer, window.errorMessage.errorHandler);


  var imgFiltersForm = document.querySelector('.img-filters');
  var filterPopular = imgFiltersForm.querySelector('#filter-popular');
  var filterNew = imgFiltersForm.querySelector('#filter-new');
  var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');

  var saveUserPhotos = function (data) {
    var saveArrPhoto = data.slice();
    return saveArrPhoto;
  };
  // функция, которая отвечает за фильтр популярные (фотографии в изначальном порядке)
  var onFilterPopularClick = function () {
    window.preview.removeElements(photocardListElement, '.picture__link');
  };
  // обработчик события - фильтр популярные
  filterPopular.addEventListener('click', onFilterPopularClick);
  // функция, которая отвечает за фильтр новые (10 случайных, не повторяющихся фотографий)
  var onFilterNewClick = function () {
    window.preview.removeElements(photocardListElement, '.picture__link');
    var TOP_TEN = 10;
    var data = saveUserPhotos();
  };
  console.log(onFilterNewClick());
  // обработчик события - фильтр новые
  filterNew.addEventListener('click', onFilterNewClick);
  // функция, которая отвечает за фильтр обсуждаемые (в порядке убывания количества комментариев)
  var onFilterDiscussedClick = function () {
    window.preview.removeElements(photocardListElement, '.picture__link');
  };
  // обработчик события - фильтр обсуждаемые
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

})();
