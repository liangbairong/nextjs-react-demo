/* 节流函数 */
// export const throttle = (fn, delay) => {
//   let timer;
//   return function () {
//     let _this = this;
//     let args = arguments;
//     if (timer) {
//       return;
//     }
//     timer = setTimeout(function () {
//       fn.apply(_this, args);
//       timer = null;
//     }, delay)
//   }
// }

/* 防抖函数 */
export var debounce = function debounce(fn, delay) {
  var timer = null;
  return function () {
    var _this = this;

    var args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
};