import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useImperativeHandle } from 'react';
import { debounce } from '../../uilts';
import Loading from '../Loading'; var LoadMore = function LoadMore(_ref) {
  var _ref$height = _ref.height,
      height = _ref$height === void 0 ? 4 : _ref$height,
      children = _ref.children,
      _ref$onLoadMore = _ref.onLoadMore,
      onLoadMore = _ref$onLoadMore === void 0 ? function () {} : _ref$onLoadMore,
      cRef = _ref.cRef,
      customLoading = _ref.customLoading;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  useImperativeHandle(cRef, function () {
    return {
      loadingControl: function loadingControl(state) {
        setLoading(state);
      }
    };
  });

  var getDistance = function getDistance(event) {
    event.stopPropagation();
    if (loading) return;
    var dom = event.target;
    var scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;

    if (scrollDistance <= 1) {
      // 等于0证明已经到底，可以请求接口
      console.log('触底了');
      setLoading(true);
      onLoadMore();
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "elelive-loadMore",
    style: {
      height: typeof height === 'number' ? height + 'rem' : height
    },
    onScroll: function onScroll(event) {
      return debounce(getDistance(event), 300);
    }
  }, children, customLoading ? loading ? customLoading : '' : /*#__PURE__*/React.createElement(Loading, {
    open: loading,
    className: "elelive-loadMore-loading"
  }));
};

export default LoadMore;