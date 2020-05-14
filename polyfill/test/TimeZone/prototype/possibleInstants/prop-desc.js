// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { TimeZone } = Temporal;
assert.sameValue(
  typeof TimeZone.prototype.possibleInstants,
  "function",
  "`typeof TimeZone.prototype.possibleInstants` is `function`"
);

verifyProperty(TimeZone.prototype, "possibleInstants", {
  writable: true,
  enumerable: false,
  configurable: true,
});
