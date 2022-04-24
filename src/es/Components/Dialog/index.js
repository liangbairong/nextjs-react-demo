import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom'; var Dialog = function Dialog(_ref) {
  var _ref$open = _ref.open,
      open = _ref$open === void 0 ? false : _ref$open,
      children = _ref.children,
      _ref$onClose = _ref.onClose,
      onClose = _ref$onClose === void 0 ? function () {} : _ref$onClose,
      _ref$onAnimateEnd = _ref.onAnimateEnd,
      onAnimateEnd = _ref$onAnimateEnd === void 0 ? function () {} : _ref$onAnimateEnd,
      _ref$showCloseButton = _ref.showCloseButton,
      showCloseButton = _ref$showCloseButton === void 0 ? false : _ref$showCloseButton,
      _ref$showMask = _ref.showMask,
      showMask = _ref$showMask === void 0 ? false : _ref$showMask,
      _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? true : _ref$animate,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$isBescroll = _ref.isBescroll,
      isBescroll = _ref$isBescroll === void 0 ? false : _ref$isBescroll,
      _ref$dialogType = _ref.dialogType,
      dialogType = _ref$dialogType === void 0 ? 'center' : _ref$dialogType;
  var modalEl = useRef('');
  var boxEl = useRef();
  var handleClick = useCallback(function (e) {
    if (!modalEl.current.contains(e.target) && modalEl.current.current !== e.target) {
      onClose();
    }
  }, []);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      bgAnimateClass = _useState4[0],
      setBgAnimateClass = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      animateClass = _useState6[0],
      setAnimateClass = _useState6[1];

  useEffect(function () {
    if (!open) {
      outFn();
    } else {
      if (animate) {
        setBgAnimateClass('animated opAnimatedIn');
        setAnimateClass("animated ".concat(dialogType === 'bottom' ? 'bounceUp' : 'bounceIn'));
      }

      setShow(true);

      if (!isBescroll) {
        touchmove();
      }
    }
  }, [open]);

  var outFn = function outFn() {
    if (show) {
      if (animate) {
        setBgAnimateClass('animated opAnimatedOut');
        setAnimateClass("animated ".concat(dialogType === 'bottom' ? 'bounceDown' : 'bounceOut'));
        setTimeout(function () {
          setShow(false);
          onAnimateEnd();
        }, 1000);
      } else {
        setShow(false);
        onAnimateEnd();
      }

      if (!isBescroll) {
        unTouchmove();
      }
    }
  };

  if (!show) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  function touchmove() {
    // @ts-ignore
    var scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop;
    document.body.classList.add('static');
    document.body.style.top = "-".concat(scrollTop, "px");
  }

  function unTouchmove() {
    var top = document.body.style.top;
    document.body.classList.remove('static');
    window.scrollTo(0, -parseInt(top));
    document.body.style.top = '';
  }

  var dom = /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(event) {
      return handleClick(event);
    },
    className: classnames('ele-dialog-wrap', className),
    ref: boxEl
  }, showMask && /*#__PURE__*/React.createElement("div", {
    className: classnames('ele-dialog-mask', bgAnimateClass)
  }), /*#__PURE__*/React.createElement("div", {
    className: classnames(animateClass),
    ref: modalEl
  }, /*#__PURE__*/React.createElement("div", {
    className: "ele-dialog-content"
  }, children, showCloseButton ? /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    className: "ele-dialog-close"
  }) : '')));
  return /*#__PURE__*/ReactDOM.createPortal(dom, document.body);
};

export default Dialog;