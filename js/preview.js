'use strict';
// модуль для отрисовки увеличенного изображения //
(function () {

  var START_EXAMPLE_IMGURL = 1;
  var END_EXAMPLE_IMGURL = 6;
  var MAX_COMMENT_COUNT = 5;

  var mainPhotocard = document.querySelector('.big-picture');
  var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');
  var commentShow = mainPhotocard.querySelector('.comments-show');
  var socialComments = mainPhotocard.querySelector('.social__comments');
  var socialLoadmore = mainPhotocard.querySelector('.social__loadmore');
  var openedPhoto = null;
  var numberSocialComments = 0;
  var commentsForRender = [];

  // функция, которая генерирует случайное значение в промежутке от minNumber до maxNumber
  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
    return randomNumber;
  };
  // функция, которая удаляет элементы из контейнера
  var removeElements = function (container, selector) {
    var element = Array.from(container.querySelectorAll(selector));
    element.forEach(function (item) {
      container.removeChild(item);
    });
  };

  // функция, которая отображает комментарии
  var createPhotocardComments = function (item) {
    openedPhoto = item;
    removeElements(socialComments, '.social__comment');

    if (openedPhoto.comments.length <= MAX_COMMENT_COUNT) {
      commentsForRender = openedPhoto.comments.slice();
      numberSocialComments = commentsForRender.length;
      commentShow.textContent = numberSocialComments;
      socialLoadmore.classList.add('hidden');
    } else {
      loadMoreComments();
      socialLoadmore.addEventListener('click', onLoadMoreClick);
    }

    renderComments(commentsForRender);
  };

  var loadMoreComments = function () {
    var allCommentsCount = openedPhoto.comments.length;
    var addingCommentsCount = allCommentsCount - numberSocialComments > MAX_COMMENT_COUNT ?
      MAX_COMMENT_COUNT : allCommentsCount - numberSocialComments;
    commentsForRender = openedPhoto.comments.slice(numberSocialComments, numberSocialComments + addingCommentsCount);
    numberSocialComments += MAX_COMMENT_COUNT;
    commentShow.textContent = numberSocialComments;
    socialLoadmore.classList.remove('hidden');
  };

  var onLoadMoreClick = function () {
    var hiddenComments = openedPhoto.comments.length - numberSocialComments;

    if (hiddenComments <= MAX_COMMENT_COUNT) {
      commentsForRender = openedPhoto.comments.slice(numberSocialComments);
      numberSocialComments = openedPhoto.comments.length;
      commentShow.textContent = numberSocialComments;
      socialLoadmore.classList.add('hidden');
    } else {
      loadMoreComments();
    }

    renderComments(commentsForRender);
  };

  // функция, которая создает сложную разметку для комментариев
  var renderComments = function (comments) {
    comments.forEach(function (item) {
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
      commentText.textContent = item;

      comment.appendChild(commentImg);
      comment.appendChild(commentText);
      socialComments.appendChild(comment);
    });
  };

  // функция, которая создает оверлэй
  var renderMainPhotocard = function (item) {

    mainPhotocard.querySelector('.big-picture__img img').src = item.url;
    mainPhotocard.querySelector('.likes-count').textContent = item.likes;
    mainPhotocard.querySelector('.comments-count').textContent = item.comments.length;
    createPhotocardComments(item);
    mainPhotocard.querySelector('.social__caption').textContent = item.description;

  };

  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onOverlayOpenClick = function () {
    mainPhotocard.classList.remove('hidden');

    bigPicturesCancel.addEventListener('click', onOverlayClose);
    document.addEventListener('keydown', onOverlayEscKeydown);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onOverlayClose = function () {
    mainPhotocard.classList.add('hidden');

    numberSocialComments = 0;
    commentShow.textContent = numberSocialComments;

    socialLoadmore.removeEventListener('click', onLoadMoreClick);
    bigPicturesCancel.removeEventListener('click', onOverlayClose);
    document.removeEventListener('keydown', onOverlayEscKeydown);
  };
  // функция, для обработки события закрытия по esc
  var onOverlayEscKeydown = function (evt) {
    if (evt.keyCode === window.form.ESC_KEYCODE) {
      onOverlayClose();
    }
  };

  window.preview = {
    renderMainPhotocard: renderMainPhotocard,
    removeElements: removeElements,
    onOverlayOpenClick: onOverlayOpenClick
  };

})();
