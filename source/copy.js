import * as _util from './utility';



/**
 * Returns a copy of obj
 * @param {Object} obj
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */
export default function copy(obj) {
	if (!(obj instanceof Object)) throw new TypeError(_util.ERRNOOBJ);

	const arr = Array.isArray(obj);
	const res = arr ? [] : {};
	const props = Object.getOwnPropertyNames(obj);

	if (arr) _util.filterArrayProps(props);

	if (props.length === 0) return res;

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const desc = Object.getOwnPropertyDescriptor(obj, prop);

		if ('value' in desc && _util.isIntersectable(prop, desc)) desc.value = copy(desc.value);

		Object.defineProperty(res, prop, desc);
	}

	return res;
}