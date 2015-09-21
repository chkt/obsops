import _assert from 'assert';

import * as _obj from '../source';



describe('obj.copyJSON', () => {
	it("should require one argument", () => {
		_assert.throws(() => {
			_obj.copyJSON();
		}, TypeError);

		_assert.doesNotThrow(() => {
			_obj.copyJSON({});
		});
	});

	it("should require its argument to be an object", () => {
		_assert.throws(() => {
			_obj.copyJSON(null);
		}, TypeError);
	});

	it("should create a shallow copy", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.copyJSON(op1), op1);
		_assert.notEqual(_obj.copyJSON(op1), op1);
	});

	it("should create a deep copy", () => {
		const op1 = { a : { a : { a : 1 }}};

		_assert.deepStrictEqual(_obj.copyJSON(op1), op1);
		_assert.notEqual(_obj.copyJSON(op1), op1);
	});

	it("should omit functions", () => {
		function fn() {}

		const op1 = { a : fn };

		_assert.deepStrictEqual(_obj.copyJSON(op1), {});
	});

	it("should create a copy of arrays", () => {
		const op1 = [1];

		_assert.deepStrictEqual(_obj.copyJSON(op1), op1);
		_assert.notEqual(_obj.copyJSON(op1), op1);
	});
});