'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.copyJSON = copyJSON;
exports.union = union;
exports.intersection = intersection;
exports.intersectionByKey = intersectionByKey;
exports.intersectionByValue = intersectionByValue;
exports.difference = difference;
exports.differenceByKey = differenceByKey;
exports.differenceByValue = differenceByValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _union2 = require('./union');

var _union3 = _interopRequireDefault(_union2);

var _intersection2 = require('./intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _difference2 = require('./difference');

var _difference3 = _interopRequireDefault(_difference2);

var _copy2 = require('./copy');

var _copy3 = _interopRequireDefault(_copy2);

var _ERRNOARGS = "not enough arguments";
var _ERRNOOBJ = "not an object";

var _restrict = ['constructor', 'prototype'];

var _omitArray = ['length'];

/**
 * Validates that all items are objects
 * @param {Object[]} objects
 * @throws {TypeError} if objects.length === 0
 * @throws {TypeError} if any objects[n] is not an Object
 * @private
 */
function _validateObjArgs(objects) {
  var len = objects.length;

  if (len === 0) throw new TypeError(_ERRNOARGS);

  for (var i = len - 1; i > -1; i -= 1) {
    if (!(objects[i] instanceof Object)) throw new TypeError(_ERRNOOBJ);
  }
}

/**
 * Returns true if desc is intersectable, false otherwise
 * @param {String} name
 * @param {Object} desc
 * @returns {Boolean}
 * @private
 */
function _isIntersectable(name, desc) {
  if (!('value' in desc)) return false;

  var val = desc.value;

  return val instanceof Object && typeof val !== 'function' && _restrict.indexOf(name) === -1;
}

/**
 * Returns filtered by omittable array properties of props
 * @param {Array} props
 * @private
 */
function _filterArrayProps(props) {
  for (var i = 0, prop = _omitArray[0]; prop !== undefined; prop = _omitArray[++i]) {
    var index = props.indexOf(prop);

    if (index !== -1) props.splice(index, 1);
  }
}

var copy = _copy3['default'];

exports.copy = copy;
/**
 * Returns a copy of JSON compatible obj
 * @param {Object} obj - The object
 * @returns {Object}
 */

function copyJSON(obj) {
  if (!(obj instanceof Object)) throw new TypeError(_ERRNOOBJ);

  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns the right-to-left union of all arguments
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function union() {
  for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  return (0, _union3['default'])(objects);
}

/**
 * DEPRECTATED - Returns the right-to-left intersection of all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function intersection() {
  for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objects[_key2] = arguments[_key2];
  }

  return (0, _intersection3['default'])(objects, false);
}

/**
 * Returns the right-to-left intersection of all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function intersectionByKey() {
  for (var _len3 = arguments.length, objects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    objects[_key3] = arguments[_key3];
  }

  return (0, _intersection3['default'])(objects, false);
}

/**
 * Returns the right-to-left intersection of all arguments based on property keys and values
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function intersectionByValue() {
  for (var _len4 = arguments.length, objects = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    objects[_key4] = arguments[_key4];
  }

  return (0, _intersection3['default'])(objects, true);
}

/**
 * DEPRECATED - Returns right-to-left difference between all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function difference() {
  for (var _len5 = arguments.length, objects = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    objects[_key5] = arguments[_key5];
  }

  return (0, _difference3['default'])(objects, false);
}

/**
 * Returns the right-to-left difference between all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function differenceByKey() {
  for (var _len6 = arguments.length, objects = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    objects[_key6] = arguments[_key6];
  }

  return (0, _difference3['default'])(objects, false);
}

/**
 * Returns the right-to-left difference between all arguments based on property keys and values
 * @param {...Object} objects - The operands
 * @returns {Object}
 */

function differenceByValue() {
  for (var _len7 = arguments.length, objects = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    objects[_key7] = arguments[_key7];
  }

  return (0, _difference3['default'])(objects, true);
}