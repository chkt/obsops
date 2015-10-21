import * as _util from './utility';
import _copy from './copy';



/**
 * Returns the right-to-left union objects
 * @param {Object[]} objects - The operands
 * @returns {Object}
 * @throws {TypeError} if called without arguments
 * @throws {TypeError} if any item within objects is not an object
 */
export default function union(objects) {
	if (objects.length === 0) throw new TypeError(_util.ERRNOARGS);

	if (objects.length === 1) return _copy(objects[0]);

	const arr = Array.isArray(objects[0]);
	const res = arr ? [] : {};

	for (let i = objects.length - 1, obj = objects[i]; i > -1; obj = objects[--i]) {
		if (!(obj instanceof Object)) throw new TypeError(_util.ERRNOOBJ);

		if (Array.isArray(obj) !== arr) continue;

		const props = Object.getOwnPropertyNames(obj);

		if (Array.isArray(obj)) _util.filterArrayProps(props);

		if (props.length === 0) continue;

		for (let j = 0, prop = props[0]; prop !== undefined; prop = props[++j]) {
			const desc = Object.getOwnPropertyDescriptor(obj, prop);

			if ('value' in desc) {
				const val = desc.value;

				if (_util.isIntersectable(prop, desc)) {
					if (res[prop] instanceof Object) desc.value = union([val, res[prop]]);
					else desc.value = _copy(val);
				}
			}

			Object.defineProperty(res, prop, desc);
		}
	}

	return res;
}