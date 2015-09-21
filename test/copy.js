import _assert from 'assert';

import * as _obj from '../source';



describe('obj.copy', () => {
	it("should require one argument", () => {
		_assert.throws(() => { _obj.copy() }, TypeError);
		_assert.doesNotThrow(() => { _obj.copy({}) });
	});

	it("should require its argument to be an object", () => {
		_assert.throws(() => { _obj.copy(null) }, TypeError);
	});

	it("should create a shallow copy", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.copy(op1), op1);
		_assert.notEqual(_obj.copy(op1), op1);
	});

	it("should create a deep copy", () => {
		const op1 = { a : { a : { a : 1 }}};

		_assert.deepStrictEqual(_obj.copy(op1), op1);
		_assert.notEqual(_obj.copy(op1), op1);
	});

	it("should assign functions by reference", () => {
		function fn() {}

		const op1 = { a : fn };
		const res = { a : fn };

		_assert.deepStrictEqual(_obj.copy(op1), res);
	});

	it("should create a copy of arrays", () => {
		const op1 = [1];

		_assert.deepStrictEqual(_obj.copy(op1), op1);
		_assert.notEqual(_obj.copy(op1), op1);
	});
});