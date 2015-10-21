import _union from './union';
import _intersection from './intersection';
import _difference from './difference';
import _copy from './copy';



const _ERRNOARGS = "not enough arguments";
const _ERRNOOBJ  = "not an object";

const _restrict = [
	'constructor',
	'prototype'
];

const _omitArray = [
	'length'
];


/**
 * Validates that all items are objects
 * @param {Object[]} objects
 * @throws {TypeError} if objects.length === 0
 * @throws {TypeError} if any objects[n] is not an Object
 * @private
 */
function _validateObjArgs(objects) {
	const len = objects.length;

	if (len === 0) throw new TypeError(_ERRNOARGS);

	for (let i = len - 1; i > -1; i -= 1) {
		if (!(objects[i] instanceof Object)) throw new TypeError(_ERRNOOBJ);
	}
}

/**
 * Returns true if desc is intersectable, false otherwise
 * @param {String} name
 * @param {Object} desc
 * @returns {Boolean}
 * @private
 */
function _isIntersectable(name, desc) {
	if (!('value' in desc)) return false;

	const val = desc.value;

	return (val instanceof Object) && typeof val !== 'function' && _restrict.indexOf(name) === -1;
}


/**
 * Returns filtered by omittable array properties of props
 * @param {Array} props
 * @private
 */
function _filterArrayProps(props) {
	for (let i = 0, prop = _omitArray[0]; prop !== undefined; prop = _omitArray[++i]) {
		const index = props.indexOf(prop);

		if (index !== -1) props.splice(index, 1);
	}
}


export const copy = _copy;

/**
 * Returns a copy of JSON compatible obj
 * @param {Object} obj - The object
 * @returns {Object}
 */
export function copyJSON(obj) {
	if (!(obj instanceof Object)) throw new TypeError(_ERRNOOBJ);

	return JSON.parse(JSON.stringify(obj));
}


/**
 * Returns the right-to-left union of all arguments
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function union(...objects) {
	return _union(objects);
}

/**
 * DEPRECTATED - Returns the right-to-left intersection of all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function intersection(...objects) {
	return _intersection(objects, false);
}

/**
 * Returns the right-to-left intersection of all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function intersectionByKey(...objects) {
	return _intersection(objects, false);
}

/**
 * Returns the right-to-left intersection of all arguments based on property keys and values
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function intersectionByValue(...objects) {
	return _intersection(objects, true);
}

/**
 * DEPRECATED - Returns right-to-left difference between all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function difference(...objects) {
	return _difference(objects, false);
}

/**
 * Returns the right-to-left difference between all arguments based on property keys
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function differenceByKey(...objects) {
	return _difference(objects, false);
}

/**
 * Returns the right-to-left difference between all arguments based on property keys and values
 * @param {...Object} objects - The operands
 * @returns {Object}
 */
export function differenceByValue(...objects) {
	return _difference(objects, true);
}