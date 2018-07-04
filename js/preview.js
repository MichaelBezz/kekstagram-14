'use strict';
// модуль для отрисовки увеличенного изображения //
(function () {

  var socialComments = window.gallery.mainPhotocard.querySelector('.social__comments');

  var START_EXAMPLE_IMGURL = 1;
  var END_EXAMPLE_IMGURL = 6;
  // функция, которая генерирует случайное значение в промежутке от minNumber до maxNumber
  var getRandomNumber = function (minNumber, maxNumber) {
    var numberArr = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
    return numberArr;
  };
  // функция, которая удаляет элементы из контейнера
  var removeElements = function (contain, selector) {
    var element = contain.querySelectorAll(selector);
    for (var i = 0; i < element.length; i++) {
      contain.removeChild(element[i]);
    }
  };

  // функция, которая создает сложную разметку для комментариев
  var createPhotocardComments = function (container, item) {

    removeElements(socialComments, '.social__comment');

    for (var i = 0; i < item.comments.length; i++) {
      var imgSrc = 'img/avatar-' + getRandomNumber(START_EXAMPLE_IMGURL, END_EXAMPLE_IMGURL) + '.svg';

      var comment = document.createElement('li');
      comment.classList.add('social__comment', 'social__comment--text');

      var commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = imgSrc;
      commentImg.alt = 'Аватар комментатора фотографии';
      commentImg.width = '35';
      commentImg.height = '35';

      var commentText = document.createElement('li');
      commentText.classList.add('social__text');
      commentText.textContent = item.comments[i];

      comment.appendChild(commentImg);
      comment.appendChild(commentText);
      container.appendChild(comment);
    }

  };
  // функция, которая создает оверлэй
  var renderMainPhotocard = function (item) {

    window.gallery.mainPhotocard.querySelector('.big-picture__img img').src = item.url;
    window.gallery.mainPhotocard.querySelector('.likes-count').textContent = item.likes;
    window.gallery.mainPhotocard.querySelector('.comments-count').textContent = item.comments.length;
    createPhotocardComments(socialComments, item);
    window.gallery.mainPhotocard.querySelector('.social__caption').textContent = item.description;

  };

  window.preview = {
    renderMainPhotocard: renderMainPhotocard,
    removeElements: removeElements
  };

})();
