"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.number = exports.email = exports["default"] = void 0;
var email = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
exports.email = email;
var number = /^\d+\.?\d*$/;
exports.number = number;
var Validation = {
  email: email,
  number: number
};
var _default = Validation;
exports["default"] = _default;