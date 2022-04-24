//判断是否支持webp
var supportsWebp = function supportsWebp(_ref) {
  var createImageBitmap = _ref.createImageBitmap,
      Image = _ref.Image;
  if (!createImageBitmap || !Image) return Promise.resolve(false);
  return new Promise(function (resolve) {
    var tWebp = window.localStorage.getItem('webp');

    if (!tWebp) {
      var image = new Image();

      image.onload = function () {
        createImageBitmap(image).then(function () {
          resolve(true);
          window.localStorage.setItem('webp', '1');
        }).catch(function () {
          resolve(false);
          window.localStorage.setItem('webp', '0');
        });
      };

      image.onerror = function () {
        resolve(false);
      };

      image.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    } else {
      if (tWebp == 1) {
        resolve(true);
      } else {
        resolve(false);
      }
    }
  });
};

export default {
  supportsWebp: supportsWebp
};