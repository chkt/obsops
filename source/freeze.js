import * as _util from './utility';



/**
 * Returns a deep frozen representation of obj
 * @param {Object} obj
 * @param {Boolean} [inherit=false] - true if the frozen object is expected to be a descendant of obj, false otherwise
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */
export default function freeze(obj, inherit = false) {
	if (
		typeof obj !== 'object' || obj === null ||
		typeof inherit !== 'boolean'
	) throw new TypeError(_util.ERRNOOBJ);

	const arr = Array.isArray(obj);
	let res;

	if (inherit) res = Object.create(obj);
	else res = arr ? [] : {};

	const props = Object.getOwnPropertyNames(obj);

	if (arr) _util.filterArrayProps(props);

	if (props.length === 0) return Object.freeze(res);

	const spec = {};

	for (let prop of props) {
		const desc = Object.getOwnPropertyDescriptor(obj, prop);

		if ('set' in desc) {
			delete desc['set'];

			spec[prop] = desc;
		}

		if ('get' in desc && !inherit) {
			const val = obj[prop];

			delete desc['get'];

			desc.value = val;

			spec[prop] = desc;
		}

		if ('value' in desc && desc.value instanceof Object) {
			desc.value = freeze(desc.value, inherit);

			spec[prop] = desc;
		}

		if (!inherit) spec[prop] = desc;
	}

	return Object.freeze(Object.defineProperties(res, spec));
}
