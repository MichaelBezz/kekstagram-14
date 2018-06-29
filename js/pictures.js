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

  photocardElement.addEventListener('click', function () {
    renderMainPhotocard(item);
    mainPhotocard.classList.remove('hidden');
  });

  photocardElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onPopupClose();
    }
  });

  return photocardElement;
};

var fragment = document.createDocumentFragment();

var createListElement = function () {
  for (var i = 0; i < PHOTOCARD_QUANTITY; i++) {
    fragment.appendChild(renderPhotocard(newPhotocardAll[i]));
  }
  photocardListElement.appendChild(fragment);
};

createListElement();

// открываем показ фотографии в полноэкранном режиме
var mainPhotocard = document.querySelector('.big-picture');

// функция, которая создает сложную разметку для комментариев
var createPhotocardComments = function (container, item) {
  var conteinerComment = document.querySelector('.social__comments');
  removeElements(conteinerComment, '.social__comment');

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

    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = item.comments[i];

    comment.appendChild(commentImg);
    comment.appendChild(commentText);
    container.appendChild(comment);
  }
};
// функция, которая создает большую фотографию не из шаблона
var renderMainPhotocard = function (item) {

  mainPhotocard.querySelector('.big-picture__img img').src = item.url;
  mainPhotocard.querySelector('.likes-count').textContent = item.likes;
  mainPhotocard.querySelector('.comments-count').textContent = item.comments.length;
  createPhotocardComments(mainPhotocard.querySelector('.social__comments'), item);
  mainPhotocard.querySelector('.social__caption').textContent = item.description;

};

// // прячем блок счетчика комментариев
// var commentCounter = document.querySelector('.social__comment-count');
// commentCounter.classList.add('visually-hidden');
// // прячем загрузку новых комментариев
// var downloadComments = document.querySelector('.social__loadmore');
// downloadComments.classList.add('visually-hidden');


// #15 Личный проект: подробности

var imgUpload = document.querySelector('.img-upload');

// 2.1. Масштаб: редактирование размера изображения //
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
var resizeControlMinus = imgUpload.querySelector('.resize__control--minus');
var resizeControlPlus = imgUpload.querySelector('.resize__control--plus');
var resizeControlValue = imgUpload.querySelector('.resize__control--value');

var MAX_SIZE_VALUE = 100;
var MIN_SIZE_VALUE = 25;
var RESIZE_STEP = 25;
var PERCENT = '%';

// функция, которая изменяет масштаб изображения
var onValueChange = function () {
  resizeControlValue.value = MAX_SIZE_VALUE + PERCENT;
  var currentValue = MAX_SIZE_VALUE;
  resizeControlPlus.disabled = true;

  resizeControlPlus.addEventListener('click', function () {
    currentValue += RESIZE_STEP;
    resizeControlValue.value = currentValue + PERCENT;
    imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
    if (currentValue === MAX_SIZE_VALUE) {
      resizeControlPlus.disabled = true;
    } else if (currentValue > MIN_SIZE_VALUE) {
      resizeControlMinus.disabled = false;
    }
  });

  resizeControlMinus.addEventListener('click', function () {
    currentValue -= RESIZE_STEP;
    resizeControlValue.value = currentValue + PERCENT;
    imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
    if (currentValue === MIN_SIZE_VALUE) {
      resizeControlMinus.disabled = true;
    } else if (currentValue < MAX_SIZE_VALUE) {
      resizeControlPlus.disabled = false;
    }
  });
};

// 2.2. Наложение эффекта на изображение //
var imgUploadEffects = imgUpload.querySelector('.img-upload__effects');

var FILTER_SELECTOR_PREFIX = 'effect-';
var FILTER_CLASS_PREFIX = 'effects__preview--';
// массив, с объектами для работы с фильтрами
var FILTERS = [
  {
    id: 'none',
    effect: {
      name: '',
      min: '',
      max: '',
      unit: ''
    }
  },
  {
    id: 'chrome',
    effect: {
      name: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    }
  },
  {
    id: 'sepia',
    effect: {
      name: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    }
  },
  {
    id: 'marvin',
    effect: {
      name: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    }
  },
  {
    id: 'phobos',
    effect: {
      name: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    }
  },
  {
    id: 'heat',
    effect: {
      name: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    }
  }
];
// задаем фильтр по умолчанию
var currentEffect = FILTERS[5];
// функция, которая: задает фильтр по умолчанию, перебирает массив и вешает обработчик на пин
var onEffectsSet = function () {
  imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);

  startValuePin();

  for (var i = 0; i < FILTERS.length; i++) {
    addEffectListener(i);
  }

  changeDepthEffect();
};

