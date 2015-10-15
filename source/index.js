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


/**
 * Returns a copy of obj
 * @param {Object} obj
 * @returns {Object}
 * @throws {TypeError} if obj is not an object
 */
export function copy(obj) {
	if (!(obj instanceof Object)) throw new TypeError(_ERRNOOBJ);

	const arr = Array.isArray(obj);
	const res = arr ? [] : {};
	const props = Object.getOwnPropertyNames(obj);

	if (arr) _filterArrayProps(props);

	if (props.length === 0) return res;

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const desc = Object.getOwnPropertyDescriptor(obj, prop);

		if ('value' in desc && _isIntersectable(prop, desc)) desc.value = copy(desc.value);

		Object.defineProperty(res, prop, desc);
	}

	return res;
}

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
 * @param {...Object} objects - The uniting objects
 * @returns {Object}
 * @throws {TypeError} if called without arguments
 * @throws {TypeError} if any argument is not an object
 */
export function union(...objects) {
	if (objects.length === 0) throw new TypeError(_ERRNOARGS);

	if (objects.length === 1) return copy(objects[0]);

	const arr = Array.isArray(objects[0]);
	const res = arr ? [] : {};

	for (let i = objects.length - 1, obj = objects[i]; i > -1; obj = objects[--i]) {
		if (!(obj instanceof Object)) throw new TypeError(_ERRNOOBJ);

		if (Array.isArray(obj) !== arr) continue;

		const props = Object.getOwnPropertyNames(obj);

		if (Array.isArray(obj)) _filterArrayProps(props);

		if (props.length === 0) continue;

		for (let j = 0, prop = props[0]; prop !== undefined; prop = props[++j]) {
			const desc = Object.getOwnPropertyDescriptor(obj, prop);

			if ('value' in desc) {
				const val = desc.value;

				if (_isIntersectable(prop, desc)) {
					if (res[prop] instanceof Object) desc.value = union(val, res[prop]);
					else desc.value = copy(val);
				}
			}

			Object.defineProperty(res, prop, desc);
		}
	}

	return res;
}

/**
 * Returns the right-to-left intersection between all arguments
 * @param {...Object} objects - The intersecting objects
 * @returns {Object}
 */
export function intersection(...objects) {
	_validateObjArgs(objects);

	if (objects.length === 1) return copy(objects[0]);

	const maj = objects[0];
	const res = Array.isArray(maj) ? [] : {};
	const props = Object.getOwnPropertyNames(maj);

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const desc = Object.getOwnPropertyDescriptor(maj, prop);

		const deep = _isIntersectable(prop, desc), items = [];
		let odeep = true;

		if (deep) items.push(desc.value);

		{
			let j = 1, obj = objects[1];

			for (; obj !== undefined; obj = objects[++j]) {
				if (!obj.hasOwnProperty(prop)) break;

				if (!odeep) continue;

				const odesc = Object.getOwnPropertyDescriptor(obj, prop);

				if (_isIntersectable(prop, odesc)) items.push(odesc.value);
				else odeep = false;
			}

			if (j !== objects.length) continue;
		}

		if (deep) {
			if (odeep) desc.value = intersection(...items);
			else desc.value = Array.isArray(desc.value) ? [] : {};
		}

		Object.defineProperty(res, prop, desc);
	}

	return res;
}

/**
 * Returns the set difference of the first argument against the remaining arguments
 * @param {...Object} objects - The differing objects
 * @returns {Object}
 */
export function difference(...objects) {
	_validateObjArgs(objects);

	const maj = objects[0];
	const res = Array.isArray(maj) ? [] : {};

	if (objects.length === 1) return res;

	const props = Object.getOwnPropertyNames(maj);

	for (let i = 0, prop = props[0]; prop !== undefined; prop = props[++i]) {
		const desc = Object.getOwnPropertyDescriptor(maj, prop);
		const deep = _isIntersectable(prop, desc), items = [];

		for (let j = objects.length - 1, obj = objects[j]; j > 0; obj = objects[--j]) {
			if (!obj.hasOwnProperty(prop)) {
				items.splice(0, items.length);

				continue;
			}

			const odesc = Object.getOwnPropertyDescriptor(obj, prop);

			if (_isIntersectable(prop, odesc) !== deep) {
				items.splice(0, items.length);

				continue;
			}
			else items.unshift(odesc.value);
		}

		if (deep) {
			if (items.length === 0) desc.value = copy(desc.value);
			else {
				const ret = difference(desc.value, ...items);

				if (Object.keys(ret).length === 0) continue;

				desc.value = ret;
			}
		}
		else if ((items.length + 1) % 2 === 0) continue;

		Object.defineProperty(res, prop, desc);
	}

	return res;
}
