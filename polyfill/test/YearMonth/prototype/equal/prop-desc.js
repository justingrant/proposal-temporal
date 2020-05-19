// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { YearMonth } = Temporal;
assert.sameValue(
  typeof YearMonth.prototype.equal,
  "function",
  "`typeof YearMonth.prototype.equal` is `function`"
);

verifyProperty(YearMonth.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
