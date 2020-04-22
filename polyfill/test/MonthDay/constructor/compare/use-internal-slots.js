// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal-comparetemporalmonthday
---*/

function CustomError() {}

class AvoidGettersMonthDay extends Temporal.MonthDay {
  get month() {
    throw new CustomError();
  }
  get day() {
    throw new CustomError();
  }
}

const one = new AvoidGettersMonthDay(5, 2);
const two = new AvoidGettersMonthDay(3, 25);
assert.sameValue(Temporal.MonthDay.compare(one, two), 1);
