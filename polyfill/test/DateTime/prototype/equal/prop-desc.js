// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { DateTime } = Temporal;
assert.sameValue(
  typeof DateTime.prototype.equal,
  "function",
  "`typeof DateTime.prototype.equal` is `function`"
);

verifyProperty(DateTime.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
