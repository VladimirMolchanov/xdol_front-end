"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _popper = _interopRequireDefault(require("popper.js"));

var _bootstrap = _interopRequireDefault(require("bootstrap"));

var _fullpage = _interopRequireDefault(require("fullpage.js"));

require("owl.carousel");

require("fullpage.js/vendors/scrolloverflow");

var _inputSelect = _interopRequireDefault(require("./input-select"));

var _inputFile = _interopRequireDefault(require("./input-file"));

var _swapToImage = _interopRequireDefault(require("./swap-to-image.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function padNum(num) {
  return num.toString().padStart(2, 0);
}

(0, _jquery["default"])(document).ready(function () {
  // $('#fullpage').fullpage({
  // 	//options here
  // 	autoScrolling:true,
  // 	scrollHorizontally: true
  // });
  // $.fn.fullpage.setAllowScrolling(false);
  new _fullpage["default"]('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    scrollOverflow: true,
    verticalCentered: true
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
        stagePadding: 380
      }
    },
    // onChange: (event) => {
    //     var dots = $(".owl-custom-dots")
    //     dots.find(".after").css("transition", "all .3s")
    // },    
    onInitialized: function onInitialized(event) {
      var element = event.target;
      var items = event.item.count;
      var nav = (0, _jquery["default"])(element).find(".owl-nav");
      var prev = nav.find(".owl-prev");
      (0, _jquery["default"])(prev).after("<div class='text-positions'><span class='curent'>01 </span>/ 06<span><span></div>");
      var dots = (0, _jquery["default"])(".owl-custom-dots");
      var current = dots.children();
      (0, _jquery["default"])(current[0]).addClass("active"); // dots.find(".after").css("width", (1) * (100/(items-1))  + "%")
      // dots.find(".after").css("height", (1) * (100/(items-1))  + "%")
      // dots.find(".after").css("transition", "all 5s")

      dots.find(".after").stop().animate({
        "width": 1 * (100 / (items - 1)) + 1 + "%",
        "height": 1 * (100 / (items - 1)) + 1 + "%"
      }, 6500);
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

      dots.find(".after").stop(); // dots.find(".after").css("transition", "all .3s")
      // dots.find(".after").stop().animate({
      //     "width": (count-1) * (100/(items-1))  + "%", 
      //     "height": (count-1) * (100/(items-1))  + "%"
      // }, 300)
      // dots.find(".after").css("height", (count-1) * (100/(items-1))  + "%")
      // if(count == 1) 
      //     dots.find(".after").css("transition", "all 0s")
      // else
      //     dots.find(".after").css("transition", "all .3s")

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
      var menuCounterThis = (0, _jquery["default"])(element).find(".curent"); // var menuCloned = $(this).find('.cloned').length // Количество клонированных элементов
      // var menuIndex = event.item.index // Номер текущего слайда
      // var menuCount = event.item.count // Общее количество слайдов (без клонированных)
      // if ( menuIndex > menuCount ) {
      //     menuCounterThis.text( padNum(menuIndex - menuCloned + ( menuCloned - menuCount ))  );
      // } else {
      //     menuCounterThis.text( padNum(menuIndex) );
      // }
      // menuCounterTotal.text( padNum(menuCount) );

      var count = ++event.page.index;
      var dots = (0, _jquery["default"])(".owl-custom-dots");
      var current = dots.children();
      menuCounterThis.text(padNum(count) + " ");
      current.each(function () {
        (0, _jquery["default"])(this).removeClass("current");
      });
      (0, _jquery["default"])(current[count]).addClass("current"); // dots.find(".after").css("width", (count) * (100/(items-1))  + "%")
      // dots.find(".after").css("height", (count) * (100/(items-1))  + "%")
      // dots.find(".after").css("transition", "all 8s")

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
}); // $(document).ready(function(){
//     var time = null
//     $(".default-link").on("mouseover", function(e) {
//         $( this ).addClass("hover").delay(3000).removeClass("hover").addClass("hover")
//         var n = this
//     })
//     $(".default-link").on("mouseout", function(e) {
//         $( this ).removeClass("hover")
//         clearInterval(time)
//     })
// });