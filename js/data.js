'use strict';
// модуль, который создаёт данные //
(function () {

  var EXAMPLE_URL = [];
  var START_EXAMPLE_URL = 1;
  var END_EXAMPLE_URL = 25;

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
  // функция, которая генерирует случайное значение в промежутке от minNumber до maxNumber
  var getRandomNumber = function (minNumber, maxNumber) {
    var numberArr = Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
    return numberArr;
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

  window.data = {
    PHOTOCARD_QUANTITY: 25,
    getRandomNumber: getRandomNumber,
    createPhotocards: createPhotocards
  };

})();
