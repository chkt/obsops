'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = difference;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utility = require('./utility');

var _util = _interopRequireWildcard(_utility);

var _copy2 = require('./copy');

var _copy3 = _interopRequireDefault(_copy2);

/**
 * Returns the right-to-left difference between objects
 * @param {Object[]} objects - The operands
 * @param {Boolean} byValue - True if differences in value are considered, false otherwise
 * @returns {Object}
 * @throws {TypeError} if byValue is not a boolean
 */

function difference(objects) {
	var byValue = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	if (typeof byValue !== 'boolean') throw new TypeError();

	_util.validateObjArgs(objects);

	var base = objects[0];
	var res = Array.isArray(base) ? [] : {};

	if (objects.length === 1) return res;

	var props = Object.getOwnPropertyNames(base);

	for (var i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		var desc = Object.getOwnPropertyDescriptor(base, prop);
		var deep = _util.isIntersectable(prop, desc),
		    items = [];

		for (var j = objects.length - 1, obj = objects[j]; j > 0; obj = objects[--j]) {
			if (!obj.hasOwnProperty(prop)) {
				items.splice(0, items.length);

				continue;
			}

			var odesc = Object.getOwnPropertyDescriptor(obj, prop);

			if (_util.isIntersectable(prop, odesc) !== deep) {
				items.splice(0, items.length);

				continue;
			} else if (!deep && byValue && odesc.value !== desc.value) {
				items.splice(0, items.length);

				continue;
			} else items.unshift(odesc.value);
		}

		if (deep) {
			if (items.length === 0) desc.value = (0, _copy3['default'])(desc.value);else {
				items.unshift(desc.value);

				var ret = difference(items, byValue);

				if (Object.keys(ret).length === 0) continue;

				desc.value = ret;
			}
		} else if ((items.length + 1) % 2 === 0) continue;

		Object.defineProperty(res, prop, desc);
	}

	return res;
}

module.exports = exports['default'];