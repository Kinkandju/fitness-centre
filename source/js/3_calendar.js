'use strict';

(function () {

  var calendar = document.querySelector('.calendar');

  if (calendar) {
    var timeItems = document.querySelectorAll('.list-time__item');
    var dayItems = document.querySelectorAll('.list-day__item');
    var sportItems = document.querySelectorAll('.list-sport__item');

    var getAttribute = function (element, attribute) {
      return element.getAttribute(attribute);
    };

    var clickSportItems = function () {
      function setActiveClass(data, items, attribute, activeClass) {
        for (var i = 0; i < items.length; i++) {
          var dataAttribute = getAttribute(items[i], attribute);
          if (data === dataAttribute) {
            window.addClassList(items[i], activeClass);
          } else {
            window.removeClassList(items[i], activeClass);
          }
        }
      }

      for (var i = 0; i < sportItems.length; i++) {
        sportItems[i].addEventListener('click', function (evt) {
          evt.preventDefault();

          if (!evt.target.classList.contains('list-sport__item--active')) {

            if (!evt.target.classList.contains('list-sport__item--clicked')) {
              window.removeClasses(sportItems, 'list-sport__item--active');
              window.addClassList(evt.target, 'list-sport__item--active');
              window.addClassList(evt.target, 'list-sport__item--clicked');

              var date = getAttribute(evt.target, 'data-day');
              var time = getAttribute(evt.target, 'data-time');

              setActiveClass(date, dayItems, 'data-day', 'list-day__item--active');
              setActiveClass(time, timeItems, 'data-time', 'list-time__item--active');

            } else {
              window.removeClassList(evt.target, 'list-sport__item--clicked');
            }
          }
        });
      }
    };
    clickSportItems();

    var sportLists = document.querySelectorAll('.list-sport');
    var timeList = document.querySelector('.list-time');
    var calendarToggle = document.querySelector('.calendar__toggle');

    var getActiveElement = function (elements, activeClass) {
      var activeElement;
      elements.forEach(function (element) {
        if (element.classList.contains(activeClass)) {
          activeElement = element;
        }
      });
      return activeElement;
    };

    var activeItem = getActiveElement(dayItems, 'active-item');
    var activeList = getActiveElement(sportLists, 'active-list');

    var openToggleMenu = function () {
      function openMenu() {
        window.removeClasses(dayItems, 'list-day__item--js');
        window.addClassList(timeList, 'list-time--js');
      }

      function closeMenu() {
        for (var i = 0; i < dayItems.length; i++) {
          window.addClassList(dayItems[i], 'list-day__item--js');
          window.removeClassList(timeList, 'list-time--js');

          if (dayItems[i].classList.contains('active-item')) {
            window.removeClassList(dayItems[i], 'list-day__item--js');
          }
        }
      }

      function hideLists() {
        for (var i = 0; i < sportLists.length; i++) {
          window.addClassList(sportLists[i], 'list-sport--js');
        }
      }

      calendarToggle.addEventListener('click', function (evt) {
        evt.preventDefault();

        window.removeClasses(dayItems, 'list-day__item--active');
        window.removeClasses(timeItems, 'list-time__item--active');
        window.removeClasses(sportItems, 'list-sport__item--active');

        if (!evt.target.classList.contains('calendar__toggle--active')) {
          window.addClassList(evt.target, 'calendar__toggle--active');

          openMenu();
          hideLists();

        } else {
          window.removeClassList(evt.target, 'calendar__toggle--active');
          window.removeClassList(activeItem, 'list-day__item--js');
          window.removeClassList(activeList, 'list-sport--js');

          closeMenu();
        }
      });

      function setListActiveClass(day) {
        for (var i = 0; i < sportLists.length; i++) {
          var listAttribute = getAttribute(sportLists[i], 'data-day');
          if (day === listAttribute) {
            window.removeClassList(sportLists[i], 'list-sport--js');
            window.addClassList(sportLists[i], 'active-list');

          } else {
            window.addClassList(sportLists[i], 'list-sport--js');
          }
        }
      }

      for (var i = 0; i < dayItems.length; i++) {
        dayItems[i].addEventListener('click', function (evt) {
          evt.preventDefault();

          closeMenu();
          window.removeClasses(dayItems, 'active-item');
          window.removeClasses(sportLists, 'active-list');

          window.removeClassList(evt.target, 'list-day__item--js');
          window.addClassList(evt.target, 'active-item');

          var day = getAttribute(evt.target, 'data-day');

          setListActiveClass(day);

          window.removeClassList(calendarToggle, 'calendar__toggle--active');
          closeMenu();
        });
      }
    };

    openToggleMenu();
  }

})();
