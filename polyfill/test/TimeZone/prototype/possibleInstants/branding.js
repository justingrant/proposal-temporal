// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

const possibleInstants = Temporal.TimeZone.prototype.possibleInstants;

assert.sameValue(typeof possibleInstants, "function");

assert.throws(TypeError, () => possibleInstants.call(undefined), "undefined");
assert.throws(TypeError, () => possibleInstants.call(null), "null");
assert.throws(TypeError, () => possibleInstants.call(true), "true");
assert.throws(TypeError, () => possibleInstants.call(""), "empty string");
assert.throws(TypeError, () => possibleInstants.call(Symbol()), "symbol");
assert.throws(TypeError, () => possibleInstants.call(1), "1");
assert.throws(TypeError, () => possibleInstants.call({}), "plain object");
assert.throws(TypeError, () => possibleInstants.call(Temporal.TimeZone), "Temporal.TimeZone");
assert.throws(TypeError, () => possibleInstants.call(Temporal.TimeZone.prototype), "Temporal.TimeZone.prototype");
