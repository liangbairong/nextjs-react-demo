import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { padStart } from 'lodash';

var CountDown4 = function CountDown4(_ref) {
  var endTime = _ref.endTime,
      eventTime = _ref.eventTime,
      _ref$ROOT_BASE = _ref.ROOT_BASE,
      ROOT_BASE = _ref$ROOT_BASE === void 0 ? 'https://showmetest-2011.elelive.cn' : _ref$ROOT_BASE,
      timeFormat = _ref.timeFormat,
      onHandCountDownEvent = _ref.onHandCountDownEvent,
      onFormatCountDownEvent = _ref.onFormatCountDownEvent;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      seconds = _useState2[0],
      setSeconds = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      format = _useState4[0],
      setTimeFormat = _useState4[1]; //倒计时毫秒


  var secondsRef = useRef(seconds);
  var endTimeRef = useRef(endTime); //服务器时间和客户端时间的间隔

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      gap = _useState6[0],
      setGap = _useState6[1];

  var gapRef = useRef(gap);

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      curTime = _useState8[0],
      setCurTime = _useState8[1];

  useEffect(function () {
    secondsRef.current = seconds;
    endTimeRef.current = endTime;
    gapRef.current = gap;
  });
  useEffect(function () {
    // let updateTimer: any = null;
    // if (!secondsParam) {
    //   updateTimer = setInterval(init, 1000 * 60 * 0.5);
    // }
    timeFormat && setTimeFormat(timeFormat);
    eventTime && setCurTime(curTime); // let timeout = 1000;
    // let sTime = Date.now();
    //
    // function outFn() {
    //   let val = secondsRef.current;
    //   const eTime = Date.now();
    //   timeout = timeout - (eTime - sTime - 1000);
    //   sTime = eTime;
    //   console.log('-----');
    //   console.log(val);
    //   if (val > 0) {
    //     val = val - 1000;
    //     setSeconds(val);
    //     setTimeout(outFn, timeout);
    //   } else {
    //     console.log(val);
    //     clearInterval(updateTimer);
    //     onHandCountDownEvent && onHandCountDownEvent({});
    //   }
    // }
    //
    // console.log('倒计时初始化');
    // setTimeout(outFn, timeout);

    function main() {
      var et = endTimeRef.current;
      var tGap = gapRef.current;

      if (tGap && et) {
        var val = et - (Date.now() + tGap);

        if (val > 0) {
          setSeconds(val);
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
      switch (format) {
        case 'D':
          return 0;

        case 'H':
          return 0;

        case 'M':
          return 0;

        case 'ss':
          return 0;

        default:
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "00"));
      }
    } // 格式化：ss


    if (format === 'ss') {
      console.log(Math.round(secs / 1000));
      return "".concat(Math.round(secs / 1000));
    }

    var days = Math.floor(secs / 1000 / 60 / 60 / 24); // 格式化：D

    if (format === 'D') {
      if (days <= 0) {
        setTimeFormat('H');
        onFormatCountDownEvent && onFormatCountDownEvent('H');
      }

      return /*#__PURE__*/React.createElement("span", null, days);
    }

    var H = moment.duration(secs, 'ms').hours();
    var hours = padStart((H + days * 24).toString(), 2, '0'); // 格式化: H

    if (format === 'H') {
      if (H + days * 24 <= 0) {
        setTimeFormat('M');
        onFormatCountDownEvent && onFormatCountDownEvent('M');
      }

      return /*#__PURE__*/React.createElement("span", null, H + days * 24);
    }

    var M = moment.duration(secs, 'ms').minutes();
    var mins = padStart(M.toString(), 2, '0'); // 格式化：M

    if (format === 'M') {
      if ((H + days * 24) * 60 + M <= 0) {
        setTimeFormat('ss');
        onFormatCountDownEvent && onFormatCountDownEvent('ss');
      }

      return /*#__PURE__*/React.createElement("span", null, (H + days * 24) * 60 + M);
    }

    var S = moment.duration(secs, 'ms').seconds();
    var ss = padStart(S.toString(), 2, '0'); // 格式化：mm:ss

    if (format === 'mm:ss') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, mins), ":", /*#__PURE__*/React.createElement("span", null, ss));
    } // 格式化: hh:mm:ss


    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, hours), ":", /*#__PURE__*/React.createElement("span", null, mins), ":", /*#__PURE__*/React.createElement("span", null, ss));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(React.Fragment, null, typeof seconds === 'number' && secondsToTime(seconds)));
};

export default CountDown4;