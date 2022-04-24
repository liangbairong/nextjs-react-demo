import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

var ToastElement = function ToastElement(_ref) {
  var content = _ref.content;
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-content"
  }, content);
};

var Toast = /*#__PURE__*/function () {
  function Toast() {
    _classCallCheck(this, Toast);

    this.vm = [];
    this.props = {};
  }

  _createClass(Toast, [{
    key: "open",
    value: function open(params) {
      var _this = this;

      this.props = params || {};
      this.render( /*#__PURE__*/React.createElement(ToastElement, {
        content: this.props.content
      }));
      setTimeout(function () {
        _this.close();
      }, this.props.time || 1000);
    }
  }, {
    key: "close",
    value: function close() {
      if (this.vm.length > 0) {
        ReactDOM.unmountComponentAtNode(this.vm[0]);
        document.body.removeChild(this.vm[0]);
        this.vm.shift();
      }
    }
  }, {
    key: "render",
    value: function render(element) {
      var div = document.createElement('div');
      div.className = 'toast';
      this.vm.push(div);
      document.body.appendChild(div);
      ReactDOM.render(element, div);
    }
  }]);

  return Toast;
}();

export default new Toast();