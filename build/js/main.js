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

  var seasonTickets = document.querySelectorAll('.season-tickets__time');
  var listDescription = document.querySelectorAll('.season-tickets__list-with-description');

  function addClassList(element, className) {
    element.classList.add(className);
  }

  function removeClassList(element, className) {
    element.classList.remove(className);
  }

  function removeClassJs(item, classItem) {
    for (var i = 0; i < item.length; i++) {
      item[i].classList.remove(classItem);
    }
  }

  function hideListDescription(number) {
    for (var i = number; i < listDescription.length; i++) {
      addClassList(listDescription[i], 'season-tickets__list-with-description--hidden');
      removeClassList(listDescription[i], 'season-tickets__list-with-description--active');
      removeClassList(seasonTickets[i], 'season-tickets__time--active');
    }
  }

  function showListDescription(number, target) {
    if (listDescription[number].classList.contains('season-tickets__list-with-description--hidden')) {
      removeClassList(listDescription[number], 'season-tickets__list-with-description--hidden');
      addClassList(listDescription[number], 'season-tickets__list-with-description--active');
      target.classList.add('subscriptions__item-month--active');
    }
  }

  function isButtonActive() {
    removeClassJs(listDescription, 'season-tickets__list-with-description--no-js');

    seasonTickets.forEach(function (element) {
      hideListDescription(1);

      element.addEventListener('click', function (evt) {
        var target = evt.target;

        if (target && target.classList.contains('season-tickets__time')) {
          for (var i = 0; i < seasonTickets.length; i++) {

            if (target === seasonTickets[i]) {
              hideListDescription(0);
              showListDescription(i, target);

              var action = addClassList;
              action(element, 'season-tickets__time--active');

              break;
            }
          }
        }
      });
    });
  }

  isButtonActive(seasonTickets);

})();
