import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import React, { useEffect, useReducer, useImperativeHandle } from 'react';

var JudgeAppPendantMsg = /*#__PURE__*/function () {
  function JudgeAppPendantMsg() {
    _classCallCheck(this, JudgeAppPendantMsg);

    this.index = 20;
    this.timer = undefined;
  }

  _createClass(JudgeAppPendantMsg, [{
    key: "trigger",
    value:
    /**
     * @param type 监听类型 pendant: 挂件 dialog: 弹窗
     * @param callback 回调函数
     */
    function trigger(type, callback) {
      var _this = this;

      this.timer && window.clearTimeout(this.timer);
      this.timer = window.setTimeout(function () {
        var _window$appPendantMsg, _window$appPendantMsg2;

        console.log(_this.index);

        if (_this.index < 0) {
          return;
        }

        console.log(window.appPendantMsg);

        if (type === 'pendant' && ((_window$appPendantMsg = window.appPendantMsg) === null || _window$appPendantMsg === void 0 ? void 0 : _window$appPendantMsg.status) === 200 || type === 'dialog' && ((_window$appPendantMsg2 = window.appPendantMsg) === null || _window$appPendantMsg2 === void 0 ? void 0 : _window$appPendantMsg2.resource)) {
          callback(window.appPendantMsg);
          window.clearTimeout(_this.timer);
        } else {
          _this.index--;

          _this.trigger(type, callback);
        }
      }, 200);
    }
  }]);

  return JudgeAppPendantMsg;
}();

var Pendant = function Pendant(props) {
  var pendantKey = props.pendantKey,
      _props$requestConfig = props.requestConfig,
      requestConfig = _props$requestConfig === void 0 ? {
    method: ''
  } : _props$requestConfig,
      _props$type = props.type,
      type = _props$type === void 0 ? 'live' : _props$type,
      cRef = props.cRef,
      request = props.request,
      _props$ROOT = props.ROOT,
      ROOT = _props$ROOT === void 0 ? '' : _props$ROOT,
      children = props.children,
      _props$callback = props.callback,
      callback = _props$callback === void 0 ? function () {} : _props$callback;
  if (typeof pendantKey !== 'string' || pendantKey === '') return null; // 计算表达式的值

  var evalSelf = function evalSelf(fn) {
    var Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错

    return new Fn("return ".concat(fn))();
  }; // 获取当前挂件数据，并和旧数据对比


  var formatReducer = function formatReducer(state, action) {
    // 判断返回的roundId，并插入到相应的tab
    if (action.currentTime > state.currentTime) {
      return action;
    }

    return state;
  };

  var _useReducer = useReducer(formatReducer, {
    currentTime: 0
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      formatData = _useReducer2[0],
      setFormatData = _useReducer2[1]; // 获取当前挂件数据，并和旧数据对比


  var reducer = function reducer(state, action) {
    console.log('InitDatareducer', state, action); // 判断返回的roundId，并插入到相应的tab

    if (action) {
      if (action.data && Array.isArray(action.data)) {
        return action.data.find(function (ctxItem) {
          return ctxItem.pendantName === pendantKey;
        });
      }
    }

    return state;
  };

  var _useReducer3 = useReducer(reducer, {}),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      initData = _useReducer4[0],
      setInitData = _useReducer4[1];

  var getPendantData = function getPendantData() {
    if (initData === null || initData === void 0 ? void 0 : initData.pendantName) {
      request(_objectSpread({}, requestConfig), requestConfig.method || 'get').then(function (res) {
        var _res$data;

        console.log("\u7EC4\u4EF6\u5185\u90E8\u8BF7\u6C42\u63A5\u53E3========".concat(JSON.stringify(res)));
        setFormatData(_objectSpread(_objectSpread({}, res), {}, {
          currentTime: ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.eventTime) || res.timestamp
        }));
      });
    }
  }; // 暴露刷新方法


  useImperativeHandle(cRef, function () {
    return {
      onRefresh: function onRefresh() {
        getPendantData();
      }
    };
  });
  useEffect(function () {
    console.log('回传数据=======------------------');
    console.log({
      formatData: formatData,
      initData: initData
    });

    if (initData === null || initData === void 0 ? void 0 : initData.pendantName) {
      callback({
        formatData: formatData,
        initData: initData
      });
    }
  }, [formatData, initData]);
  useEffect(function () {
    if (type === 'live') {
      getPendantData();
    } else if (type === 'home') {
      if (initData === null || initData === void 0 ? void 0 : initData.pendantName) {
        request({
          url: "".concat(ROOT, "/system-service/sysinfo/now")
        }, 'get').then(function (res) {
          setFormatData({
            currentTime: (res === null || res === void 0 ? void 0 : res.timestamp) * 1000
          });
        });
      }
    }
  }, [initData]);
  useEffect(function () {
    window['appRefreshTrigger'] = function (res) {
      var data = evalSelf("(".concat(res, ")"));
      console.log('im数据');
      console.log(data);

      if ((initData === null || initData === void 0 ? void 0 : initData.pendantName) && data.bizKey === pendantKey) {
        setFormatData(_objectSpread(_objectSpread({}, data.resource), {}, {
          pendantStartTime: data.statestartTime,
          pendantEndTime: data.endTime,
          currentTime: data.currentTime
        }));
      }
    };

    return function () {
      window.appRefreshTrigger = null;
    };
  }, [initData]);
  useEffect(function () {
    new JudgeAppPendantMsg().trigger('pendant', setInitData);
    return function () {
      window['appInitTrigger'] = null;
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", null, children);
};

export default Pendant;