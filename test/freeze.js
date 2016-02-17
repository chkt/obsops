import _assert from 'assert';

import * as _obj from '../source';



describe('obj.freezeCopy', () => {
	it("should require one argument", () => {
		_assert.doesNotThrow(() =>_obj.freezeCopy({}));
	});

	it("should require its argument to be an object instance" , () => {
		_assert.throws(() => _obj.freezeCopy(true), TypeError);
		_assert.throws(() => _obj.freezeCopy(1), TypeError);
		_assert.throws(() => _obj.freezeCopy(Symbol()), TypeError);
		_assert.throws(() => _obj.freezeCopy(null), TypeError);
		_assert.doesNotThrow(() => _obj.freezeCopy([]));
		_assert.throws(() => _obj.freezeCopy(() => 1), TypeError);
	});

	it("should return an object if the argument is an object", () => {
		const res = _obj.freezeCopy({});

		_assert(res instanceof Object && res.constructor === Object);
	});

	it("should return an array if the argument is an array", () => {
		const res = _obj.freezeCopy([]);

		_assert(Array.isArray(res) && res.constructor === Array);
	});

	it("should contain the same scalar properties as the source", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeCopy(source);

		_assert.deepStrictEqual(res, source);
	});

	it("should contain the same nested properties as the source", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeCopy(source);

		_assert.deepStrictEqual(res, source);
	});

	it("should not reflect scalar changes to the source", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeCopy(source);

		source['a'] = 4;

		_assert.strictEqual(res['a'], 1);
	});

	it("should not reflect nested changes to the source", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeCopy(source);

		source['a']['a'] = 4;

		_assert.strictEqual(res['a']['a'], 1);
	});

	it("should freeze all scalar properties", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeCopy(source);

		_assert.throws(() => res['a'] = 2);
		_assert.throws(() => res['a'] = {});
		_assert.throws(() => delete res['a']);
		_assert.throws(() => res['d'] = 4);
	});

	it("should freeze all nested properties", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeCopy(source);

		_assert.throws(() => res['a']['a'] = 2);
		_assert.throws(() => res['a']['a'] = {});
		_assert.throws(() => delete res['a']['a']);
		_assert.throws(() => res['a']['d'] = 4);
	});

	it("should change getters to values", () => {
		const source = {
			get a() {
				return 1;
			}
		};

		const res = _obj.freezeCopy(source);
		const desc = Object.getOwnPropertyDescriptor(res, 'a');

		_assert(!('get' in desc));
		_assert('value' in desc);
		_assert.strictEqual(desc.value, 1);
	});

	it("should remove setters", () => {
		const source = {
			get a() {
				return 1;
			},

			set a(v) {},

			set b(v) {}
		};

		const res = _obj.freezeCopy(source);
		const desca = Object.getOwnPropertyDescriptor(res, 'a');
		const descb = Object.getOwnPropertyDescriptor(res, 'b');

		_assert(!('get' in desca));
		_assert(!('set' in desca));
		_assert('value' in desca);
		_assert.strictEqual(desca.value, 1);
		_assert(!('set' in descb));
		_assert('value' in descb);
		_assert.strictEqual(descb.value, undefined);
	});
});



describe('obj.freezeProxy', () => {
	it("should require one argument", () => {
		_assert.doesNotThrow(() =>_obj.freezeProxy({}));
	});

	it("should require its argument to be an object instance" , () => {
		_assert.throws(() => _obj.freezeProxy(true), TypeError);
		_assert.throws(() => _obj.freezeProxy(1), TypeError);
		_assert.throws(() => _obj.freezeProxy(Symbol()), TypeError);
		_assert.throws(() => _obj.freezeProxy(null), TypeError);
		_assert.doesNotThrow(() => _obj.freezeProxy({}));
		_assert.throws(() => _obj.freezeProxy(() => 1), TypeError);
	});

	it ("should return an object", () => {
		const obj = _obj.freezeProxy({});

		_assert(obj instanceof Object && obj.constructor === Object);
	});

	it("should reference the scalar properties of the source", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeProxy(source);

		_assert.strictEqual(source.a, res.a);
		_assert.strictEqual(source.b, res.b);
		_assert.strictEqual(source.c, res.c);
	});

	it("should reference the nested properties of the source", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeProxy(source);

		_assert.strictEqual(source.a.a, res.a.a);
		_assert.strictEqual(source.a.b, res.a.b);
		_assert.strictEqual(source.a.c, res.a.c);
	});

	it("should reflect scalar changes to the source", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeProxy(source);

		source.a = 4;

		_assert.strictEqual(res.a, source.a);
	});

	it("should reflect nested changes to the source", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeProxy(source);

		source.a.a = 4;

		_assert.strictEqual(source.a.a, res.a.a);
	});

	it("should freeze all scalar properties", () => {
		const source = {
			a : 1,
			b : 2,
			c : 3
		};

		const res = _obj.freezeProxy(source);

		_assert.throws(() => res['a'] = 2);
		_assert.throws(() => res['a'] = {});
		_assert.throws(() => res['d'] = 4);
	});

	it("should freeze all nested properties", () => {
		const source = { a : {
			a : 1,
			b : 2,
			c : 3
		}};

		const res = _obj.freezeProxy(source);

		_assert.throws(() => res['a']['a'] = 2);
		_assert.throws(() => res['a']['a'] = {});
		_assert.throws(() => res['a']['d'] = 4);
	});

	it("should not change scalar getters to values", () => {
		const source = {
			get a() {
				return 1;
			}
		};

		const res = _obj.freezeProxy(source);
		const desc = Object.getOwnPropertyDescriptor(res, 'a');

		_assert('get' in desc);
		_assert(!('value' in desc));
		_assert.strictEqual(res.a, 1);
	});

	it("should remove setters", () => {
		const source = {
			get a() {
				return 1;
			},

			set a(value) {},

			set b(value) {}
		};

		const res = _obj.freezeProxy(source);
		const desca = Object.getOwnPropertyDescriptor(res, 'a');
		const descb = Object.getOwnPropertyDescriptor(res, 'b');

		_assert('get' in desca);
		_assert('set' in desca && desca['set'] === undefined);
		_assert(!('value' in desca));
		_assert.strictEqual(res.a, 1);
		_assert('set' in descb && descb['set'] === undefined);
		_assert(!('value' in descb));
		_assert.strictEqual(res.b, undefined);
	});
});
