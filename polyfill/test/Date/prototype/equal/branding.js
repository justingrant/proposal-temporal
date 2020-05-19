// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.date.prototype.equal
features: [Symbol]
---*/

const equal = Temporal.Date.prototype.equal;

assert.sameValue(typeof equal, "function");

assert.throws(TypeError, () => equal.call(undefined), "undefined");
assert.throws(TypeError, () => equal.call(null), "null");
assert.throws(TypeError, () => equal.call(true), "true");
assert.throws(TypeError, () => equal.call(""), "empty string");
assert.throws(TypeError, () => equal.call(Symbol()), "symbol");
assert.throws(TypeError, () => equal.call(1), "1");
assert.throws(TypeError, () => equal.call({}), "plain object");
assert.throws(TypeError, () => equal.call(Temporal.Date), "Temporal.Date");
assert.throws(TypeError, () => equal.call(Temporal.Date.prototype), "Temporal.Date.prototype");
