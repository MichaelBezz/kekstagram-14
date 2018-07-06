'use strict';
// модуль, который работает с формой редактирования изображения //
(function () {

  var ESC_KEYCODE = 27;

  // Загрузка изображения и показ формы редактирования
  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('.img-upload__input');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onUploadFormOpenChange = function () {
    imgUploadOverlay.classList.remove('hidden');

    window.imageScale.imageScaleAdd();
    window.imageScale.onScaleListenersAdd();
    window.imageEffect.onImageEffectAdd();
    window.validation.onValidationAdd();

    document.addEventListener('keydown', onUploadFormEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onUploadFormCloseClick = function () {
    imgUploadOverlay.classList.add('hidden');

    uploadFile.value = '';
    imgUploadPreview.style = '';
    window.validation.textHashtags.value = '';
    window.validation.textDescription.value = '';

    window.imageScale.onScaleListenersRemove();
    window.imageEffect.onEffectListenersRemove();
    window.validation.onValidationRemove();
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);

    document.removeEventListener('keydown', onUploadFormEscPress);
  };
  // функция, для обработки события закрытия по esc
  var onUploadFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onUploadFormCloseClick();
    }
  };
  // обработчик события - открываем форму редактирования изображения
  uploadFile.addEventListener('change', onUploadFormOpenChange);
  // обработчик события - закрываем форму редактирования изображения по клику
  imgUploadCancel.addEventListener('click', onUploadFormCloseClick);
  // обработчик события - закрываем форму и отправляем данные на сервер
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
  // функция, которая отправляем данные на сервер
  var onImgUploadFormSubmit = function (evt) {
    window.backend.upload(new FormData(imgUploadForm), onUploadFormCloseClick, window.errorMessage.uploadMessageError);
    evt.preventDefault();
  };

  window.form = {
    imgUpload: imgUpload,
    imgUploadPreview: imgUploadPreview,
    imgUploadOverlay: imgUploadOverlay,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();
