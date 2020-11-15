'use strict';

(function () {
  var maskedInputs = document.querySelectorAll('input[data-inputmask]');

  var applyMask = function () {
    Array.prototype.forEach.call(maskedInputs, function (input) {
      var maskOption = {
        mask: input.getAttribute('data-inputmask')
      };
      IMask(input, maskOption);
    });
  };

  applyMask();

  function removeClassJs(item, classItem) {
    for (var i = 0; i < item.length; i++) {
      item[i].classList.remove(classItem);
    }
  }

  var lists = document.querySelectorAll('.season-tickets__list-with-description');

  removeClassJs(lists, 'season-tickets__list-with-description--no-js');
})();
