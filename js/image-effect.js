'use strict';
// наложение эффекта на изображение //
(function () {

  var FILTER_SELECTOR_PREFIX = 'effect-';
  var FILTER_CLASS_PREFIX = 'effects__preview--';
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
  var FILTER_HEAT = 5;
  var INPUT_FILTER_HEAT = window.form.imgUpload.querySelector('#effect-heat');

  var imgUploadEffects = window.form.imgUpload.querySelector('.img-upload__effects');
  var imgUploadScale = window.form.imgUpload.querySelector('.img-upload__scale');
  var scalePin = imgUploadScale.querySelector('.scale__pin');
  var scaleLine = imgUploadScale.querySelector('.scale__line');
  var scaleValue = imgUploadScale.querySelector('.scale__value');
  var scaleLevel = imgUploadScale.querySelector('.scale__level');
  var currentEffect;

  // функция, которая задает фильтр и значение пина по умолчанию, перебирает массив
  var imageEffectAdd = function () {
    currentEffect = FILTERS[FILTER_HEAT];
    INPUT_FILTER_HEAT.checked = true;
    window.form.imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);
    startValuePin();
    FILTERS.forEach(function (item) {
      addEffectListener(item);
    });
    scalePin.addEventListener('mousedown', changeDepthEffectMousedown);
  };
  // функция, которая отвечает за перемещение пина
  var changeDepthEffectMousedown = function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var MIN_SHIFT = 0;
      var MAX_SHIFT = window.scaleLineWidth;

      var currentCoord = scalePin.offsetLeft - shift;
      if (currentCoord <= MAX_SHIFT && currentCoord > MIN_SHIFT) {
        scalePin.style.left = currentCoord + 'px';
        scaleLevel.style.width = currentCoord + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setCurrentScaleValueMouseup();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // функция, которая устанавливает глубину эффекта
  var setCurrentScaleValueMouseup = function () {
    var differenceEffectValue = currentEffect.effect.max - currentEffect.effect.min;
    var valueOfEffect = getScaleValue() * differenceEffectValue + currentEffect.effect.min;
    var valueOfEffectUnit = valueOfEffect + currentEffect.effect.unit;
    window.form.imgUploadPreview.style.filter = currentEffect.effect.name + '(' + valueOfEffectUnit + ')';
  };
  // функция, которая выбирает фильтр и обновляет значение переменной текущего фильтра
  var addEffectListener = function (item) {
    var effectId = FILTER_SELECTOR_PREFIX + item.id;
    var effectElement = imgUploadEffects.querySelector('#' + effectId);
    effectElement.addEventListener('click', function () {
      resetEffectClick();
      startValuePin();
      currentEffect = item;
      if (item.id === 'none') {
        imgUploadScale.classList.add('hidden');
      }
      window.form.imgUploadPreview.classList.add(FILTER_CLASS_PREFIX + currentEffect.id);
    });
  };
  // функция, которая удаляет классы стилей у элементов
  var resetEffectClick = function () {
    window.form.imgUploadPreview.classList.remove(FILTER_CLASS_PREFIX + currentEffect.id);
    window.form.imgUploadPreview.style.filter = null;
    imgUploadScale.classList.remove('hidden');
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
    scaleValue.value = Math.floor(currentValueScale * 100);
    return currentValueScale;
  };

  var effectListenersRemove = function () {
    scalePin.removeEventListener('mousedown', changeDepthEffectMousedown);
  };

  window.imageEffect = {
    imageEffectAdd: imageEffectAdd,
    effectListenersRemove: effectListenersRemove
  };

})();
