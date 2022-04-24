import React from 'react'; var Empty = function Empty(_ref) {
  var _ref$image = _ref.image,
      image = _ref$image === void 0 ? '' : _ref$image,
      emptyStyle = _ref.emptyStyle,
      description = _ref.description,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "empty",
    style: emptyStyle
  }, /*#__PURE__*/React.createElement("img", {
    className: "empty-image",
    src: image,
    alt: "empty"
  }), /*#__PURE__*/React.createElement("span", {
    className: "empty-span"
  }, description), children);
};

export default Empty;