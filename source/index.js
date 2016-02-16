import * as _util from './utility';

import _union from './union';
import _intersection from './intersection';
import _difference from './difference';
import _copy from './copy';
import _freeze from './freeze';



export const copy = _copy;


/**
 * Returns a frozen copy of obj
 * @param {Object} obj - The source object
 * @returns {Object}
 */
export function freezeCopy(obj) {
	return _freeze(obj, false);
}


/**
 * Returns a copy of JSON compatible obj
 * @param {Object} obj - The object
 * @returns {Object}
 */
export function copyJSON(obj) {
	if (!(obj instanceof Object)) throw new TypeError(_util.ERRNOOBJ);

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
