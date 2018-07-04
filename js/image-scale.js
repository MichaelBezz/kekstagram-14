'use strict';
// масштаб: редактирование размера изображения //
(function () {

  var MAX_SIZE_VALUE = 100;
  var MIN_SIZE_VALUE = 25;
  var RESIZE_STEP = 25;
  var PERCENT = '%';

  var resizeControlMinus = window.form.imgUpload.querySelector('.resize__control--minus');
  var resizeControlPlus = window.form.imgUpload.querySelector('.resize__control--plus');
  var resizeControlValue = window.form.imgUpload.querySelector('.resize__control--value');

  // функция, которая изменяет масштаб изображения
  window.onImageScaleSet = function () {
    resizeControlValue.value = MAX_SIZE_VALUE + PERCENT;
    var currentValue = MAX_SIZE_VALUE;
    resizeControlPlus.disabled = true;

    resizeControlPlus.addEventListener('click', function () {
      currentValue += RESIZE_STEP;
      resizeControlValue.value = currentValue + PERCENT;
      window.form.imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
      if (currentValue === MAX_SIZE_VALUE) {
        resizeControlPlus.disabled = true;
      } else if (currentValue > MIN_SIZE_VALUE) {
        resizeControlMinus.disabled = false;
      }
    });

    resizeControlMinus.addEventListener('click', function () {
      currentValue -= RESIZE_STEP;
      resizeControlValue.value = currentValue + PERCENT;
      window.form.imgUploadPreview.style.transform = 'scale(' + currentValue / 100 + ')';
      if (currentValue === MIN_SIZE_VALUE) {
        resizeControlMinus.disabled = true;
      } else if (currentValue < MAX_SIZE_VALUE) {
        resizeControlPlus.disabled = false;
      }
    });
  };

})();
