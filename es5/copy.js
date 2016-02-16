'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = copy;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utility = require('./utility');

var _util = _interopRequireWildcard(_utility);

/**
 * Returns a copy of obj
 * @param {Object} obj
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */

function copy(obj) {
	if (!(obj instanceof Object)) throw new TypeError(_util.ERRNOOBJ);

	var arr = Array.isArray(obj);
	var res = arr ? [] : {};
	var props = Object.getOwnPropertyNames(obj);

	if (arr) _util.filterArrayProps(props);

	if (props.length === 0) return res;

	for (var i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		var desc = Object.getOwnPropertyDescriptor(obj, prop);

		if ('value' in desc && _util.isIntersectable(prop, desc)) desc.value = copy(desc.value);

		Object.defineProperty(res, prop, desc);
	}

	return res;
}

module.exports = exports['default'];