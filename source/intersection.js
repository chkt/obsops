import * as _util from './utility';
import _copy from './copy';



/**
 * Returns the right-to-left intersection between objects
 * @param {Object[]} objects - The operands
 * @returns {Object}
 * @throws {TypeError} if byValue is not a boolean
 */
export default function intersection(objects, byValue = false) {
	if (typeof byValue !== 'boolean') throw new TypeError();

	_util.validateObjArgs(objects);

	const num = objects.length;

	if (num === 1) return _copy(objects[0]);

	const maj = objects[0];
	const res = Array.isArray(maj) ? [] : {};
	const props = Object.getOwnPropertyNames(maj);

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const children = [];
		const majDesc = Object.getOwnPropertyDescriptor(maj, prop);
		const majIsDeep = _util.isIntersectable(prop, majDesc);

		if (majIsDeep) children.push(majDesc.value);

		{
			let j = 1, min = objects[1], minIsDeep = true;

			for (; min !== undefined; min = objects[++j]) {
				if (!min.hasOwnProperty(prop)) break;

				const minDesc = Object.getOwnPropertyDescriptor(min, prop);

				if (byValue && !_util.isDescEqual(majDesc, minDesc)) break;
				else if (!minIsDeep) continue;

				if (_util.isIntersectable(prop, minDesc)) children.push(minDesc.value);
				else minIsDeep = false;
			}

			if (j !== num) continue;
		}

		if (majIsDeep) {
			if (children.length == num) majDesc.value = intersection(children, byValue);
			else majDesc.value = Array.isArray(majDesc.value) ? [] : {};
		}

		Object.defineProperty(res, prop, majDesc);
	}

	return res;
}