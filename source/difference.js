import * as _util from './utility';
import _copy from './copy';



/**
 * Returns the right-to-left difference between objects
 * @param {Object[]} objects - The operands
 * @param {Boolean} byValue - True if differences in value are considered, false otherwise
 * @returns {Object}
 * @throws {TypeError} if byValue is not a boolean
 */
export default function difference(objects, byValue = false) {
	if (typeof byValue !== 'boolean') throw new TypeError();

	_util.validateObjArgs(objects);

	const base = objects[0];
	const res = Array.isArray(base) ? [] : {};

	if (objects.length === 1) return res;

	const props = Object.getOwnPropertyNames(base);

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const desc = Object.getOwnPropertyDescriptor(base, prop);
		const deep = _util.isIntersectable(prop, desc), items = [];

		for (let j = objects.length - 1, obj = objects[j]; j > 0; obj = objects[--j]) {
			if (!obj.hasOwnProperty(prop)) {
				items.splice(0, items.length);

				continue;
			}

			const odesc = Object.getOwnPropertyDescriptor(obj, prop);

			if (_util.isIntersectable(prop, odesc) !== deep) {
				items.splice(0, items.length);

				continue;
			}
			else if (!deep && byValue && odesc.value !== desc.value) {
				items.splice(0, items.length);

				continue;
			}
			else items.unshift(odesc.value);
		}

		if (deep) {
			if (items.length === 0) desc.value = _copy(desc.value);
			else {
				items.unshift(desc.value);

				const ret = difference(items, byValue);

				if (Object.keys(ret).length === 0) continue;

				desc.value = ret;
			}
		}
		else if ((items.length + 1) % 2 === 0) continue;

		Object.defineProperty(res, prop, desc);
	}

	return res;
}
