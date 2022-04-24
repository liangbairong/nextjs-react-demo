import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import classNames from 'classnames'; var TabMenu = function TabMenu(_ref) {
  var _ref$menuList = _ref.menuList,
      menuList = _ref$menuList === void 0 ? [] : _ref$menuList,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? '' : _ref$path,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? -1 : _ref$value,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$onMenuChange = _ref.onMenuChange,
      onMenuChange = _ref$onMenuChange === void 0 ? function () {} : _ref$onMenuChange;

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      actionPath = _useState2[0],
      setActionPath = _useState2[1];

  useEffect(function () {
    setActionPath(path);
  }, [path]);

  var cutMenu = function cutMenu(data) {
    if (data.disable) return;
    setActionPath(data.path);
    onMenuChange(data);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: 'elelive-tabs-wrap'
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames('elelive-tabs', className)
  }, menuList.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: classNames('elelive-tabs-li', value >= item.value ? 'elelive-tabs-exi' : '', actionPath === item.path || !actionPath && index === 0 ? 'elelive-tabs-action' : ''),
      key: item.value + index,
      onClick: function onClick() {
        cutMenu(item);
      }
    }, /*#__PURE__*/React.createElement("span", null, item.label));
  })));
};

export default TabMenu;