import React from 'react';
import SkeletonLib, { SkeletonTheme } from 'react-loading-skeleton'; var Skeleton = function Skeleton(_ref) {
  var _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1.2 : _ref$duration,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? '' : _ref$width,
      _ref$wrapper = _ref.wrapper,
      wrapper = _ref$wrapper === void 0 ? null : _ref$wrapper,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '' : _ref$height,
      _ref$circle = _ref.circle,
      circle = _ref$circle === void 0 ? false : _ref$circle,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 0 : _ref$delay,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '' : _ref$color,
      _ref$highlightColor = _ref.highlightColor,
      highlightColor = _ref$highlightColor === void 0 ? '' : _ref$highlightColor;
  return /*#__PURE__*/React.createElement(SkeletonTheme, {
    color: color,
    highlightColor: highlightColor
  }, /*#__PURE__*/React.createElement(SkeletonLib, {
    count: count,
    duration: duration,
    width: width,
    height: height,
    wrapper: wrapper,
    circle: circle,
    style: style,
    className: className
  }));
};

export default Skeleton;