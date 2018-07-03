'use strict';
// модуль, который работает с формой редактирования изображения //
(function () {

  // Загрузка изображения и показ формы редактирования
  var imgUpload = document.querySelector('.img-upload');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var uploadFile = imgUpload.querySelector('.img-upload__input');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');

  var ESC_KEYCODE = 27;

  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onUploadFormOpen = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.onImageScaleSet();
    window.onImageEffectSet();
    document.addEventListener('keydown', onUploadFormEscPress);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onUploadFormClose = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    window.validation.textHashtags.value = '';
    window.validation.textDescription.value = '';
    document.removeEventListener('keydown', onUploadFormEscPress);
  };
  // функция, для обработки события закрытия по esc
  var onUploadFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onUploadFormClose();
    }
  };
  // обработчик события - открываем форму редактирования изображения
  uploadFile.addEventListener('change', function () {
    onUploadFormOpen();
  });
  // обработчик события - закрываем форму редактирования изображения по клику
  imgUploadCancel.addEventListener('click', function () {
    onUploadFormClose();
  });

  // обработчик события - закрываем форму и отправляем данные на сервер
  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(imgUploadForm), onUploadFormClose, window.errorMessage.uploadMessageError);
    evt.preventDefault();
  });


  window.form = {
    imgUpload: imgUpload,
    imgUploadPreview: imgUploadPreview,
    ESC_KEYCODE: 27
  };

})();
