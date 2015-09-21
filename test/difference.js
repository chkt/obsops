import _assert from 'assert';

import * as _obj from '../source';



describe('obj.difference', () => {
	it("should require at least one argument", () => {
		_assert.throws(() => {
			_obj.difference();
		}, TypeError);
	});

	it("should require all arguments to be objects", () => {
		_assert.throws(() => {
			_obj.difference({}, null);
		}, TypeError);
	});

	it("should create a empty object from a single argument", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.difference(op1), {});
	});

	it("should create a shallow object difference", () => {
		const op1 = { a : 1, b : 1 };
		const op2 = { a : 1, c : 2 };
		const op3 = { d : 3 };
		const res = { b : 1 };

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should merge scalars right-to-left", () => {
		const op1 = { a : 1 };
		const op2 = { a : 2 };
		const op3 = { a : 3 };
		const res = { a : 1 };

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should create a deep object difference", () => {
		const op1 = { a : { a : { a : 1, b : 1 }}};
		const op2 = { a : { a : { a : 1, c : 2 }}};
		const op3 = { a : { a : { d : 3 }}};
		const res = { a : { a : { b : 1 }}};

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should remove empty difference sets", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : { a : 2, b : 2 }};
		const res = {};

		_assert.deepStrictEqual(_obj.difference(op1, op2), res);
	});

	it("should treat [ a \\ b \\ c ] as [ a \\ (b \\ c) ]", () => {
		const op1 = { a : { a : 1, b : 1 }};
		const op2 = { a : { a : 2, b : 2 }};
		const op3 = { a : { b : 3, c : 3 }};

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), _obj.difference(op1, _obj.difference(op2, op3)));
	});

	it("should apply type-changes in processing order [ a \\ (b \\ c) ]", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : null };
		const op3 = { a : { b : 3 }};
		const res = { a : { a : 1 }};

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should assign functions by reference", () => {
		function fna() {}
		function fnb() {}

		const op1 = { a : fna };
		const op2 = { a : fnb };
		const op3 = { a : fnb };
		const res = { a : fna };

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should create the difference of arrays by index", () => {
		const op1 = [1, 1, 1];
		const op2 = [2, 2];
		const op3 = [3];
		const res = [];

		res[0] = 1;
		res[2] = 1;

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should create the difference of sparse arrays", () => {
		const op1 = [];
		const op2 = [];
		const op3 = [];
		const res = [];

		op1[0] = 1, op1[3] = 4;
		op2[1] = 2, op2[3] = 4;
		op3[2] = 3, op3[3] = 4;
		res[0] = 1, res[3] = 4;

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should create the difference of nested arrays by index", () => {
		const op1 = { a : [1, 1, 1] };
		const op2 = { a : [2, 2] };
		const op3 = { a : [3] };
		const res = { a : [] };

		res.a[0] = 1;
		res.a[2] = 1;

		_assert.deepStrictEqual(_obj.difference(op1, op2, op3), res);
	});

	it("should remove empty difference set arrays", () => {
		const op1 = { a : [1] };
		const op2 = { a : [1] };
		const res = {};

		_assert.deepStrictEqual(_obj.difference(op1, op2), res);
	});
});