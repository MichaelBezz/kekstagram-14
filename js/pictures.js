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
    window.preview.removeElements(photocardListElement, '.picture__link');
    for (var i = 0; i < photocards.length; i++) {
      fragment.appendChild(renderPhotocard(photocards[i]));
    }
    photocardListElement.appendChild(fragment);
  };
  // загрузка данных с сервера
  var userPhotos = [];
  var getUserPhotosFromServer = function (photo) {
    userPhotos = photo;
    createPhotoList(userPhotos);
    imgFiltersForm.classList.remove('img-filters--inactive');
  };
  window.backend.download(getUserPhotosFromServer, window.errorMessage.errorHandler);


  var imgFiltersForm = document.querySelector('.img-filters');
  var filterPopular = imgFiltersForm.querySelector('#filter-popular');
  var filterNew = imgFiltersForm.querySelector('#filter-new');
  var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');
  // функция, которая отвечает за фильтр популярные (фотографии в изначальном порядке)
  var onFilterPopularClick = function () {
    changeActivButton(filterPopular, filterNew, filterDiscussed);
    createPhotoList(userPhotos);
  };
  // обработчик события - фильтр популярные
  filterPopular.addEventListener('click', onFilterPopularClick);
  // функция, которая отвечает за фильтр новые (10 случайных, не повторяющихся фотографий)
  var onFilterNewClick = function () {
    changeActivButton(filterNew, filterPopular, filterDiscussed);

    var TOP_TEN = 10;
    var newArr = userPhotos.slice();
    newArr.sort(function () {
      return Math.random() - 0.5;
    });
    var newArrTopTen = newArr.slice(0, TOP_TEN);

    createPhotoList(newArrTopTen);
  };
  // обработчик события - фильтр новые
  filterNew.addEventListener('click', onFilterNewClick);
  // функция, которая отвечает за фильтр обсуждаемые (в порядке убывания количества комментариев)
  var onFilterDiscussedClick = function () {
    changeActivButton(filterDiscussed, filterPopular, filterNew);

    var discussedArr = userPhotos.slice();
    discussedArr.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
    createPhotoList(discussedArr);
  };
  // обработчик события - фильтр обсуждаемые
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);

  var changeActivButton = function (activeButton, disableButtonOne, disableButtonTwo) {
    activeButton.classList.add('img-filters__button--active');
    disableButtonOne.classList.remove('img-filters__button--active');
    disableButtonTwo.classList.remove('img-filters__button--active');
  };

})();
