import React from 'react';
import Img from '../Img';
import JSBridge from '../../uilts/JSBridge'; var Avatar = function Avatar(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$imgUrl = _ref.imgUrl,
      imgUrl = _ref$imgUrl === void 0 ? '' : _ref$imgUrl,
      _ref$living = _ref.living,
      living = _ref$living === void 0 ? 0 : _ref$living,
      _ref$uid = _ref.uid,
      uid = _ref$uid === void 0 ? '' : _ref$uid,
      _ref$isClick = _ref.isClick,
      isClick = _ref$isClick === void 0 ? false : _ref$isClick,
      _ref$xOssProcess = _ref.xOssProcess,
      xOssProcess = _ref$xOssProcess === void 0 ? '' : _ref$xOssProcess,
      children = _ref.children;

  var linkFn = function linkFn() {
    if (isClick) {
      if (living === 1) {
        JSBridge.toAppLive(uid, imgUrl);
      } else {
        JSBridge.toAppPersonal(uid);
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "Avatar",
    onClick: function onClick() {
      linkFn();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "Avatar-img"
  }, imgUrl ? /*#__PURE__*/React.createElement(Img, {
    src: imgUrl,
    className: "Avatar-img-has",
    xOssProcess: xOssProcess
  }) : '', living === 1 ? /*#__PURE__*/React.createElement("div", {
    className: "Avatar-type"
  }, "LIVE") : ''), /*#__PURE__*/React.createElement("div", {
    className: "Avatar-name"
  }, name), children);
};

export default Avatar;