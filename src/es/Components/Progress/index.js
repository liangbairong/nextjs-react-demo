import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import classNames from 'classnames'; var Progress = function Progress(_ref) {
  var _ref$allValue = _ref.allValue,
      allValue = _ref$allValue === void 0 ? 100 : _ref$allValue,
      _ref$haveValue = _ref.haveValue,
      haveValue = _ref$haveValue === void 0 ? 0 : _ref$haveValue,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      children = _ref.children;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      percentage = _useState2[0],
      setPercentage = _useState2[1];

  useEffect(function () {
    setPercentage(haveValue / allValue * 100);
  }, [haveValue, allValue]);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames('elelive-progress', className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "elelive-progress-content",
    style: {
      width: percentage + '%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "elelive-progress-children"
  }, " ", children));
};

export default Progress;