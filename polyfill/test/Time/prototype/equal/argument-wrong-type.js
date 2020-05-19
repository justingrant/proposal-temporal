// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.time.prototype.equal
features: [Symbol]
---*/

const instance = Temporal.Time.from({ minute: 34, second: 56, millisecond: 987, microsecond: 654, nanosecond: 321 });

assert.throws(TypeError, () => instance.equal(undefined), "undefined");
assert.throws(TypeError, () => instance.equal(null), "null");
assert.throws(TypeError, () => instance.equal(true), "true");
assert.throws(TypeError, () => instance.equal(""), "empty string");
assert.throws(TypeError, () => instance.equal(Symbol()), "symbol");
assert.throws(TypeError, () => instance.equal(1), "1");
assert.throws(TypeError, () => instance.equal({}), "plain object");
assert.throws(TypeError, () => instance.equal(Temporal.Time), "Temporal.Time");
assert.throws(TypeError, () => instance.equal(Temporal.Time.prototype), "Temporal.Time.prototype");
