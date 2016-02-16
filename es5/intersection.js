'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = intersection;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utility = require('./utility');

var _util = _interopRequireWildcard(_utility);

var _copy2 = require('./copy');

var _copy3 = _interopRequireDefault(_copy2);

/**
 * Returns the right-to-left intersection between objects
 * @param {Object[]} objects - The operands
 * @returns {Object}
 * @throws {TypeError} if byValue is not a boolean
 */

function intersection(objects) {
	var byValue = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	if (typeof byValue !== 'boolean') throw new TypeError();

	_util.validateObjArgs(objects);

	var num = objects.length;

	if (num === 1) return (0, _copy3['default'])(objects[0]);

	var maj = objects[0];
	var res = Array.isArray(maj) ? [] : {};
	var props = Object.getOwnPropertyNames(maj);

	for (var i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		var children = [];
		var majDesc = Object.getOwnPropertyDescriptor(maj, prop);
		var majIsDeep = _util.isIntersectable(prop, majDesc);

		if (majIsDeep) children.push(majDesc.value);

		{
			var j = 1,
			    min = objects[1],
			    minIsDeep = true;

			for (; min !== undefined; min = objects[++j]) {
				if (!min.hasOwnProperty(prop)) break;

				var minDesc = Object.getOwnPropertyDescriptor(min, prop);

				if (byValue && !_util.isDescEqual(majDesc, minDesc)) break;else if (!minIsDeep) continue;

				if (_util.isIntersectable(prop, minDesc)) children.push(minDesc.value);else minIsDeep = false;
			}

			if (j !== num) continue;
		}

		if (majIsDeep) {
			if (children.length == num) majDesc.value = intersection(children, byValue);else majDesc.value = Array.isArray(majDesc.value) ? [] : {};
		}

		Object.defineProperty(res, prop, majDesc);
	}

	return res;
}

module.exports = exports['default'];