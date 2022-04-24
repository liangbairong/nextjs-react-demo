import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react'; import classNames from 'classnames';

var LangChange = function LangChange(_ref) {
  var _ref$langSet = _ref.langSet,
      langSet = _ref$langSet === void 0 ? {
    CN: 'zh-CN',
    EN: 'en',
    TW: 'zh-TW',
    VI: 'vi',
    ID: 'id'
  } : _ref$langSet,
      _ref$chooseLang = _ref.chooseLang,
      chooseLang = _ref$chooseLang === void 0 ? function () {} : _ref$chooseLang,
      _ref$defaultLang = _ref.defaultLang,
      defaultLang = _ref$defaultLang === void 0 ? 'CN' : _ref$defaultLang;

  var _useState = useState(defaultLang),
      _useState2 = _slicedToArray(_useState, 2),
      curLang = _useState2[0],
      setCurLang = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showList = _useState4[0],
      setShowList = _useState4[1];

  useEffect(function () {}, []);

  var handleClick = function handleClick() {
    setShowList(!showList);
  };

  var handleClickItem = function handleClickItem(lang) {
    setCurLang(lang);
    setShowList(false);
    chooseLang(langSet === null || langSet === void 0 ? void 0 : langSet[lang]);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: 'elelive-langChange'
  }, /*#__PURE__*/React.createElement("button", {
    type: 'button',
    onClick: function onClick() {
      return handleClick();
    },
    className: 'lang-btn'
  }, "\u8BED\u8A00\u5207\u6362: ", curLang, ' '), showList && /*#__PURE__*/React.createElement("div", {
    className: 'lang-list'
  }, Object.keys(langSet).map(function (item, i) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return handleClickItem(item);
      },
      className: classNames('lang-item', curLang === item ? 'selected' : ''),
      key: i
    }, item);
  })));
};

export default LangChange;