'use strict';
// служебные сообщения //
(function () {

  window.errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 15px 30px; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = message;

    var closeNode = document.createElement('button');
    closeNode.textContent = 'Попробовать еще раз';
    closeNode.style = 'z-index: 101; padding: 0px 5px; text-align: center; background-color: green;';
    closeNode.style.position = 'absolute';
    closeNode.style.left = '90%';
    closeNode.style.fontSize = '10px';
    closeNode.style.borderRadius = '10px';
    closeNode.addEventListener('click', function () {
      window.location.reload();
      document.body.removeChild(node);
    });

    node.appendChild(closeNode);
    document.body.insertAdjacentElement('afterbegin', node);
  };

})();
