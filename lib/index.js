"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRegex = exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = require("react");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var defaultOptions = {
  text: {
    tw: true,
    en: false,
    number: false
  },
  tel: {
    country: 'TW'
  },
  email: {}
};
var defaultInitialState = {
  type: 'text',
  defaultValue: '',
  options: {}
};
var textPatterns = {
  text: {
    tw: "^[\u4E00-\u9FA5_\u3105-\u3129\u02CA\u02C7\u02CB\u02D9\u02C9]+$",
    number: '^[0-9]+$',
    en: '^[a-zA-Z]+$'
  },
  tel: {
    TW: /^09[0-9]{8}$/
  },
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
};
var useRegex = function useRegex(initialState) {
  var pattern = (0, _react.useRef)();
  var opt = _objectSpread(_objectSpread({}, defaultInitialState), initialState);
  var defaultValue = opt.defaultValue;
  var _useState = (0, _react.useState)([defaultValue, defaultValue]),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0, _react.useEffect)(function () {
    var type = opt.type,
      options = opt.options;
    if (type !== 'text' && type !== 'tel' && type !== 'email') {
      console.log("%c[useRegex:invaild type] Should be 'text', 'tel' or 'email'", 'color: #f60; font-size:12px;');
      return;
    }
    var setting = {};
    setting = _objectSpread(_objectSpread({}, defaultOptions[type]), options);
    switch (type) {
      case 'text':
        var text = textPatterns.text;
        pattern.current = Object.entries(setting).map(function (e) {
          var _e = (0, _slicedToArray2["default"])(e, 2),
            k = _e[0],
            v = _e[1];
          if (v) return text[k];
        }).filter(function (e) {
          return e;
        });
        break;
      case 'tel':
        var tel = textPatterns.tel;
        var _setting = setting,
          country = _setting.country;
        pattern.current = tel[country];
        break;
      case 'email':
        var email = textPatterns.email;
        pattern.current = email;
        break;
    }
  }, []);
  return [state, function (e) {
    var value = e.target.value;
    var type = opt.type;
    switch (type) {
      case 'text':
        var regex = new RegExp(pattern.current.join('|'), 'gi');
        var match = value.match(regex);
        if (match === null) {
          var _char = value.split('').filter(function (e) {
            if (e.match(regex) === null) return false;
            return true;
          });
          if (_char.length !== 0) {
            var _result = _char.reduce(function (a, c) {
              return a + c;
            });
            setState([_result, value]);
          } else {
            setState(['', value]);
          }
        }
        break;
      case 'tel':
        if (value.length === 1) {
          if (value !== '0') setState(['', value, false]);else setState([value, value, false]);
        } else if (value.length === 2) {
          if (value !== '09') setState(['0', value, false]);else setState([value, value, false]);
        } else if (value.length > 10) {
          var res = value.slice(0, 10);
          setState([res, value, pattern.current.test(res)]);
        } else {
          var r = /^[0-9]$/;
          var l = value.slice(-1);
          var b = r.test(l);
          if (!b) {
            setState([value.slice(0, -1), value, pattern.current.test(value)]);
          } else setState([value, value, pattern.current.test(value)]);
        }
        break;
      case 'email':
        var result = pattern.current.test(value);
        var _value$split = value.split('@'),
          _value$split2 = (0, _slicedToArray2["default"])(_value$split, 2),
          username = _value$split2[0],
          host = _value$split2[1];
        var hasAt = value.indexOf('@') > 0;
        var hasDot = (host === null || host === void 0 ? void 0 : host.split('.')[1]) !== undefined;
        var data = {
          user: '',
          host: '',
          local: ''
        };
        var reg = {
          user: /[A-Za-z0-9_\-\.]$/,
          host: /[A-Za-z0-9_\-\.]$/,
          local: /([A-Za-z])$/
        };
        if (username) {
          var _char2 = username.split('').filter(function (e) {
            return reg.user.test(e);
          });
          data.user = _char2.reduce(function (a, c) {
            return a + c;
          }, '');
        }
        if (host) {
          var _host$split = host.split('.'),
            _host$split2 = (0, _slicedToArray2["default"])(_host$split, 2),
            hostname = _host$split2[0],
            localname = _host$split2[1];
          if (hostname) {
            var _char3 = hostname.split('').filter(function (e) {
              return reg.host.test(e);
            });
            data.host = _char3.reduce(function (a, c) {
              return a + c;
            }, '');
          }
          if (localname) {
            var _char4 = localname.split('').filter(function (e) {
              return reg.local.test(e);
            });
            data.local = _char4.reduce(function (a, c, i) {
              if (i < 3) return a + c;else return a;
            }, '');
          }
        }
        var exValue = "".concat(data.user).concat(hasAt ? '@' : '').concat(data.host).concat(hasDot ? '.' : '').concat(data.local);
        setState([exValue, value, result]);
        break;
    }
  }];
};
exports.useRegex = useRegex;
var _default = useRegex;
exports["default"] = _default;