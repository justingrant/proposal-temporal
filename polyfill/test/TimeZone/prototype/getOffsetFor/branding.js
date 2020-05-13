// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

const getOffsetFor = Temporal.TimeZone.prototype.getOffsetFor;

assert.sameValue(typeof getOffsetFor, "function");

assert.throws(TypeError, () => getOffsetFor.call(undefined), "undefined");
assert.throws(TypeError, () => getOffsetFor.call(null), "null");
assert.throws(TypeError, () => getOffsetFor.call(true), "true");
assert.throws(TypeError, () => getOffsetFor.call(""), "empty string");
assert.throws(TypeError, () => getOffsetFor.call(Symbol()), "symbol");
assert.throws(TypeError, () => getOffsetFor.call(1), "1");
assert.throws(TypeError, () => getOffsetFor.call({}), "plain object");
assert.throws(TypeError, () => getOffsetFor.call(Temporal.TimeZone), "Temporal.TimeZone");
assert.throws(TypeError, () => getOffsetFor.call(Temporal.TimeZone.prototype), "Temporal.TimeZone.prototype");
