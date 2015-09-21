import _assert from 'assert';

import * as _obj from '../source';



describe('obj.union', () => {
	it("should require at least one argument", () => {
		_assert.throws(() => { _obj.union() }, TypeError);
	});

	it("should require all arguments to be objects", () => {
		_assert.throws(() => { _obj.union({}, null) }, TypeError);
	});

	it("should create a copy of a single argument", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.union(op1), op1);
		_assert.notEqual(_obj.union(op1), op1);
	});

	it("should create a shallow object union", () => {
		const op1 = { a : 1 };
		const op2 = { b : 2 };
		const op3 = { c : 3 };
		const res = { a : 1, b : 2, c : 3 };

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should merge scalars right-to-left", () => {
		const op1 = { a : 1 };
		const op2 = { a : 2 };
		const op3 = { a : 3 };
		const res = { a : 1 };

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should create a deep object union", () => {
		const op1 = { a : { a : { a : 1 }}};
		const op2 = { a : { a : { b : 2 }}};
		const op3 = { a : { a : { c : 3 }}};
		const res = { a : { a : { a : 1, b : 2, c : 3 }}};

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should treat [ a ⋃ b ⋃ c ] as [ a ⋃ (b ⋃ c) ]", () => {
		const op1 = { a : 1, b : 1 };
		const op2 = { a : 2, c : 2 };
		const op3 = { a : 3, b : 3 };

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), _obj.union(op1, _obj.union(op2, op3)));
	});

	it("should apply type-changes in processing order [ a ⋃ (b ⋃ c) ]", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : null };
		const op3 = { a : { b : 2 }};
		const res = { a : { a : 1 }};

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should assign functions by reference", () => {
		function fna() {}
		function fnb() {}

		const op1 = { a : fna };
		const op2 = { a : fnb };
		const res = { a : fna };

		_assert.deepStrictEqual(_obj.union(op1, op2), res);
	});

	it("should create a union of arrays by index", () => {
		const op1 = [1];
		const op2 = [2, 2];
		const op3 = [3, 3, 3];
		const res = [1, 2, 3];

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should create a union of sparse arrays", () => {
		const op1 = [];
		const op2 = [];
		const op3 = [];

		op1[0] = 1;
		op2[1] = 2;
		op3[2] = 3;

		const res = [1, 2, 3];

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should create a union of nested arrays by index", () => {
		const op1 = { a : [1] };
		const op2 = { a : [2, 2] };
		const op3 = { a : [3, 3, 3] };
		const res = { a : [1, 2, 3] };

		_assert.deepStrictEqual(_obj.union(op1, op2, op3), res);
	});

	it("should treat objects and arrays as mutual exclusive", () => {
		const op1 = { a : [1] };
		const op2 = { a : { a : 1 }};
		const res = { a : [1] };

		_assert.deepStrictEqual(_obj.union(op1, op2), res);
	});
});