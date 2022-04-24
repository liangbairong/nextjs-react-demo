import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { padStart } from 'lodash';

function work() {
  var timer = null;

  onmessage = function onmessage(_ref) {
    var _ref$data = _ref.data,
        endTime = _ref$data.endTime,
        gapTime = _ref$data.gapTime,
        seconds = _ref$data.seconds;

    // console.log(endTime);
    // console.log(gapTime);
    // console.log(seconds);
    function cd() {
      var val = 0;

      if (seconds) {
        seconds -= 1000;
        val = seconds;
      } else {
        val = endTime - (Date.now() + gapTime);
      }

      if (val > 0) {
        // @ts-ignore
        postMessage(val);
      } else {
        // @ts-ignore
        postMessage(val);
        clearInterval(timer);
        timer = null;
      }
    }

    if (gapTime && endTime || seconds) {
      timer && clearInterval(timer);
      cd();
      timer = setInterval(cd, 1000);
    }
  };
}

var runWorker = function runWorker(f) {
  var worker = new Worker(URL.createObjectURL(new Blob(["(".concat(f.toString(), ")()")])));
  return worker;
};

var CountDown = function CountDown(_ref2) {
  var endTime = _ref2.endTime,
      eventTime = _ref2.eventTime,
      _ref2$ROOT_BASE = _ref2.ROOT_BASE,
      ROOT_BASE = _ref2$ROOT_BASE === void 0 ? 'https://showmetest-2011.elelive.cn' : _ref2$ROOT_BASE,
      _ref2$secondsParam = _ref2.secondsParam,
      secondsParam = _ref2$secondsParam === void 0 ? 0 : _ref2$secondsParam,
      _ref2$timeFormat = _ref2.timeFormat,
      timeFormat = _ref2$timeFormat === void 0 ? 'hh:mm:ss' : _ref2$timeFormat,
      onHandCountDownEvent = _ref2.onHandCountDownEvent,
      _ref2$fixedTime = _ref2.fixedTime,
      fixedTime = _ref2$fixedTime === void 0 ? 0 : _ref2$fixedTime,
      onFixedTimeCountDownEvent = _ref2.onFixedTimeCountDownEvent;

  //倒计时毫秒
  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      seconds = _useState2[0],
      setSeconds = _useState2[1]; //web worker


  var workerRef = useRef(null); //服务器时间和客户端时间的间隔

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      gapTime = _useState4[0],
      setGapTime = _useState4[1];

  useEffect(function () {
    var fixedTimeEndStatus = true;
    workerRef.current = runWorker(work);

    workerRef.current.onmessage = function (_ref3) {
      var data = _ref3.data;
      setSeconds(data);

      if (data <= fixedTime && fixedTimeEndStatus) {
        fixedTimeEndStatus = false;
        onFixedTimeCountDownEvent && onFixedTimeCountDownEvent();
      }

      if (data <= 0) {
        fixedTimeEndStatus = true;
        onHandCountDownEvent && onHandCountDownEvent();
      }
    };

    workerRef.current.onerror = function (err) {
      console.log(err);
    };

    return function () {
      workerRef.current.terminate();
    };
  }, []);
  useEffect(function () {
    if (endTime && endTime > 0 && !gapTime) {
      //设置间隔时间
      getGapTime();
    }

    workerRef.current.postMessage({
      endTime: endTime,
      gapTime: gapTime
    });
  }, [endTime, gapTime]);
  useEffect(function () {
    if (secondsParam) {
      // setSeconds(secondsParam);
      workerRef.current.postMessage({
        seconds: secondsParam
      });
    }
  }, [secondsParam]);

  var getGapTime = function getGapTime() {
    var now = Date.now(); // 接口请求之前的时间
    //传入当前时间，不需要去请求服务端时间

    if (eventTime) {
      setGapTime(eventTime - Date.now());
      return;
    }

    axios.request({
      method: 'get',
      url: ROOT_BASE + '/system-service/sysinfo/now'
    }).then(function (res) {
      var _res$data;

      var serverTime = Number((res === null || res === void 0 ? void 0 : res.timestamp) || (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.timestamp)) * 1000;
      var httpTime = Date.now() - now;
      setGapTime(serverTime + httpTime - Date.now());
    }).catch(function (err) {
      console.error(err);
    });
  };

  function secondsToTime(secs) {
    var timeFormatMap = {
      ss: function ss() {
        return "".concat(Math.floor(secs / 1000));
      },
      DD: function DD() {
        var days = Math.floor(secs / 1000 / 60 / 60 / 24);
        return /*#__PURE__*/React.createElement("span", null, days);
      },
      hh: function hh() {
        var days = Math.floor(secs / 1000 / 60 / 60 / 24);
        var H = moment.duration(secs, 'ms').hours();
        var hours = padStart((H + days * 24).toString(), 2, '0');
        return /*#__PURE__*/React.createElement("span", null, hours);
      },
      mm: function mm() {
        var days = Math.floor(secs / 1000 / 60 / 60 / 24);
        var H = moment.duration(secs, 'ms').hours();
        var M = moment.duration(secs, 'ms').minutes();
        return /*#__PURE__*/React.createElement("span", null, padStart(((H + days * 24) * 60 + M).toString(), 2, '0'));
      },
      'mm:ss': function mmSs() {
        var S = moment.duration(secs, 'ms').seconds();
        var M = moment.duration(secs, 'ms').minutes();
        var ss = padStart(S.toString(), 2, '0');
        var mines = padStart(M.toString(), 2, '0');
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, mines), ":", /*#__PURE__*/React.createElement("span", null, ss));
      },
      'hh:mm:ss': function hhMmSs() {
        var H = moment.duration(secs, 'ms').hours();
        var days = Math.floor(secs / 1000 / 60 / 60 / 24);
        var M = moment.duration(secs, 'ms').minutes();
        var hours = padStart((H + days * 24).toString(), 2, '0');
        var S = moment.duration(secs, 'ms').seconds();
        var ss = padStart(S.toString(), 2, '0');
        var mines = padStart(M.toString(), 2, '0');
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, hours), ":", /*#__PURE__*/React.createElement("span", null, mines), ":", /*#__PURE__*/React.createElement("span", null, ss));
      }
    }; // 当都处理secs < 0

    if (secs < 0) {
      secs = 0;
    }

    return timeFormatMap[timeFormat]();
  }

  return secondsToTime(seconds);
};

export default CountDown;