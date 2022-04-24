import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["src", "className", "style", "webp", "seatImg", "seatStyle", "seatClassName", "isSkeleton", "skeWidth", "skeHeight", "language", "xOssProcess", "onClick"];
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import Skeleton from '../Skeleton';
import Utils from '../Utils'; var Img = function Img(_ref) {
  var _ref$src = _ref.src,
      src = _ref$src === void 0 ? '' : _ref$src,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$webp = _ref.webp,
      webp = _ref$webp === void 0 ? '' : _ref$webp,
      seatImg = _ref.seatImg,
      _ref$seatStyle = _ref.seatStyle,
      seatStyle = _ref$seatStyle === void 0 ? {} : _ref$seatStyle,
      _ref$seatClassName = _ref.seatClassName,
      seatClassName = _ref$seatClassName === void 0 ? '' : _ref$seatClassName,
      _ref$isSkeleton = _ref.isSkeleton,
      isSkeleton = _ref$isSkeleton === void 0 ? false : _ref$isSkeleton,
      _ref$skeWidth = _ref.skeWidth,
      skeWidth = _ref$skeWidth === void 0 ? '100%' : _ref$skeWidth,
      _ref$skeHeight = _ref.skeHeight,
      skeHeight = _ref$skeHeight === void 0 ? '100%' : _ref$skeHeight,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? 'zh-CN' : _ref$language,
      _ref$xOssProcess = _ref.xOssProcess,
      xOssProcess = _ref$xOssProcess === void 0 ? '' : _ref$xOssProcess,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? function () {} : _ref$onClick,
      props = _objectWithoutProperties(_ref, _excluded);

  var defaultSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  var _useState = useState(isSkeleton ? 1 : 2),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var ref = useRef(null);

  function getTempSrc() {
    var tempSrc = '';

    if (_typeof(src) === 'object' && src !== null) {
      // @ts-ignore
      tempSrc = src[language];
    } else {
      tempSrc = src;
    }

    if (xOssProcess) {
      if (tempSrc.indexOf('?') != -1) {
        tempSrc = tempSrc + '&x-oss-process=style%2F' + xOssProcess;
      } else {
        tempSrc = tempSrc + '?x-oss-process=style%2F' + xOssProcess;
      }
    }

    return tempSrc;
  }

  var initUrl = function initUrl() {
    return new Promise(function (resolve) {
      if (!src) {
        resolve(defaultSrc);
      } else {
        var tempSrc = '';

        if (webp) {
          Utils.supportsWebp(window).then(function (res) {
            if (res) {
              if (_typeof(webp) === 'object' && webp !== null) {
                // @ts-ignore
                tempSrc = webp[language];
              } else {
                tempSrc = webp;
              }
            } else {
              tempSrc = getTempSrc();
            }

            resolve(tempSrc);
          });
        } else {
          resolve(getTempSrc());
        }
      }
    });
  };

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      url = _useState4[0],
      setUrl = _useState4[1];

  useEffect(function () {
    init();
  }, [src]);

  function init() {
    return _init.apply(this, arguments);
  }

  function _init() {
    _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var a;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return initUrl();

            case 2:
              a = _context.sent;
              setUrl(a);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _init.apply(this, arguments);
  }

  useEffect(function () {
    var img = ref.current;

    if (ref.current) {
      img.onload = function () {
        setState(2);
      };

      img.onerror = function () {
        setUrl(defaultSrc);
      };

      return function () {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [url]);

  var imageProps = _objectSpread({
    style: style,
    onClick: onClick,
    src: url,
    className: classNames(className || 'eleimg-img')
  }, props);

  switch (state) {
    case 1:
      return /*#__PURE__*/React.createElement(Skeleton, {
        width: skeWidth,
        height: skeHeight
      });

    case 2:
      {
        return /*#__PURE__*/React.createElement("img", _extends({}, imageProps, {
          ref: ref,
          alt: ""
        }));
      }

    default:
      return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
};

export default Img;