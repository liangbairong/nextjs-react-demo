import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react'; import classNames from 'classnames';

var Dropdown = function Dropdown(_ref) {
  var _ref$list = _ref.list,
      list = _ref$list === void 0 ? [{
    value: '',
    label: ''
  }] : _ref$list,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? '更多' : _ref$defaultValue,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$onTrigger = _ref.onTrigger,
      onTrigger = _ref$onTrigger === void 0 ? function () {} : _ref$onTrigger,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      _ref$isChangeCur = _ref.isChangeCur,
      isChangeCur = _ref$isChangeCur === void 0 ? true : _ref$isChangeCur;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showList = _useState2[0],
      setShowList = _useState2[1];

  var _useState3 = useState(defaultValue || list[0].value),
      _useState4 = _slicedToArray(_useState3, 2),
      curItem = _useState4[0],
      setCurItem = _useState4[1];

  useEffect(function () {
    onTrigger(showList);
  }, [showList]);

  var handleClick = function handleClick() {
    setShowList(!showList);
  };

  var handleClickItem = function handleClickItem(data, item) {
    console.log(item, 999999999);
    var label = item.label;
    setShowList(false);
    setCurItem(label);
    onClick(data, item);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classNames('elelive-Dropdown', disabled ? 'disabled' : '')
  }, /*#__PURE__*/React.createElement("button", {
    type: 'button',
    onClick: function onClick() {
      return handleClick();
    },
    className: 'Dropdown-btn'
  }, isChangeCur ? curItem : defaultValue), showList && /*#__PURE__*/React.createElement("div", {
    className: 'Dropdown-list'
  }, list.map(function (_ref2, index) {
    var value = _ref2.value,
        label = _ref2.label;
    return /*#__PURE__*/React.createElement("div", {
      onClick: function onClick(data) {
        return handleClickItem(data, {
          value: value,
          label: label
        });
      },
      key: index,
      className: classNames(curItem === value ? 'selected' : '', 'elelive-DropdownItem')
    }, label);
  })));
};

export default Dropdown;