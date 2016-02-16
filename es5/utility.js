"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.validateObjArgs = validateObjArgs;
exports.isIntersectable = isIntersectable;
exports.isDescEqual = isDescEqual;
exports.filterArrayProps = filterArrayProps;
var ERRNOARGS = "not enough arguments";
exports.ERRNOARGS = ERRNOARGS;
var ERRNOOBJ = "not an object";

exports.ERRNOOBJ = ERRNOOBJ;
var _restrict = Object.freeze(['constructor', 'prototype']);

var _omitArray = Object.freeze(['length']);

/**
 * Validates that all items are objects
 * @param {Object[]} objects
 * @throws {TypeError} if objects.length === 0
 * @throws {TypeError} if any objects[n] is not an Object
 * @private
 */

function validateObjArgs(objects) {
	var len = objects.length;

	if (len === 0) throw new TypeError(ERRNOARGS);

	for (var i = len - 1; i > -1; i -= 1) {
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

function isIntersectable(name, desc) {
	if (!('value' in desc)) return false;

	var val = desc.value;

	return val instanceof Object && typeof val !== 'function' && _restrict.indexOf(name) === -1;
}

/**
 * Returns true if both property descriptors are equal or nested objects of the same type, false otherwise
 * @param {Object} a - The protagonist
 * @param {Object} b - The antagonist
 * @returns {Boolean}
 */

function isDescEqual(a, b) {
	if (a.configurable !== b.configurable || a.enumerable !== b.enumerable) return false;

	if (!('value' in a)) return a.get === b.get && a.set === b.set;

	if (!('value' in b) || a.writable !== b.writable) return false;

	var aval = a.value,
	    adeep = typeof aval === 'object' && aval !== null;
	var bval = b.value,
	    bdeep = typeof bval === 'object' && bval !== null;

	if (!adeep) return !bdeep && aval === bval;else if (!bdeep) return false;

	return Array.isArray(aval) === Array.isArray(bval);
}

/**
 * Returns filtered by omittable array properties of props
 * @param {Array} props
 * @private
 */

function filterArrayProps(props) {
	for (var i = 0, prop = _omitArray[0]; prop !== undefined; prop = _omitArray[++i]) {
		var index = props.indexOf(prop);

		if (index !== -1) props.splice(index, 1);
	}
}