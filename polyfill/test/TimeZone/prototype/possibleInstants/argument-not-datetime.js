// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.timezone.prototype.possibleinstants
---*/

const timeZone = Temporal.TimeZone.from("UTC");
assert.throws(TypeError, () => timeZone.possibleInstants(undefined), "undefined");
assert.throws(TypeError, () => timeZone.possibleInstants(null), "null");
assert.throws(TypeError, () => timeZone.possibleInstants(true), "boolean");
assert.throws(TypeError, () => timeZone.possibleInstants("2020-01-02T12:34:56Z"), "string");
assert.throws(TypeError, () => timeZone.possibleInstants(Symbol()), "Symbol");
assert.throws(TypeError, () => timeZone.possibleInstants(5), "number");
assert.throws(TypeError, () => timeZone.possibleInstants(5n), "bigint");
assert.throws(TypeError, () => timeZone.possibleInstants({}), "plain object");
