'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = union;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utility = require('./utility');

var _util = _interopRequireWildcard(_utility);

var _copy2 = require('./copy');

var _copy3 = _interopRequireDefault(_copy2);

/**
 * Returns the right-to-left union objects
 * @param {Object[]} objects - The operands
 * @returns {Object}
 * @throws {TypeError} if called without arguments
 * @throws {TypeError} if any item within objects is not an object
 */

function union(objects) {
	if (objects.length === 0) throw new TypeError(_util.ERRNOARGS);

	if (objects.length === 1) return (0, _copy3['default'])(objects[0]);

	var arr = Array.isArray(objects[0]);
	var res = arr ? [] : {};

	for (var i = objects.length - 1, obj = objects[i]; i > -1; obj = objects[--i]) {
		if (!(obj instanceof Object)) throw new TypeError(_util.ERRNOOBJ);

		if (Array.isArray(obj) !== arr) continue;

		var props = Object.getOwnPropertyNames(obj);

		if (Array.isArray(obj)) _util.filterArrayProps(props);

		if (props.length === 0) continue;

		for (var j = 0, prop = props[0]; prop !== undefined; prop = props[++j]) {
			var desc = Object.getOwnPropertyDescriptor(obj, prop);

			if ('value' in desc) {
				var val = desc.value;

				if (_util.isIntersectable(prop, desc)) {
					if (res[prop] instanceof Object) desc.value = union([val, res[prop]]);else desc.value = (0, _copy3['default'])(val);
				}
			}

			Object.defineProperty(res, prop, desc);
		}
	}

	return res;
}

module.exports = exports['default'];