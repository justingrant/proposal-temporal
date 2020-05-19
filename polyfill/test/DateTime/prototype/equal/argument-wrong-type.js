// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.datetime.prototype.equal
features: [Symbol]
---*/

const instance = Temporal.DateTime.from({ year: 2000, month: 5, day: 2, minute: 34, second: 56, millisecond: 987, microsecond: 654, nanosecond: 321 });

assert.throws(TypeError, () => instance.equal(undefined), "undefined");
assert.throws(TypeError, () => instance.equal(null), "null");
assert.throws(TypeError, () => instance.equal(true), "true");
assert.throws(TypeError, () => instance.equal(""), "empty string");
assert.throws(TypeError, () => instance.equal(Symbol()), "symbol");
assert.throws(TypeError, () => instance.equal(1), "1");
assert.throws(TypeError, () => instance.equal({}), "plain object");
assert.throws(TypeError, () => instance.equal(Temporal.DateTime), "Temporal.DateTime");
assert.throws(TypeError, () => instance.equal(Temporal.DateTime.prototype), "Temporal.DateTime.prototype");
