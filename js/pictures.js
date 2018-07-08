'use strict';
// модуль для отрисовки миниатюры //
(function () {

  var RANDOM_PHOTOS_COUNT = 10;

  var Filter = {
    POPULAR: 'popular',
    NEW: 'new',
    DISCUSS: 'discuss'
  };
  var imgFiltersForm = document.querySelector('.img-filters');
  var filterPopular = imgFiltersForm.querySelector('#filter-popular');
  var filterNew = imgFiltersForm.querySelector('#filter-new');
  var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');
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
      window.preview.onOverlayOpenClick();
    });

    return photocardElement;
  };
  // функция, которая добавяляет фотографии на страницу
  var fragment = document.createDocumentFragment();
  var createPhotoList = function (photocards) {
    window.preview.removeElements(photocardListElement, '.picture__link');
    photocards.forEach(function (item) {
      fragment.appendChild(renderPhotocard(item));
    });
    photocardListElement.appendChild(fragment);
  };
  // загрузка данных с сервера
  var userPhotos = [];

  var getUserPhotosFromServer = function (photo) {
    userPhotos = photo;
    createPhotoList(userPhotos);
    loadFilters();
  };
  window.backend.download(getUserPhotosFromServer, window.errorMessage.uploadDataMessageError);

  var loadFilters = window.debounce(function () {
    imgFiltersForm.classList.remove('img-filters--inactive');
  });

  // функция, которая обновляет фото в зависимости от фильтра
  var updatePhotos = window.debounce(function (button, photos) {
    changeActiveButton(button);
    createPhotoList(photos);
  });
  // функция, которая отвечает за логику фильтров
  var onFilterChange = function (filterType) {
    var photos;
    var button;

    if (filterType === Filter.POPULAR) {
      photos = userPhotos;
      button = filterPopular;
    } else if (filterType === Filter.NEW) {
      var newArr = userPhotos.slice();
      newArr.sort(function () {
        return Math.random() - 0.5;
      });
      photos = newArr.slice(0, RANDOM_PHOTOS_COUNT);
      button = filterNew;
    } else {
      photos = userPhotos.slice();
      photos.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
      button = filterDiscussed;
    }

    updatePhotos(button, photos);
  };
  // обработчик события - фильтр популярные
  filterPopular.addEventListener('click', function () {
    onFilterChange(Filter.POPULAR);
  });
  // обработчик события - фильтр новые
  filterNew.addEventListener('click', function () {
    onFilterChange(Filter.NEW);
  });
  // обработчик события - фильтр обсуждаемые
  filterDiscussed.addEventListener('click', function () {
    onFilterChange(Filter.DISCUSS);
  });
  // функция, которая изменяет активную кнопку
  var changeActiveButton = function (activeButton) {
    var currentActiveButton = imgFiltersForm.querySelector('.img-filters__button--active');
    if (currentActiveButton === activeButton) {
      return;
    }
    currentActiveButton.classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
  };

})();
