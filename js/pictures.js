'use strict';
// #13 Личный проект: пока все дома
var EXAMPLE_URL = [];
var START_EXAMPLE_URL = 1;
var END_EXAMPLE_URL = 25;

var START_EXAMPLE_IMGURL = 1;
var END_EXAMPLE_IMGURL = 6;

var START_EXAMPLE_LIKES = 15;
var END_EXAMPLE_LIKES = 200;

var EXAMPLE_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var EXAMPLE_DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var PHOTOCARD_QUANTITY = 25;
var COMMENTS_QUANTITY = 2;
// функция, которая создает массив от startNumber до endNumber
var getArrayElements = function (arr, startNumber, endNumber) {
  for (var i = startNumber; i <= endNumber; i++) {
    arr.push(i);
  }
  return arr;
};
// функция, которая выбирает случайный элемент в массиве
var getRandomArrayElement = function (arr) {
  var randomNumber = Math.floor(Math.random() * (arr.length - 1));
  return arr[randomNumber];
};
// функция, которая выбирает случайное значение в промежутке от minNumber до maxNumber
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
// создаем массив с url фотографий
EXAMPLE_URL = getArrayElements(EXAMPLE_URL, START_EXAMPLE_URL, END_EXAMPLE_URL);
// функция, которая создает массив с комментариями
var createComments = function () {
  var arrComments = [];
  for (var i = 0; i < COMMENTS_QUANTITY; i++) {
    arrComments.push(getRandomArrayElement(EXAMPLE_COMMENTS));
  }
  return arrComments;
};
// функция, которая создает массив с фотографиями
var createPhotocards = function () {
  var photocards = [];
  for (var i = 0; i < PHOTOCARD_QUANTITY; i++) {
    var newPhotocard = {};
    var urlCard = 'photos/' + EXAMPLE_URL[i] + '.jpg';
    newPhotocard.url = urlCard;
    newPhotocard.likes = getRandomNumber(START_EXAMPLE_LIKES, END_EXAMPLE_LIKES);
    newPhotocard.comments = createComments();
    newPhotocard.description = getRandomArrayElement(EXAMPLE_DESCRIPTION);
    photocards.push(newPhotocard);
  }
  return photocards;
};

var newPhotocardAll = createPhotocards();

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

  return photocardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < PHOTOCARD_QUANTITY; i++) {
  fragment.appendChild(renderPhotocard(newPhotocardAll[i]));
}
photocardListElement.appendChild(fragment);
/*
// открываем показ фотографии в полноэкранном режиме
var mainPhotocard = document.querySelector('.big-picture');
mainPhotocard.classList.remove('hidden');
// функция, которая создает сложную разметку для комментариев
var createPhotocardComments = function (container) {
  var conteinerComment = document.querySelector('.social__comments');
  removeElements(conteinerComment, '.social__comment');

  for (var j = 0; j < newPhotocardAll[0].comments.length; j++) {
    var imgSrc = 'img/avatar-' + getRandomNumber(START_EXAMPLE_IMGURL, END_EXAMPLE_IMGURL) + '.svg';

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
    commentText.textContent = newPhotocardAll[0].comments[j];

    comment.appendChild(commentImg);
    comment.appendChild(commentText);
    container.appendChild(comment);
  }
};
// функция, которая создает большую фотографию не из шаблона
var renderMainPhotocard = function () {
  var mainPhotocardItem = newPhotocardAll[0];

  mainPhotocard.querySelector('.big-picture__img img').src = mainPhotocardItem.url;
  mainPhotocard.querySelector('.likes-count').textContent = mainPhotocardItem.likes;
  mainPhotocard.querySelector('.comments-count').textContent = mainPhotocardItem.comments.length;
  createPhotocardComments(mainPhotocard.querySelector('.social__comments'));
  mainPhotocard.querySelector('.social__caption').textContent = mainPhotocardItem.description;

};

renderMainPhotocard();
// прячем блок счетчика комментариев
var commentCounter = document.querySelector('.social__comment-count');
commentCounter.classList.add('visually-hidden');
// прячем загрузку новых комментариев
var downloadComments = document.querySelector('.social__loadmore');
downloadComments.classList.add('visually-hidden'); */

// #15 Личный проект: подробности
// Загрузка изображения и показ формы редактирования
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('.img-upload__input');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// функция, для обработки события закрытия по esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPopupClose();
  }
};
// функция, для обработки события открытия + добавление обработки по клавиши esc
var onPopupOpen = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
// функция, для обработки события закрытия + удаление обработки по клавиши esc
var onPopupClose = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};
// обработчик события - открываем форму редактирования изображения
uploadFile.addEventListener('change', function () {
  onPopupOpen();
});
// обработчик события - закрываем форму редактирования изображения по клику
imgUploadCancel.addEventListener('click', function () {
  onPopupClose();
});
// обработчик события - закрываем форму редактирования изображения по нажатию на enter
imgUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPopupClose();
  }
});
/*
// Редактирование размера изображения
var resizeControlMinus = imgUpload.querySelector('.resize__control--minus');
var resizeControlPlus = imgUpload.querySelector('.resize__control--plus');
var resizeControlValue = imgUpload.querySelector('.resize__control--value');

var maxSizeValue = 100;
var minSizeValue = 25;
var resizeStep = 25;

var resizeControl = function () {
  if (onResizeControlMinusClick) {
  for (var i = maxSizeValue; i > minSizeValue; i -= resizeStep) {

   }
  } else if (onResizeControlPlusClick) {

  }
};

// обработчик события - изменение размера фотографии минус
var onResizeControlMinusClick = resizeControlMinus.addEventListener('click', function () {
});
// обработчик события - изменение размера фотографии плюс
var onResizeControlPlusClick = resizeControlPlus.addEventListener('click', function () {
});
*/
