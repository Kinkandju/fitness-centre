'use strict';

(function () {

  new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
    }
  });

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

  function getScroll() {
    var linkAnchors = document.querySelectorAll('.page-header__button, .nav__link--gym, .nav__link--season-tickets, .nav__link--stocks, .nav__link--coaches');

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
  }

  getScroll();

  // var position = 0;
  // var slidesToShow = 4;
  // var slidesToScroll = 4;
  // var slider = document.querySelector('.coaches__slider');
  // var track = document.querySelector('.coaches__list');
  // var items = document.querySelectorAll('.coaches__item');
  // var itemsCount = items.lenght;
  // var btnPrev = document.querySelector('.coaches__button--previous');
  // var btnNext = document.querySelector('.coaches__button--next');
  //
  // var itemWidth = slider.clientWidth / slidesToShow;
  // var movePosition = slidesToScroll * itemWidth;
  //
  // items.forEach(function (item) {
  //   item.style.minWidth = (itemWidth - 30) + 'px';
  // });
  //
  // btnNext.addEventListener('click', function () {
  //   var itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  //
  //   position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  //
  //   setPosition();
  //   checkBtns();
  // });
  //
  // btnPrev.addEventListener('click', function () {
  //   var itemsLeft = Math.abs(position) / itemWidth;
  //
  //   position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  //
  //   setPosition();
  //   checkBtns();
  // });
  //
  // var setPosition = function () {
  //   track.style.transform = translateX(position) + 'px';
  // };
  //
  // var checkBtns = function () {
  //   btnPrev.disabled = position === 0;
  //   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
  // };
  //
  // checkBtns();


})();
