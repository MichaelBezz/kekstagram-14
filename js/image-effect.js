'use strict';
// Наложение эффекта на изображение //
(function () {

  var imgUploadEffects = window.form.imgUpload.querySelector('.img-upload__effects');
  var imgUploadScale = window.form.imgUpload.querySelector('.img-upload__scale');
  var scalePin = imgUploadScale.querySelector('.scale__pin');
  var scaleLine = imgUploadScale.querySelector('.scale__line');
  var scaleValue = imgUploadScale.querySelector('.scale__value');
  var scaleLevel = imgUploadScale.querySelector('.scale__level');

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
  window.onImageEffectSet = function () {
    window.form.imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);
    startValuePin();
    for (var i = 0; i < FILTERS.length; i++) {
      addEffectListener(i);
    }
    changeDepthEffect();
  };
  // функция, которая отвечает за перемещение пина
  var changeDepthEffect = function () {

    scalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoordX = evt.clientX;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoordX - moveEvt.clientX;
        startCoordX = moveEvt.clientX;

        var MIN_SHIFT = window.scaleLineWidth - window.scaleLineWidth;
        var MAX_SHIFT = window.scaleLineWidth;

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
        currentScaleValueMouseup();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  };
  // функция, которая устанавливает глубину эффекта
  var currentScaleValueMouseup = function () {
    var valueOfEffect = getScaleValue() * (currentEffect.effect.max - currentEffect.effect.min) + currentEffect.effect.min + currentEffect.effect.unit;
    window.form.imgUploadPreview.style.filter = currentEffect.effect.name + '(' + valueOfEffect + ')';
  };
  // функция, которая выбирает фильтр и обновляет значение переменной текущего фильтра
  var addEffectListener = function (i) {
    var effectId = FILTER_SELECTOR_PREFIX + FILTERS[i].id;
    var effectElement = imgUploadEffects.querySelector('#' + effectId);
    effectElement.addEventListener('click', function () {
      currentEffect = FILTERS[i];
      resetEffectClick();
      if (FILTERS[i].id === 'none') {
        imgUploadScale.classList.add('hidden');
      }
    });
  };
  // функция, которая удаляет классы стилей у элементов и назначает их
  var resetEffectClick = function () {
    for (var i = 0; i < FILTERS.length; i++) {
      window.form.imgUploadPreview.classList.remove(FILTER_CLASS_PREFIX + FILTERS[i].id);
      window.form.imgUploadPreview.style.filter = null;
      if (FILTERS[i].id === 'none') {
        imgUploadScale.classList.remove('hidden');
      }
    }
    window.form.imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);
    startValuePin();
  };
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
    window.scaleLineWidth = endScaleLine - startScaleLine;

    var startScalePin = coordsScalePin.left;
    var endScalePin = coordsScalePin.right;
    var scalePinHalfWidth = (endScalePin - startScalePin) / 2;
    var pinPositionOnLine = (startScalePin + scalePinHalfWidth) - startScaleLine;

    var currentValueScale = pinPositionOnLine / window.scaleLineWidth;
    scaleValue.value = currentValueScale * 100;
    return currentValueScale;
  };

})();
