'use strict';
// масштаб: редактирование размера изображения //
(function () {

  var MAX_SIZE_VALUE = 100;
  var MIN_SIZE_VALUE = 25;
  var RESIZE_STEP = 25;
  var PERCENT = '%';

  var resizeControlPlus = window.form.imgUpload.querySelector('.resize__control--plus');
  var resizeControlMinus = window.form.imgUpload.querySelector('.resize__control--minus');
  var resizeControlValue = window.form.imgUpload.querySelector('.resize__control--value');
  var currentValue;

  var imageScaleAdd = function () {
    resizeControlValue.value = MAX_SIZE_VALUE + PERCENT;
    currentValue = MAX_SIZE_VALUE;
    resizeControlPlus.disabled = true;
    resizeControlMinus.disabled = false;
  };

  var onPlusClick = function () {
    currentValue += RESIZE_STEP;
    resizeControlValue.value = currentValue + PERCENT;
    window.form.imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
    if (currentValue === MAX_SIZE_VALUE) {
      resizeControlPlus.disabled = true;
    } else if (currentValue > MIN_SIZE_VALUE) {
      resizeControlMinus.disabled = false;
    }
  };

  var onMinusClick = function () {
    currentValue -= RESIZE_STEP;
    resizeControlValue.value = currentValue + PERCENT;
    window.form.imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
    if (currentValue === MIN_SIZE_VALUE) {
      resizeControlMinus.disabled = true;
    } else if (currentValue < MAX_SIZE_VALUE) {
      resizeControlPlus.disabled = false;
    }
  };

  var scaleListenersAdd = function () {
    resizeControlPlus.addEventListener('click', onPlusClick);
    resizeControlMinus.addEventListener('click', onMinusClick);
  };

  var scaleListenersRemove = function () {
    resizeControlPlus.removeEventListener('click', onPlusClick);
    resizeControlMinus.removeEventListener('click', onMinusClick);
  };

  window.imageScale = {
    imageScaleAdd: imageScaleAdd,
    scaleListenersAdd: scaleListenersAdd,
    scaleListenersRemove: scaleListenersRemove
  };

})();
