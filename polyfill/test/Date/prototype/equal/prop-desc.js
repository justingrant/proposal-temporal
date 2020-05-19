// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

assert.sameValue(
  typeof Temporal.Date.prototype.equal,
  "function",
  "`typeof Date.prototype.equal` is `function`"
);

verifyProperty(Temporal.Date.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
