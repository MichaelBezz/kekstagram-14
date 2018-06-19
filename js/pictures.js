'use strict';

var EXAMPLE_URL = [];
var goNumberExampleUrl = 1;
var endNumberExampleUrl = 25;

var EXAMPLE_LIKES = [];
var goNumberExampleLikes = 15;
var endNumberExampleLikes = 200;


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

var quantityPhotoCard = 25;

var getArrayElements = function (arr, goNumber, endNumber) {
  goNumber -= 1;
  for (var i = goNumber; i < endNumber; i++) {
    goNumber += 1;
    arr.push(goNumber);
  }
  return arr;
};

var getRandomArrayElement = function (arr) {
  var randomNumber = Math.floor(Math.random() * (arr.length - 1));
  return arr[randomNumber];
};

EXAMPLE_URL = getArrayElements(EXAMPLE_URL, goNumberExampleUrl, endNumberExampleUrl);
EXAMPLE_LIKES = getArrayElements(EXAMPLE_LIKES, goNumberExampleLikes, endNumberExampleLikes);

var createPhotocards = function () {
  var Photocards = [];
  for (var i = 0; i < quantityPhotoCard; i++) {
    var urlCard = 'photos/' + EXAMPLE_URL[i] + '.jpg';
    var newPhotocard = {};
    newPhotocard.url = urlCard;
    newPhotocard.likes = getRandomArrayElement(EXAMPLE_LIKES);
    newPhotocard.comments = getRandomArrayElement(EXAMPLE_COMMENTS);
    newPhotocard.description = getRandomArrayElement(EXAMPLE_DESCRIPTION);
    Photocards.push(newPhotocard);
  }
  return Photocards;
};

var newPhotocardAll = createPhotocards();

var photocardListElement = document.querySelector('.pictures');
var photocardTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

var renderPhotocard = function () {
  var photocardElement = photocardTemplate.cloneNode(true);

  photocardElement.querySelector('src').src = newPhotocardAll[i].url;
  photocardElement.querySelector('.picture__stat--likes').textContent = newPhotocardAll[i].likes;
  photocardElement.querySelector('.picture__stat--comments').textContent = newPhotocardAll[i].comments;

  return photocardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < quantityPhotoCard; i++) {
  fragment.appendChild(renderPhotocard(newPhotocardAll[i]));
}
photocardListElement.appendChild(fragment);

var mainPhotocard = document.querySelector('.big-picture');
mainPhotocard.classList.remove('.hidden');

/*
var renderMainPhotocard = function () {
  var photocardMainElement = photocardTemplate.cloneNode(true);

  photocardMainElement.querySelector('.big-picture__img').src = newPhotocardAll[0].url;
  photocardMainElement.querySelector('.likes-count').textContent = newPhotocardAll[0].likes;
  \\ photocardMainElement.querySelector('.comments-count').textContent = newPhotocardAll[0].comments;
  \\ photocardMainElement.querySelector('.comments-count').textContent = newPhotocardAll[0].comments;
  photocardMainElement.querySelector('.social__caption').textContent = newPhotocardAll[0].description;

  return photocardMainElement;
};

renderMainPhotocard(mainPhotocard);

var commentCounter = document.querySelector('.social__comment-count');
commentCounter.classList.add('.visually-hidden');

var downloadComments = document.querySelector('.social__loadmore');
downloadComments.classList.add('.visually-hidden');
*/
