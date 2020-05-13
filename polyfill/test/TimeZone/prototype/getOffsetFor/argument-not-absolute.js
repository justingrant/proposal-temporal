// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.timezone.prototype.getoffsetfor
---*/

const timeZone = Temporal.TimeZone.from("UTC");
assert.throws(TypeError, () => timeZone.getOffsetFor(undefined), "undefined");
assert.throws(TypeError, () => timeZone.getOffsetFor(null), "null");
assert.throws(TypeError, () => timeZone.getOffsetFor(true), "boolean");
assert.throws(TypeError, () => timeZone.getOffsetFor("2020-01-02T12:34:56Z"), "string");
assert.throws(TypeError, () => timeZone.getOffsetFor(Symbol()), "Symbol");
assert.throws(TypeError, () => timeZone.getOffsetFor(5), "number");
assert.throws(TypeError, () => timeZone.getOffsetFor(5n), "bigint");
assert.throws(TypeError, () => timeZone.getOffsetFor({}), "plain object");
