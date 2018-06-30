'use strict';
// модуль, который работает с формой редактирования изображения //
(function () {

  // Загрузка изображения и показ формы редактирования
  var imgUpload = document.querySelector('.img-upload');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var uploadFile = imgUpload.querySelector('.img-upload__input');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

  var ESC_KEYCODE = 27;

  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onPopupOpen = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.onImageScaleSet();
    window.onImageEffectSet();
    document.addEventListener('keydown', onPopupEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onPopupClose = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };
  // функция, для обработки события закрытия по esc
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onPopupClose();
    }
  };
  // обработчик события - открываем форму редактирования изображения
  uploadFile.addEventListener('change', function () {
    onPopupOpen();
  });
  // обработчик события - закрываем форму редактирования изображения по клику
  imgUploadCancel.addEventListener('click', function () {
    onPopupClose();
  });

  window.form = {
    imgUpload: imgUpload,
    imgUploadPreview: imgUploadPreview,
    ESC_KEYCODE: 27
  };

})();
