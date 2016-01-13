'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLEAN = CLEAN;

var _ISBLANK = require('./ISBLANK');

function CLEAN(obj) {
  return Object.keys(obj).reduce(function (a, b) {
    return (0, _ISBLANK.ISBLANK)(obj[b]) ? a : a.concat(b);
  }, []).reduce(function (a, b) {
    a[b] = obj[b];return a;
  }, {});
} // Take an object with falsy values and return a clean object with no falsy values