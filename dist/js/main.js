"use strict";

// Инициализация карусели
$('.owl-1').owlCarousel({
  stagePadding: -15,
  loop: true,
  items: 6,
  mouseDrag: false,
  touchDrag: false,
  dots: false,
  nav: false,
  margin: -16,
  autoWidth: true,
  responsive: {
    0: {},
    600: {},
    1000: {}
  }
}); // Инициализация карусели 2

$('.owl-2').owlCarousel({
  stagePadding: -125,
  loop: true,
  items: 2,
  mouseDrag: true,
  touchDrag: true,
  dots: false,
  nav: false,
  margin: 26.4,
  autoWidth: true,
  responsive: {
    0: {},
    600: {},
    1000: {}
  }
});
var wrapper = document.querySelector('.wrapper');
var header = document.querySelector('.header-wrapper');
var black = document.querySelector('.black');
var owl = $('.owl-carousel');
var carousel = document.querySelector('.owl-stage');
var carouselBg = document.querySelector('.slider-carousel .background');
var controlLeft = document.querySelector('.control-left');
var controlRight = document.querySelector('.control-right');
var arrowLeft = document.querySelector('.arrow-left');
var arrowRight = document.querySelector('.arrow-right');
var btnStart = document.getElementById('start');
var slidersWrapper = document.querySelector('.sliders-wrapper');
var pagination = document.querySelector('.pagination');

(function () {
  carouselBg.style.width = carousel.style.width;
  carouselBg.style.transform = carousel.style.transform = 'translate3d(-1660px, 0px, 0px)';
})(); // Функция смещения бэграунда вместе со слайдами


function moveBg(event) {
  carouselBg.style.transform = carousel.style.transform;
} // Функция прокрутки к первому слайду


function startScroll() {
  wrapper.classList.remove('black'); // showBlock(black, 300);

  slidersWrapper.style.transform = "translateY(-10%)";
  slidersWrapper.dataset.transform = '-10';
  pagination.children[0].classList.add('active');
} // Активация кружка пагинации слайдов


function activeCircle(transform) {
  var id = +transform - 1;

  for (var i = 0; i < pagination.children.length; i++) {
    if (i === id) pagination.children[i].classList.add('active');else pagination.children[i].classList.remove('active');
  }
} // Функия прокрутки слайдера внутри экрана


function moveSlider(transform) {
  if (transform == 0 || transform == 4 || transform == 6 || transform == 8) {
    header.style.transform = "translateY(-71px)";
    setTimeout(function () {
      wrapper.classList.add('black');
    }, 600);
    setTimeout(function () {
      header.style.transform = "translateY(0)";
    }, 1000);
  } else {
    header.style.transform = "translateY(-71px)";
    setTimeout(function () {
      wrapper.classList.remove('black');
    }, 600);
    setTimeout(function () {
      header.style.transform = "translateY(0)";
    }, 1000);
  }

  slidersWrapper.style.transform = "translateY(".concat(-10 * transform, "%)");
  slidersWrapper.dataset.transform = "".concat(-10 * transform);
  activeCircle(transform);
} //


function showBlock(el, speed) {
  var prevEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // el.style.display = 'block';
  var step = 1 / speed;
  var interval = setInterval(function () {
    if (+el.style.opacity >= 0) clearInterval(interval);

    if (prevEl) {
      prevEl.style.opacity = +prevEl.style.opacity - step;
      if (+prevEl.style.opacity <= 0) prevEl.style.display = "none";
    }

    el.style.opacity = +el.style.opacity + step;
  }, speed / 1000);
} //Функция события прогрутки мыши


function wheel(event) {
  var delta = 0;
  var currentSlider = isActive();
  if (!event) event = window.event; // Событие IE.
  // Установим кроссбраузерную delta

  if (event.wheelDelta) {
    // IE, Opera, safari, chrome - кратность дельта равна 120
    delta = event.wheelDelta / 120;
  } else if (event.detail) {
    // Mozilla, кратность дельта равна 3
    delta = -event.detail / 3;
  }

  if (delta) {
    // Отменим текущее событие - событие поумолчанию (скролинг окна).
    // if (event.preventDefault) {
    //     event.preventDefault();
    // }
    // event.returnValue = false; // для IE
    // если дельта больше 0, то колесо крутят вверх, иначе вниз
    var dir = delta > 0 ? currentSlider + 1 : currentSlider - 1; // if (slider.dataset.transform == 0 && dir === 0 || slider.dataset.transform == -90 && dir === 10) return;

    if (dir === -1 || dir === 10) return;
    moveSlider(dir);
  }
} // Обработчик событий Скота Эндрю


function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);
    return r;
  } else {
    elm['on' + evType] = fn;
  }
} // Функция определяет активный слайдер и возвращает его число


function isActive() {
  var activeSlider;

  for (var i = 0; i < pagination.children.length; i++) {
    if (pagination.children[i].classList.contains('active')) {
      activeSlider = +pagination.children[i].dataset.id;
      return activeSlider;
    }
  }

  return 0;
}

owl.on('translate.owl.carousel', function (event) {
  moveBg();
});
controlRight.addEventListener('click', function () {
  owl.trigger('next.owl.carousel');
});
controlLeft.addEventListener('click', function () {
  owl.trigger('prev.owl.carousel');
});
arrowRight.addEventListener('click', function () {
  owl.trigger('next.owl.carousel');
});
arrowLeft.addEventListener('click', function () {
  owl.trigger('prev.owl.carousel');
}); // Кнопка прокрутки к пермоу слайду

btnStart.addEventListener('click', function (evt) {
  evt.preventDefault();
  startScroll();
}); // Тап по кругам пагинации

pagination.addEventListener('click', function (evt) {
  if (evt.target.className !== 'circle') return;
  var targetSlider = evt.target.dataset.id;
  moveSlider(targetSlider);
}); // Обработчик стрелок на клавиатуре

window.addEventListener('keydown', function (evt) {
  var currentSlider = isActive();

  switch (evt.key) {
    case 'ArrowDown':
      if (slidersWrapper.dataset.transform != -90) moveSlider(currentSlider + 1);else return;
      activeCircle(currentSlider + 1);
      break;

    case 'ArrowUp':
      if (slidersWrapper.dataset.transform != 0) moveSlider(currentSlider - 1);else return;
      activeCircle(currentSlider - 1);
      break;
  }
});
addEvent(window, 'mousewheel', wheel);
addEvent(window, 'DOMMouseScroll', wheel);
//# sourceMappingURL=main.js.map
