// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { MonthDay } = Temporal;
assert.sameValue(
  typeof MonthDay.prototype.equal,
  "function",
  "`typeof MonthDay.prototype.equal` is `function`"
);

verifyProperty(MonthDay.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
