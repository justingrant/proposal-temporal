// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.equal
features: [Symbol]
---*/

const instance = Temporal.Absolute.fromEpochSeconds(0);

assert.throws(TypeError, () => instance.equal(undefined), "undefined");
assert.throws(TypeError, () => instance.equal(null), "null");
assert.throws(TypeError, () => instance.equal(true), "true");
assert.throws(TypeError, () => instance.equal(""), "empty string");
assert.throws(TypeError, () => instance.equal(Symbol()), "symbol");
assert.throws(TypeError, () => instance.equal(1), "1");
assert.throws(TypeError, () => instance.equal({}), "plain object");
assert.throws(TypeError, () => instance.equal(Temporal.Absolute), "Temporal.Absolute");
assert.throws(TypeError, () => instance.equal(Temporal.Absolute.prototype), "Temporal.Absolute.prototype");
