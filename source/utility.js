export const ERRNOARGS = "not enough arguments";
export const ERRNOOBJ  = "not an object";


const _restrict = Object.freeze([
	'constructor',
	'prototype'
]);

const _omitArray = Object.freeze([
	'length'
]);



/**
 * Validates that all items are objects
 * @param {Object[]} objects
 * @throws {TypeError} if objects.length === 0
 * @throws {TypeError} if any objects[n] is not an Object
 * @private
 */
export function validateObjArgs(objects) {
	const len = objects.length;

	if (len === 0) throw new TypeError(ERRNOARGS);

	for (let i = len - 1; i > -1; i -= 1) {
		if (!(objects[i] instanceof Object)) throw new TypeError(ERRNOOBJ);
	}
}


/**
 * Returns true if desc is intersectable, false otherwise
 * @param {String} name
 * @param {Object} desc
 * @returns {Boolean}
 * @private
 */
export function isIntersectable(name, desc) {
	if (!('value' in desc)) return false;

	const val = desc.value;

	return (val instanceof Object) && typeof val !== 'function' && _restrict.indexOf(name) === -1;
}


/**
 * Returns true if both property descriptors are equal or nested objects of the same type, false otherwise
 * @param {Object} a - The protagonist
 * @param {Object} b - The antagonist
 * @returns {Boolean}
 */
export function isDescEqual(a, b) {
	if (a.configurable !== b.configurable || a.enumerable !== b.enumerable) return false;

	if (!('value' in a)) return a.get === b.get && a.set === b.set;

	if (!('value' in b) || a.writable !== b.writable) return false;

	const aval = a.value, adeep = typeof aval === 'object' && aval !== null;
	const bval = b.value, bdeep = typeof bval === 'object' && bval !== null;

	if (!adeep) return !bdeep && aval === bval;
	else if (!bdeep) return false;

	return Array.isArray(aval) === Array.isArray(bval);
}


/**
 * Returns filtered by omittable array properties of props
 * @param {Array} props
 * @private
 */
export function filterArrayProps(props) {
	for (let i = 0, prop = _omitArray[0]; prop !== undefined; prop = _omitArray[++i]) {
		const index = props.indexOf(prop);

		if (index !== -1) props.splice(index, 1);
	}
}