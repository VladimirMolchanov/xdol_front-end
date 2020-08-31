"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(function () {
  (0, _jquery["default"])('.select').each(function () {
    var _this = (0, _jquery["default"])(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 450; // длительность анимации 


    _this.hide();

    _this.wrap('<div class="select"></div>');

    (0, _jquery["default"])('<div>', {
      "class": 'new-select',
      text: _this.children('option:selected').text()
    }).insertAfter(_this);

    var selectHead = _this.next('.new-select');

    (0, _jquery["default"])('<div>', {
      "class": 'after'
    }).appendTo(selectHead);
    var after = selectHead.find('.after'); // $('<div>', {
    //     class: 'arrows'
    // }).appendTo(selectHead);

    (0, _jquery["default"])('<div>', {
      "class": 'fill'
    }).appendTo(after);
    (0, _jquery["default"])('<div>', {
      "class": 'new-select__list'
    }).insertAfter(selectHead);
    var selectList = selectHead.next('.new-select__list');

    for (var i = 0; i < selectOptionLength; i++) {
      (0, _jquery["default"])('<div>', {
        "class": 'new-select__item',
        html: (0, _jquery["default"])('<span>', {
          text: selectOption.eq(i).text()
        })
      }).attr('data-value', selectOption.eq(i).val()).appendTo(selectList);
    }

    var selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function () {
      if (!(0, _jquery["default"])(this).hasClass('on')) {
        (0, _jquery["default"])(this).addClass('on');
        selectList.slideDown(duration);
        selectItem.on('click', function () {
          var chooseItem = (0, _jquery["default"])(this).data('value');
          (0, _jquery["default"])('select').val(chooseItem).attr('selected', 'selected');
          selectHead.text((0, _jquery["default"])(this).find('span').text());
          selectList.slideUp(duration);
          selectHead.removeClass('on');
        });
      } else {
        (0, _jquery["default"])(this).removeClass('on');
        selectList.slideUp(duration);
      }
    });
  });
});