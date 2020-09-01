"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _popper = _interopRequireDefault(require("popper.js"));

var _bootstrap = _interopRequireDefault(require("bootstrap"));

require("fullpage.js/vendors/scrolloverflow");

require("fullpage.js/vendors/easings");

var _fullpage = _interopRequireDefault(require("fullpage.js"));

require("owl.carousel");

var _animateLines = _interopRequireDefault(require("./animate-lines"));

var _swapToImage = _interopRequireDefault(require("./swap-to-image.js"));

var _inputSelect = _interopRequireDefault(require("./input-select"));

var _inputFile = _interopRequireDefault(require("./input-file"));

var _gsap = require("gsap");

require("jquery.maskedinput/src/jquery.maskedinput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function padNum(num) {
  return num.toString().padStart(2, 0);
}

var animateBtn = null;
(0, _jquery["default"])(".btn-x-default-light").hover(function () {
  animateBtn = _gsap.gsap.timeline();
  animateBtn.to((0, _jquery["default"])(this).find('.after'), {
    x: "-100%",
    duration: "0"
  }).to((0, _jquery["default"])(this).find('.after'), {
    x: "0",
    duration: "0.5"
  }).to((0, _jquery["default"])(this), {
    color: "#121C26"
  }, "<-0.5");
}, function () {
  animateBtn.to((0, _jquery["default"])(this).find('.after'), {
    x: "100%"
  }).to((0, _jquery["default"])(this), {
    color: "#FFFFFF",
    duration: "0.5"
  }, "<-0.5");
});
var animateBtn1 = null;
(0, _jquery["default"])(".btn-x-default-dark, .input-file").hover(function () {
  animateBtn1 = _gsap.gsap.timeline();
  animateBtn1.to((0, _jquery["default"])(this).find('.after'), {
    x: "-100%",
    duration: "0"
  }).to((0, _jquery["default"])(this).find('.after'), {
    x: "0",
    duration: "0.5"
  }).to((0, _jquery["default"])(this), {
    color: "#FFFFFF"
  }, "<-0.5");
}, function () {
  animateBtn1.to((0, _jquery["default"])(this).find('.after'), {
    x: "100%"
  }).to((0, _jquery["default"])(this), {
    color: "#121C26"
  }, "<-0.5");
});
(0, _jquery["default"])(document).ready(function () {
  var temp = new _fullpage["default"]('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: true,
    verticalCentered: true,
    dragAndMove: false,
    scrollOverflowReset: true,
    scrollingSpeed: 700,
    bounceEasing: {
      style: 'cubic-bezier(0,0,1,1)',
      fn: function fn(k) {
        return k;
      }
    },
    scrollOverflowOptions: {
      mouseWheel: true,
      click: false,
      disableMouse: true,
      disablePointer: true,
      disableTouch: false // bounceTime: 600,
      // deceleration: 0.1,
      // mouseWheelSpeed: 20

    }
  });
  var owl = (0, _jquery["default"])('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
    stagePadding: 20,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      720: {
        stagePadding: 10
      },
      992: {
        stagePadding: 150
      },
      1200: {
        stagePadding: 160
      },
      1300: {
        stagePadding: 180
      },
      1400: {
        stagePadding: 200
      },
      1500: {
        stagePadding: 220
      },
      1600: {
        stagePadding: 240
      },
      1700: {
        stagePadding: 360
      },
      1800: {
        stagePadding: 360
      }
    },
    onInitialized: function onInitialized(event) {
      var namespace = event.namespace;
      var element = event.target;
      var items = event.item.count;
      var nav = (0, _jquery["default"])(element).find(".owl-nav");
      var prev = nav.find(".owl-prev");
      (0, _jquery["default"])(prev).after("<div class='text-positions'><span class='curent'>01 </span>/ 06<span><span></div>");
      var dots = (0, _jquery["default"])(".owl-custom-dots");
      var current = dots.children();
      (0, _jquery["default"])(current[0]).addClass("active");
      dots.find(".after").stop().animate({
        "width": 1 * (100 / (items - 1)) + 1 + "%",
        "height": 1 * (100 / (items - 1)) + 1 + "%"
      }, 6500);
      (0, _jquery["default"])(event.target).append('\
                <div class="owl-main-item--link">\
                    <a href="javascript:void(0)" class="default-link">\
                        <svg class="arrow-animate" width="58" height="16" viewBox="0 0 58 16" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <g class="arrows">\
                                <g class="step step3">\
                                    <path d="M8.77344 12.5859L1.17969 9V8.15625L8.77344 4.57812V6.11719L3.27344 8.58594L8.77344 11.0469V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <g class="step step2">\
                                    <path d="M17.5078 12.5859L9.91406 9V8.15625L17.5078 4.57812V6.11719L12.0078 8.58594L17.5078 11.0469V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <g class="step step1">\
                                    <path d="M26.2422 12.5859 L18.6484 9 V8.15625 L26.2422 4.57812 V6.11719 L20.7422 8.58594 L26.2422 11.0469 V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <path class="step step4" d="M31 8H58" stroke="#121C26" stroke-width="1.4"/>\
                            </g>\
                        </svg>\
                        <span>Проекты</span>\
                    </a>\
                    <a href="javascript:void(0)" class="default-link">\
                        <svg class="arrow-animate" width="58" height="16" viewBox="0 0 58 16" fill="none" xmlns="http://www.w3.org/2000/svg">\
                            <g class="arrows">\
                                <g class="step step3">\
                                    <path d="M8.77344 12.5859L1.17969 9V8.15625L8.77344 4.57812V6.11719L3.27344 8.58594L8.77344 11.0469V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <g class="step step2">\
                                    <path d="M17.5078 12.5859L9.91406 9V8.15625L17.5078 4.57812V6.11719L12.0078 8.58594L17.5078 11.0469V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <g class="step step1">\
                                    <path d="M26.2422 12.5859 L18.6484 9 V8.15625 L26.2422 4.57812 V6.11719 L20.7422 8.58594 L26.2422 11.0469 V12.5859Z" fill="#121C26"/>\
                                </g>\
                                <path class="step step4" d="M31 8H58" stroke="#121C26" stroke-width="1.4"/>\
                            </g>\
                        </svg>\
                        <span>Начать разработку</span>\
                    </a>\
                </div>\
            ');
    },
    onTranslate: function onTranslate(event) {
      var element = event.target;
      var items = event.item.count;
      var menuCounterThis = (0, _jquery["default"])(element).find(".curent");
      var count = ++event.page.index;
      var dots = (0, _jquery["default"])(".owl-custom-dots");
      var current = dots.children();
      current.each(function () {
        (0, _jquery["default"])(this).removeClass("active");
      });

      for (var i = 0; i < count; i++) {
        (0, _jquery["default"])(current[i]).addClass("active");
      }

      dots.find(".after").stop();
      if (count == 1) dots.find(".after").stop().animate({
        "width": (count - 1) * (100 / (items - 1)) + 1 + "%",
        "height": (count - 1) * (100 / (items - 1)) + 1 + "%"
      }, 0);else dots.find(".after").stop().animate({
        "width": (count - 1) * (100 / (items - 1)) + 1 + "%",
        "height": (count - 1) * (100 / (items - 1)) + 1 + "%"
      }, 300);
    },
    onTranslated: function onTranslated(event) {
      var element = event.target;
      var items = event.item.count;
      var menuCounterThis = (0, _jquery["default"])(element).find(".curent");
      var count = ++event.page.index;
      var dots = (0, _jquery["default"])(".owl-custom-dots");
      var current = dots.children();
      menuCounterThis.text(padNum(count) + " ");
      current.each(function () {
        (0, _jquery["default"])(this).removeClass("current");
      });
      (0, _jquery["default"])(current[count]).addClass("current");
      dots.find(".after").stop().animate({
        "width": (count - 1) * (100 / (items - 1)) + 1 + "%",
        "height": (count - 1) * (100 / (items - 1)) + 1 + "%"
      }, 0);
      dots.find(".after").stop().animate({
        "width": count * (100 / (items - 1)) + 1 + "%",
        "height": count * (100 / (items - 1)) + 1 + "%"
      }, 6500);
    }
  });
  (0, _jquery["default"])('.owl-custom-dots').on('click', 'button', function (e) {
    owl.trigger('to.owl.carousel', [jQuery(this).index(), 300]);
  });
});
(0, _jquery["default"])(document).ready(function () {
  (0, _jquery["default"])("#inputPhone").mask("+7(999) 999-99-99");
  (0, _jquery["default"])(".main-content__mini-project--content-list").hover(function () {
    (0, _jquery["default"])(".main-content__mini-project--content-list-item a").addClass("active");
  }, function () {
    (0, _jquery["default"])(".main-content__mini-project--content-list-item a").removeClass("active");
  });
});