var changeDepthEffect = function () {

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var MIN_SHIFT = 0;
      var MAX_SHIFT = 453;

      var shift = startCoordX - moveEvt.clientX;

      startCoordX = moveEvt.clientX;

      var currentCoord = scalePin.offsetLeft - shift;
      if (currentCoord <= MAX_SHIFT && currentCoord >= MIN_SHIFT) {
        scalePin.style.left = currentCoord + 'px';
        scaleLevel.style.width = currentCoord + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      onCurrentScaleValueMouseup();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

};

// функция, которая задает значение пина
var onCurrentScaleValueMouseup = function () {
  var valueOfEffect = getScaleValue() * (currentEffect.effect.max - currentEffect.effect.min) + currentEffect.effect.min + currentEffect.effect.unit;
  imgUploadPreview.style.filter = currentEffect.effect.name + '(' + valueOfEffect + ')';
};
// функция, которая выбирает фильтр и обновляет значение переменной текущего фильтра
var addEffectListener = function (i) {
  var effectId = FILTER_SELECTOR_PREFIX + FILTERS[i].id;
  var effectElement = imgUploadEffects.querySelector('#' + effectId);
  effectElement.addEventListener('click', function () {
    currentEffect = FILTERS[i];
    onResetEffectClick();
    if (FILTERS[i].id === 'none') {
      imgUploadScale.classList.add('hidden');
    }
  });
};
// функция, которая удаляет классы стилей у элементов и назначает их
var onResetEffectClick = function () {
  for (var i = 0; i < FILTERS.length; i++) {
    imgUploadPreview.classList.remove(FILTER_CLASS_PREFIX + FILTERS[i].id);
    imgUploadPreview.style.filter = null;
    if (FILTERS[i].id === 'none') {
      imgUploadScale.classList.remove('hidden');
    }
  }
  imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);
  startValuePin();
};

var imgUploadScale = imgUpload.querySelector('.img-upload__scale');
var scalePin = imgUploadScale.querySelector('.scale__pin');
var scaleLine = imgUploadScale.querySelector('.scale__line');
var scaleValue = imgUploadScale.querySelector('.scale__value');
var scaleLevel = imgUploadScale.querySelector('.scale__level');
// функция, которая сбрасывает значение пина
var startValuePin = function () {
  scaleLevel.style.width = '100%';
  scalePin.style.left = '100%';
};
// функция, которая задает текущее значение пина
var getScaleValue = function () {
  var coordsScaleLine = scaleLine.getBoundingClientRect();
  var coordsScalePin = scalePin.getBoundingClientRect();

  var startScaleLine = coordsScaleLine.left;
  var endScaleLine = coordsScaleLine.right;
  var scaleLineWidth = endScaleLine - startScaleLine;

  var startScalePin = coordsScalePin.left;
  var endScalePin = coordsScalePin.right;
  var scalePinHalfWidth = (endScalePin - startScalePin) / 2;
  var pinPositionOnLine = (startScalePin + scalePinHalfWidth) - startScaleLine;

  var currentValueScale = pinPositionOnLine / scaleLineWidth;
  scaleValue.value = currentValueScale;
  return currentValueScale;
};

// 1.3, 1.4 Загрузка изображения и показ формы редактирования //

var uploadFile = imgUpload.querySelector('.img-upload__input');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
var bigPicturesCancel = mainPhotocard.querySelector('.big-picture__cancel');

var ESC_KEYCODE = 27;

// функция, для обработки события закрытия по esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onPopupClose();
  }
};
// функция, для обработки события открытия + добавление обработки по клавиши esc
var onPopupOpen = function () {
  imgUploadOverlay.classList.remove('hidden');
  onValueChange();
  onEffectsSet();
  document.addEventListener('keydown', onPopupEscPress);
};
// функция, для обработки события закрытия + удаление обработки по клавиши esc
var onPopupClose = function () {
  mainPhotocard.classList.add('hidden');
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
// обработчик события - закрываем форму оверлея по клику
bigPicturesCancel.addEventListener('click', function () {
  onPopupClose();
});

// #16 Личный проект: доверяй, но проверяй //

var imgUploadText = document.querySelector('.img-upload__text');
var textHashtags = imgUploadText.querySelector('.text__hashtags');
var textDescription = imgUploadText.querySelector('.text__description');

var MAX_SIMBOL_HASHTAG = 20;
var MAX_QUATINTY_HASHTAGS = 5;
var MAX_SIMBOL_TEXT_DESCRIPTION = 140;

var onFormHashtagsValidity = function () {
  var hashtagsValue = textHashtags.value;
  hashtagsValue = hashtagsValue.toLowerCase();
  var arrHashtags = hashtagsValue.split(' ');

  if (arrHashtags.length > MAX_QUATINTY_HASHTAGS) {
    textHashtags.setCustomValidity('Максимальное количество хэш-тегов 5');
    return;
  } else {
    textHashtags.setCustomValidity('');
  }

  for (var i = 0; i < arrHashtags.length; i++) {
    if (arrHashtags[i] === '#') {
      textHashtags.setCustomValidity('Хэш-тег не может содержать только #');
    } else if (arrHashtags[i][0] !== '#') {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться с #');
    } else if (arrHashtags[i].length > MAX_SIMBOL_HASHTAG) {
      textHashtags.setCustomValidity('Длина одного хэш-тега не может превышать 20 символов');
    } else {
      textHashtags.setCustomValidity('');
    }
  }

  // var newArrHashtags = [];
  // for (var j = 0; j < arrHashtags.length; j++) {
  //   if (arrHashtags.indexOf(arrHashtags[j]) === j) {
  //     newArrHashtags.push(arrHashtags[j]);
  //   }
  // }
  // hashtagsValue = newArrHashtags;

};

textHashtags.addEventListener('blur', function () {
  onFormHashtagsValidity();
});

var onFormTextDescriptionValidity = function (evtText) {
  var target = evtText.target;
  if (target.value.length > MAX_SIMBOL_TEXT_DESCRIPTION) {
    textDescription.setCustomValidity('Длина комментария не может превышать 140 символов');
  } else {
    textDescription.setCustomValidity('');
  }
};

textDescription.addEventListener('change', function (evt) {
  onFormTextDescriptionValidity(evt);
});

textHashtags.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});
