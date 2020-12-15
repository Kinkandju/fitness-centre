'use strict';

(function () {
  window.addClassList = function (element, className) {
    element.classList.add(className);
  };

  window.removeClassList = function (element, className) {
    element.classList.remove(className);
  };

  window.removeClasses = function (item, classItem) {
    for (var i = 0; i < item.length; i++) {
      item[i].classList.remove(classItem);
    }
  };
})();
