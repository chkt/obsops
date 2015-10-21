import _assert from 'assert';

import * as _obj from '../source';



describe('obj.intersectionByKey', () => {
	it("should require at least one argument", () => {
		_assert.throws(() => { _obj.intersectionByKey() }, TypeError);
	});

	it("should require all arguments to be objects", () => {
		_assert.throws(() => { _obj.intersectionByKey({}, null) }, TypeError);
	});

	it("should create a copy of a single argument", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1), op1);
		_assert.notEqual(_obj.intersectionByKey(op1), op1);
	});

	it("should create a shallow object intersection", () => {
		const op1 = { a : 1, b : 1 };
		const op2 = { a : 1, c : 2 };
		const op3 = { a : 1, d : 3 };
		const res = { a : 1 };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should merge scalars right-to-left", () => {
		const op1 = { a : 1 };
		const op2 = { a : 2 };
		const op3 = { a : 3 };
		const res = { a : 1 };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should create a deep object intersection", () => {
		const op1 = { a : { a : { a : 1, b : 1 }}};
		const op2 = { a : { a : { a : 1, c : 2 }}};
		const op3 = { a : { a : { a : 1, d : 3 }}};
		const res = { a : { a : { a : 1 }}};

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should treat non-intersecting objects as empty", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : null };
		const res = { a : {}};

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2), res);
	});

	it("should treat [ a ∩ b ∩ c ] as [ a ∩ (b ∩ c) ]", () => {
		const op1 = { a : { a : 1, b : 1 }};
		const op2 = { a : { b : 2 }};
		const op3 = { a : { b : 3, c : 3 }};

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), _obj.intersectionByKey(op1, _obj.intersectionByKey(op2, op3)));
	});

	it("should apply type-changes in processing order [ a ∩ (b ∩ c) ]", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : null };
		const op3 = { a : { b : 3 }};
		const res = { a : {}};

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should assign functions by reference", () => {
		function fna() {}
		function fnb() {}

		const op1 = { a : fna };
		const op2 = { a : fnb };
		const res = { a : fna };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2), res);
	});

	it("should intersect arrays by index", () => {
		const op1 = [1];
		const op2 = [2, 2];
		const op3 = [3, 3, 3];
		const res = [1];

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should intersect sparse arrays", () => {
		const op1 = [];
		const op2 = [];
		const op3 = [];
		const res = [];

		op1[0] = 1, op1[3] = 4;
		op2[1] = 2, op2[3] = 4;
		op3[2] = 3, op3[3] = 4;
		res[3] = 4;

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should intersect nested arrays by index", () => {
		const op1 = { a : [1] };
		const op2 = { a : [2, 2] };
		const op3 = { a : [3, 3, 3] };
		const res = { a : [1] };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2, op3), res);
	});

	it("should treat nonintersecting arrays as empty", () => {
		const op1 = { a : [1] };
		const op2 = { a : null };
		const res = { a : [] };

		_assert.deepStrictEqual(_obj.intersectionByKey(op1, op2), res);
	});
});



describe('obj.intersectionByValue', () => {
	it("should require at least one argument", () => {
		_assert.throws(() => { _obj.intersectionByValue() }, TypeError);
	});

	it("should require all arguments to be objects", () => {
		_assert.throws(() => { _obj.intersectionByValue({}, null) }, TypeError);
	});

	it("should create a copy of a single argument", () => {
		const op1 = { a : 1, b : 2 };

		_assert.deepStrictEqual(_obj.intersectionByValue(op1), op1);
		_assert.notEqual(_obj.intersectionByValue(op1), op1);
	});

	it("should create a shallow object intersection", () => {
		const op1 = { a : 1, b : 1 };
		const op2 = { a : 1, c : 2 };
		const op3 = { a : 1, d : 3 };
		const res = { a : 1 };

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should not merge differing scalars", () => {
		const op1 = { a : 1 };
		const op2 = { a : 2 };
		const op3 = { a : 3 };
		const res = {};

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should create a deep object intersection", () => {
		const op1 = { a : { a : { a : 1, b : 1 }}};
		const op2 = { a : { a : { a : 1, c : 2 }}};
		const op3 = { a : { a : { a : 1, d : 3 }}};
		const res = { a : { a : { a : 1 }}};

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should treat non-intersecting objects as empty", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : { b : 1 }};
		const res = { a : {}};

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2), res);
	});

	it("should treat [ a ∩ b ∩ c ] as [ a ∩ (b ∩ c) ]", () => {
		const op1 = { a : { a : 1, b : 1 }};
		const op2 = { a : { b : 1 }};
		const op3 = { a : { b : 1, c : 1 }};

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), _obj.intersectionByValue(op1, _obj.intersectionByKey(op2, op3)));
	});

	it("should apply type-changes in processing order [ a ∩ (b ∩ c) ]", () => {
		const op1 = { a : { a : 1 }};
		const op2 = { a : null };
		const op3 = { a : { b : 3 }};
		const res = {};

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should assign functions by reference", () => {
		function fna() {}

		const op1 = { a : fna };
		const op2 = { a : fna };
		const res = { a : fna };

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2), res);
	});

	it("should intersect arrays by index", () => {
		const op1 = [1];
		const op2 = [1, 2];
		const op3 = [1, 2, 3];
		const res = [1];

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should intersect sparse arrays", () => {
		const op1 = [];
		const op2 = [];
		const op3 = [];
		const res = [];

		op1[0] = 1, op1[3] = 4;
		op2[1] = 2, op2[3] = 4;
		op3[2] = 3, op3[3] = 4;
		res[3] = 4;

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should intersect nested arrays by index", () => {
		const op1 = { a : [1] };
		const op2 = { a : [1, 2] };
		const op3 = { a : [1, 2, 3] };
		const res = { a : [1] };

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2, op3), res);
	});

	it("should treat nonintersecting arrays as empty", () => {
		const op1 = { a : [1] };
		const op2 = { a : [2] };
		const res = { a : [] };

		_assert.deepStrictEqual(_obj.intersectionByValue(op1, op2), res);
	});
});