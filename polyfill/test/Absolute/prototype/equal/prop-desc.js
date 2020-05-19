// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { Absolute } = Temporal;
assert.sameValue(
  typeof Absolute.prototype.equal,
  "function",
  "`typeof Absolute.prototype.equal` is `function`"
);

verifyProperty(Absolute.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
