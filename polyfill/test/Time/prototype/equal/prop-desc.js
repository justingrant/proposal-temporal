// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
includes: [propertyHelper.js]
---*/

const { Time } = Temporal;
assert.sameValue(
  typeof Time.prototype.equal,
  "function",
  "`typeof Time.prototype.equal` is `function`"
);

verifyProperty(Time.prototype, "equal", {
  writable: true,
  enumerable: false,
  configurable: true,
});
