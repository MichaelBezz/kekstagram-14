'use strict';
// модуль для отрисовки увеличенного изображения //
(function () {

  // открываем показ фотографии в полноэкранном режиме
  var mainPhotocard = document.querySelector('.big-picture');

  // функция, которая удаляет элементы из контейнера
  var removeElements = function (contain, selector) {
    var element = contain.querySelectorAll(selector);
    for (var i = 0; i < element.length; i++) {
      contain.removeChild(element[i]);
    }
  };

  var START_EXAMPLE_IMGURL = 1;
  var END_EXAMPLE_IMGURL = 6;

  // функция, которая создает сложную разметку для комментариев
  var createPhotocardComments = function (container, item) {
    var conteinerComment = document.querySelector('.social__comments');
    removeElements(conteinerComment, '.social__comment');

    for (var i = 0; i < item.comments.length; i++) {
      var imgSrc = 'img/avatar-' + window.data.getRandomNumber(START_EXAMPLE_IMGURL, END_EXAMPLE_IMGURL) + '.svg';

      var comment = document.createElement('li');
      comment.classList.add('social__comment', 'social__comment--text');

      var commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = imgSrc;
      commentImg.alt = 'Аватар комментатора фотографии';
      commentImg.width = '35';
      commentImg.height = '35';

      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = item.comments[i];

      comment.appendChild(commentImg);
      comment.appendChild(commentText);
      container.appendChild(comment);
    }
  };
  // функция, которая создает оверлэй
  var renderMainPhotocard = function (item) {

    mainPhotocard.querySelector('.big-picture__img img').src = item.url;
    mainPhotocard.querySelector('.likes-count').textContent = item.likes;
    mainPhotocard.querySelector('.comments-count').textContent = item.comments.length;
    createPhotocardComments(mainPhotocard.querySelector('.social__comments'), item);
    mainPhotocard.querySelector('.social__caption').textContent = item.description;

  };

  window.preview = {
    renderMainPhotocard: renderMainPhotocard,
    mainPhotocard: mainPhotocard
  };

  // прячем блок счетчика комментариев
  // var commentCounter = document.querySelector('.social__comment-count');
  // commentCounter.classList.add('visually-hidden');
  // прячем загрузку новых комментариев
  // var downloadComments = document.querySelector('.social__loadmore');
  // downloadComments.classList.add('visually-hidden');

})();
