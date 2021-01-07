// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal-sec-temporal.yearmonth.compare
---*/

let calls = 0;

class TrackGettersYearMonth extends Temporal.PlainYearMonth {
  get year() {
    calls++;
    return super.year;
  }
  get month() {
    calls++;
    return super.month;
  }
}

// if instances are equal, getters won't be called
{
  const one = new TrackGettersYearMonth(2000, 5);
  const two = new TrackGettersYearMonth(2000, 5);
  assert.sameValue(Temporal.PlainYearMonth.compare(one, two), 0);
  assert.sameValue(calls, 0);
}

// If instances are not equal, then getters must be called to
// determine if the year and month match, even if the reference
// year is different.
{
  const one = new TrackGettersYearMonth(2000, 5);
  const two = new TrackGettersYearMonth(2006, 3);
  assert.sameValue(Temporal.PlainYearMonth.compare(one, two), -1);
  assert.sameValue(calls, 2);
}