import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { padStart } from 'lodash';

var CountDown3 = function CountDown3(_ref) {
  var endTime = _ref.endTime,
      eventTime = _ref.eventTime,
      _ref$ROOT_BASE = _ref.ROOT_BASE,
      ROOT_BASE = _ref$ROOT_BASE === void 0 ? 'https://showmetest-2011.elelive.cn' : _ref$ROOT_BASE,
      _ref$secondsParam = _ref.secondsParam,
      secondsParam = _ref$secondsParam === void 0 ? 0 : _ref$secondsParam,
      timeFormat = _ref.timeFormat,
      onHandCountDownEvent = _ref.onHandCountDownEvent,
      _ref$fixedTime = _ref.fixedTime,
      fixedTime = _ref$fixedTime === void 0 ? 0 : _ref$fixedTime,
      onFixedTimeCountDownEvent = _ref.onFixedTimeCountDownEvent;

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      seconds = _useState2[0],
      setSeconds = _useState2[1]; //倒计时毫秒


  var secondsRef = useRef(seconds);
  var endTimeRef = useRef(endTime);
  var fixedTimeRef = useRef(fixedTime); //服务器时间和客户端时间的间隔

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      gap = _useState4[0],
      setGap = _useState4[1];

  var gapRef = useRef(gap);

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      curTime = _useState6[0],
      setCurTime = _useState6[1];

  useEffect(function () {
    secondsRef.current = seconds;
    endTimeRef.current = endTime;
    fixedTimeRef.current = fixedTime;
    gapRef.current = gap;
  });
  useEffect(function () {
    if (eventTime) {
      setCurTime(curTime);
    }

    var fixedTimeEndStatus = false;

    function main() {
      var et = endTimeRef.current;
      var tGap = gapRef.current;
      var ft = fixedTimeRef.current;

      if (tGap && et) {
        var val = et - (Date.now() + tGap);

        if (val > 0 && val <= ft && !fixedTimeEndStatus) {
          fixedTimeEndStatus = true; //固定倒计时已结束,触发一次,不在触发

          onFixedTimeCountDownEvent && onFixedTimeCountDownEvent({});
        }

        if (val > 0) {
          setSeconds(val);
        } else {
          clearInterval(timer);
          onHandCountDownEvent && onHandCountDownEvent({});
        }
      }

      if (secondsParam) {
        var _val = secondsRef.current;

        if (_val > 0 && _val <= ft && !fixedTimeEndStatus) {
          fixedTimeEndStatus = true; //固定倒计时已结束,触发一次,不在触发

          onFixedTimeCountDownEvent && onFixedTimeCountDownEvent({});
        }

        if (_val > 0) {
          _val = _val - 1000;
          setSeconds(_val);
        } else {
          clearInterval(timer);
          onHandCountDownEvent && onHandCountDownEvent({});
        }
      }
    } // main()


    var timer = setInterval(main, 1000);
    return function () {
      // clearInterval(updateTimer);
      clearInterval(timer);
    };
  }, []);
  useEffect(function () {
    if (!gap) {
      init();
    }
  }, [endTime]);
  useEffect(function () {
    if (secondsParam) {
      setSeconds(secondsParam);
    }
  }, [secondsParam]);

  var init = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var startTime, sec;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('校准');

              if (!(endTime && endTime > 0)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return getStartTime();

            case 4:
              startTime = _context.sent;
              // // @ts-ignore
              sec = endTime - startTime;
              setSeconds(sec);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function init() {
      return _ref2.apply(this, arguments);
    };
  }();

  var getStartTime = function getStartTime() {
    var now = Date.now(); // 接口请求之前的时间

    return new Promise(function (resolve) {
      if (gap) {
        resolve(Date.now() + gap);
      } else {
        //第一次取 传入的当前时间，然后5分钟校准一次
        if (eventTime) {
          var tp = curTime || eventTime;
          var tGap = tp - Date.now();
          setGap(tGap);
          resolve(Date.now() + tGap);
          return;
        }

        var httpTime = Date.now() - now;
        axios.request({
          method: 'get',
          url: ROOT_BASE + '/system-service/sysinfo/now'
        }).then(function (res) {
          var _res$data;

          var temps = (res === null || res === void 0 ? void 0 : res.timestamp) || (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.timestamp);

          if (temps) {
            temps = temps * 1000;
          }

          var tGap = temps + httpTime - Date.now();
          setGap(tGap);
          resolve(Date.now() + tGap);
        }).catch(function (err) {
          console.error(err);
          resolve(Date.now() + httpTime);
        });
      }
    });
  };

  function secondsToTime(secs) {
    // 当都处理secs < 0
    if (secs < 0) {
      switch (timeFormat) {
        case 'DD':
          return 0;

        case 'hh':
          return 0;

        case 'mm':
          return 0;

        case 'ss':
          return 0;

        case 'mm:ss':
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "00"), ":", /*#__PURE__*/React.createElement("span", null, "00"));

        case 'hh:mm':
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "00"), ":", /*#__PURE__*/React.createElement("span", null, "00"));

        default:
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "00"), ":", /*#__PURE__*/React.createElement("span", null, "00"), ":", /*#__PURE__*/React.createElement("span", null, "00"));
      }
    } // 格式化：ss


    if (timeFormat === 'ss') {
      return "".concat(Math.floor(secs / 1000));
    }

    var days = Math.floor(secs / 1000 / 60 / 60 / 24); // 格式化：DD

    if (timeFormat === 'DD') {
      return /*#__PURE__*/React.createElement("span", null, days);
    }

    var H = moment.duration(secs, 'ms').hours();
    var hours = padStart((H + days * 24).toString(), 2, '0'); // 格式化: hh

    if (timeFormat === 'hh') {
      return /*#__PURE__*/React.createElement("span", null, hours);
    }

    var M = moment.duration(secs, 'ms').minutes();
    var mins = padStart(M.toString(), 2, '0'); // 格式化：mm

    if (timeFormat === 'mm') {
      return /*#__PURE__*/React.createElement("span", null, padStart(((H + days * 24) * 60 + M).toString(), 2, '0'));
    }

    var S = moment.duration(secs, 'ms').seconds();
    var ss = padStart(S.toString(), 2, '0'); // 格式化：mm:ss

    if (timeFormat === 'mm:ss') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, mins), ":", /*#__PURE__*/React.createElement("span", null, ss));
    } // 格式化: hh:mm:ss


    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, hours), ":", /*#__PURE__*/React.createElement("span", null, mins), ":", /*#__PURE__*/React.createElement("span", null, ss));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(React.Fragment, null, secondsToTime(seconds)));
};

export default CountDown3;