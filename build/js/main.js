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

'use strict';

(function () {
  var phoneInput = document.querySelector('.free-class__tel input');

  if (phoneInput) {
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
  }

  var linkAnchors = document.querySelectorAll('.page-header__button, .nav__link--gym, .nav__link--season-tickets, .nav__link--stocks, .nav__link--coaches');

  if (linkAnchors) {
    var getScroll = function () {
      for (var i = 0; i < linkAnchors.length; i++) {
        linkAnchors[i].addEventListener('click', function (evt) {
          evt.preventDefault();

          var targetElement = document.querySelector(evt.currentTarget.href.replace(/[^#]*(.*)/, '$1'));
          var ua = window.navigator.userAgent;
          var msie = ua.indexOf('MSIE ');
          var trident = ua.indexOf('Trident/');

          function isInternetExplorer() {
            return msie > -1 || trident > -1;
          }

          var targetY;

          if (isInternetExplorer() === false) {
            targetY = targetElement.getBoundingClientRect().y;
          } else {
            targetY = targetElement.getBoundingClientRect().top;
          }

          var startY = window.pageYOffset;
          var data = {
            duration: 1800,
            timing: function (timeFraction) {
              return timeFraction;
            },
            draw: function (progress) {
              window.scrollTo(0, startY + progress * targetY);
            }
          };

          function getScrollSpeed(object) {
            var start = performance.now();

            requestAnimationFrame(function animate(time) {
              var timePart = (time - start) / object.duration;

              if (timePart > 1) {
                timePart = 1;
              }

              var progress = object.timing(timePart);
              object.draw(progress);

              if (timePart < 1) {
                requestAnimationFrame(animate);
              }
            });
          }

          getScrollSpeed(data);
        });
      }
    };

    getScroll();
  }

  var sectionSeasonTickets = document.querySelector('.season-tickets');

  if (sectionSeasonTickets) {
    var seasonTickets = document.querySelectorAll('.season-tickets__time');
    var listDescription = document.querySelectorAll('.season-tickets__list-with-description');

    var isButtonActive = function () {
      function hideListDescription(number) {
        for (var i = number; i < listDescription.length; i++) {
          window.addClassList(listDescription[i], 'season-tickets__list-with-description--hidden');
          window.removeClassList(listDescription[i], 'season-tickets__list-with-description--active');
          window.removeClassList(seasonTickets[i], 'season-tickets__time--active');
        }
      }

      function showListDescription(number, target) {
        if (listDescription[number].classList.contains('season-tickets__list-with-description--hidden')) {
          window.removeClassList(listDescription[number], 'season-tickets__list-with-description--hidden');
          window.addClassList(listDescription[number], 'season-tickets__list-with-description--active');
          window.addClassList(target, 'subscriptions__item-month--active');
        }
      }

      window.removeClasses(listDescription, 'season-tickets__list-with-description--no-js');

      seasonTickets.forEach(function (element) {
        hideListDescription(1);

        element.addEventListener('click', function (evt) {
          var target = evt.target;

          if (target && target.classList.contains('season-tickets__time')) {
            for (var i = 0; i < seasonTickets.length; i++) {

              if (target === seasonTickets[i]) {
                hideListDescription(0);
                showListDescription(i, target);

                var action = window.addClassList;
                action(element, 'season-tickets__time--active');

                break;
              }
            }
          }
        });
      });
    };

    isButtonActive(seasonTickets);
  }

  var sectionCoaches = document.querySelector('.coaches');

  if (sectionCoaches) {
    var runCoachesSlider = function () {
      var coachesSlider = document.querySelector('.coaches__slider');
      var coachesGroup = document.querySelector('.coaches__group');
      var coachesList = document.querySelector('.coaches__list');
      var coachesItems = document.querySelectorAll('.coaches__item');

      window.removeClassList(coachesGroup, 'coaches__group--no-js');
      window.removeClassList(coachesList, 'coaches__list--no-js');
      window.removeClasses(coachesItems, 'coaches__item--no-js');

      new Swiper(coachesSlider, {
        navigation: {
          nextEl: '.coaches__button--next',
          prevEl: '.coaches__button--previous'
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
          pageUpDown: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 30
          },
          1200: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 40
          }
        },
        loop: true
      });
    };
    runCoachesSlider();
  }

  var sectionFeedback = document.querySelector('.feedback');

  if (sectionFeedback) {
    var runFeedbackSlider = function () {
      var feedbackSlider = document.querySelector('.feedback__slider');
      var feedbackGroup = document.querySelector('.feedback__group');
      var feedbackList = document.querySelector('.feedback__list');
      var feedbackItems = document.querySelectorAll('.feedback__item');

      window.removeClassList(feedbackGroup, 'feedback__group--no-js');
      window.removeClassList(feedbackList, 'feedback__list--no-js');
      window.removeClasses(feedbackItems, 'feedback__item--no-js');

      new Swiper(feedbackSlider, {
        slidesPerView: 1,
        navigation: {
          nextEl: '.feedback__button--next',
          prevEl: '.feedback__button--previous'
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
          pageUpDown: true
        },
        loop: true
      });
    };
    runFeedbackSlider();
  }

})();

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
            window.removeClassList(sportLists[i], 'list-sport--js');
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
