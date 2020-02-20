#! /usr/bin/env -S node --experimental-modules

/*
 ** Copyright (C) 2018-2019 Bloomberg LP. All rights reserved.
 ** This code is governed by the license found in the LICENSE file.
 */

import Demitasse from '@pipobscure/demitasse';
const { describe, it, report } = Demitasse;

import Pretty from '@pipobscure/demitasse-pretty';
const { reporter } = Pretty;

import Assert from 'assert';
const { ok: assert, equal, throws } = Assert;

import * as Temporal from 'tc39-temporal';
const { DateTime } = Temporal;

describe('DateTime', () => {
  describe('Structure', () => {
    it('DateTime is a Function', () => {
      equal(typeof DateTime, 'function');
    });
    it('DateTime has a prototype', () => {
      assert(DateTime.prototype);
      equal(typeof DateTime.prototype, 'object');
    });
    describe('DateTime.prototype', () => {
      it('DateTime.prototype has year', () => {
        assert('year' in DateTime.prototype);
      });
      it('DateTime.prototype has month', () => {
        assert('month' in DateTime.prototype);
      });
      it('DateTime.prototype has day', () => {
        assert('day' in DateTime.prototype);
      });
      it('DateTime.prototype has hour', () => {
        assert('hour' in DateTime.prototype);
      });
      it('DateTime.prototype has minute', () => {
        assert('minute' in DateTime.prototype);
      });
      it('DateTime.prototype has second', () => {
        assert('second' in DateTime.prototype);
      });
      it('DateTime.prototype has millisecond', () => {
        assert('millisecond' in DateTime.prototype);
      });
      it('DateTime.prototype has microsecond', () => {
        assert('microsecond' in DateTime.prototype);
      });
      it('DateTime.prototype has nanosecond', () => {
        assert('nanosecond' in DateTime.prototype);
      });
      it('DateTime.prototype has dayOfWeek', () => {
        assert('dayOfWeek' in DateTime.prototype);
      });
      it('DateTime.prototype has dayOfYear', () => {
        assert('dayOfYear' in DateTime.prototype);
      });
      it('DateTime.prototype has weekOfYear', () => {
        assert('weekOfYear' in DateTime.prototype);
      });
      it('DateTime.prototype.with is a Function', () => {
        equal(typeof DateTime.prototype.with, 'function');
      });
      it('DateTime.prototype.plus is a Function', () => {
        equal(typeof DateTime.prototype.plus, 'function');
      });
      it('DateTime.prototype.minus is a Function', () => {
        equal(typeof DateTime.prototype.minus, 'function');
      });
      it('DateTime.prototype.difference is a Function', () => {
        equal(typeof DateTime.prototype.difference, 'function');
      });
      it('DateTime.prototype.inTimeZone is a Function', () => {
        equal(typeof DateTime.prototype.inTimeZone, 'function');
      });
      it('DateTime.prototype.getDate is a Function', () => {
        equal(typeof DateTime.prototype.getDate, 'function');
      });
      it('DateTime.prototype.getTime is a Function', () => {
        equal(typeof DateTime.prototype.getTime, 'function');
      });
      it('DateTime.prototype.toString is a Function', () => {
        equal(typeof DateTime.prototype.toString, 'function');
      });
      it('DateTime.prototype.toJSON is a Function', () => {
        equal(typeof DateTime.prototype.toJSON, 'function');
      });
    });
    it('DateTime.from is a Function', () => {
      equal(typeof DateTime.from, 'function');
    });
    it('DateTime.compare is a Function', () => {
      equal(typeof DateTime.compare, 'function');
    });
  });
  describe('Construction', () => {
    describe('new DateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789)', () => {
      let datetime;
      it('datetime can be constructed', () => {
        datetime = new DateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
        assert(datetime);
        equal(typeof datetime, 'object');
      });
      it('datetime.year is 1976', () => equal(datetime.year, 1976));
      it('datetime.month is 11', () => equal(datetime.month, 11));
      it('datetime.day is 18', () => equal(datetime.day, 18));
      it('datetime.hour is 15', () => equal(datetime.hour, 15));
      it('datetime.minute is 23', () => equal(datetime.minute, 23));
      it('datetime.second is 30', () => equal(datetime.second, 30));
      it('datetime.millisecond is 123', () => equal(datetime.millisecond, 123));
      it('datetime.microsecond is 456', () => equal(datetime.microsecond, 456));
      it('datetime.nanosecond is 789', () => equal(datetime.nanosecond, 789));
      it('datetime.dayOfWeek is 4', () => equal(datetime.dayOfWeek, 4));
      it('datetime.dayOfYear is 323', () => equal(datetime.dayOfYear, 323));
      it('datetime.weekOfYear is 47', () => equal(datetime.weekOfYear, 47));
      it('`${datetime}` is 1976-11-18T15:23:30.123456789', () => equal(`${datetime}`, '1976-11-18T15:23:30.123456789'));
    });
    describe('new DateTime(1976, 11, 18, 15, 23, 30, 123, 456)', () => {
      let datetime;
      it('datetime can be constructed', () => {
        datetime = new DateTime(1976, 11, 18, 15, 23, 30, 123, 456);
        assert(datetime);
        equal(typeof datetime, 'object');
      });
      it('datetime.year is 1976', () => equal(datetime.year, 1976));
      it('datetime.month is 11', () => equal(datetime.month, 11));
      it('datetime.day is 18', () => equal(datetime.day, 18));
      it('datetime.hour is 15', () => equal(datetime.hour, 15));
      it('datetime.minute is 23', () => equal(datetime.minute, 23));
      it('datetime.second is 30', () => equal(datetime.second, 30));
      it('datetime.millisecond is 123', () => equal(datetime.millisecond, 123));
      it('datetime.microsecond is 456', () => equal(datetime.microsecond, 456));
      it('datetime.nanosecond is 0', () => equal(datetime.nanosecond, 0));
      it('datetime.dayOfWeek is 4', () => equal(datetime.dayOfWeek, 4));
      it('datetime.dayOfYear is 323', () => equal(datetime.dayOfYear, 323));
      it('datetime.weekOfYear is 47', () => equal(datetime.weekOfYear, 47));
      it('`${datetime}` is 1976-11-18T15:23:30.123456', () => equal(`${datetime}`, '1976-11-18T15:23:30.123456'));
    });
    describe('new DateTime(1976, 11, 18, 15, 23, 30, 123)', () => {
      let datetime;
      it('datetime can be constructed', () => {
        datetime = new DateTime(1976, 11, 18, 15, 23, 30, 123);
        assert(datetime);
        equal(typeof datetime, 'object');
      });
      it('datetime.year is 1976', () => equal(datetime.year, 1976));
      it('datetime.month is 11', () => equal(datetime.month, 11));
      it('datetime.day is 18', () => equal(datetime.day, 18));
      it('datetime.hour is 15', () => equal(datetime.hour, 15));
      it('datetime.minute is 23', () => equal(datetime.minute, 23));
      it('datetime.second is 30', () => equal(datetime.second, 30));
      it('datetime.millisecond is 123', () => equal(datetime.millisecond, 123));
      it('datetime.microsecond is 0', () => equal(datetime.microsecond, 0));
      it('datetime.nanosecond is 0', () => equal(datetime.nanosecond, 0));
      it('datetime.dayOfWeek is 4', () => equal(datetime.dayOfWeek, 4));
      it('datetime.dayOfYear is 323', () => equal(datetime.dayOfYear, 323));
      it('datetime.weekOfYear is 47', () => equal(datetime.weekOfYear, 47));
      it('`${datetime}` is 1976-11-18T15:23:30.123', () => equal(`${datetime}`, '1976-11-18T15:23:30.123'));
    });
    describe('new DateTime(1976, 11, 18, 15, 23, 30)', () => {
      let datetime;
      it('datetime can be constructed', () => {
        datetime = new DateTime(1976, 11, 18, 15, 23, 30);
        assert(datetime);
        equal(typeof datetime, 'object');
      });
      it('datetime.year is 1976', () => equal(datetime.year, 1976));
      it('datetime.month is 11', () => equal(datetime.month, 11));
      it('datetime.day is 18', () => equal(datetime.day, 18));
      it('datetime.hour is 15', () => equal(datetime.hour, 15));
      it('datetime.minute is 23', () => equal(datetime.minute, 23));
      it('datetime.second is 30', () => equal(datetime.second, 30));
      it('datetime.millisecond is 0', () => equal(datetime.millisecond, 0));
      it('datetime.microsecond is 0', () => equal(datetime.microsecond, 0));
      it('datetime.nanosecond is 0', () => equal(datetime.nanosecond, 0));
      it('datetime.dayOfWeek is 4', () => equal(datetime.dayOfWeek, 4));
      it('datetime.dayOfYear is 323', () => equal(datetime.dayOfYear, 323));
      it('datetime.weekOfYear is 47', () => equal(datetime.weekOfYear, 47));
      it('`${datetime}` is 1976-11-18T15:23:30', () => equal(`${datetime}`, '1976-11-18T15:23:30'));
    });
    describe('new DateTime(1976, 11, 18, 15, 23)', () => {
      let datetime;
      it('datetime can be constructed', () => {
        datetime = new DateTime(1976, 11, 18, 15, 23);
        assert(datetime);
        equal(typeof datetime, 'object');
      });
      it('datetime.year is 1976', () => equal(datetime.year, 1976));
      it('datetime.month is 11', () => equal(datetime.month, 11));
      it('datetime.day is 18', () => equal(datetime.day, 18));
      it('datetime.hour is 15', () => equal(datetime.hour, 15));
      it('datetime.minute is 23', () => equal(datetime.minute, 23));
      it('datetime.second is 0', () => equal(datetime.second, 0));
      it('datetime.millisecond is 0', () => equal(datetime.millisecond, 0));
      it('datetime.microsecond is 0', () => equal(datetime.microsecond, 0));
      it('datetime.nanosecond is 0', () => equal(datetime.nanosecond, 0));
      it('datetime.dayOfWeek is 4', () => equal(datetime.dayOfWeek, 4));
      it('datetime.dayOfYear is 323', () => equal(datetime.dayOfYear, 323));
      it('datetime.weekOfYear is 47', () => equal(datetime.weekOfYear, 47));
      it('`${datetime}` is 1976-11-18T15:23', () => equal(`${datetime}`, '1976-11-18T15:23'));
    });
    describe('new DateTime(1976, 11, 18, 15)', () => {
      const datetime = new DateTime(1976, 11, 18, 15);
      it('`${datetime}` is 1976-11-18T15:00', () => equal(`${datetime}`, '1976-11-18T15:00'));
    });
    describe('new DateTime(1976, 11, 18)', () => {
      const datetime = new DateTime(1976, 11, 18);
      it('`${datetime}` is 1976-11-18T00:00', () => equal(`${datetime}`, '1976-11-18T00:00'));
    });
    describe('Disambiguation', () => {
      it('reject', () => throws(() => new DateTime(2019, 1, 32, 0, 0, 0, 0, 0, 0, 'reject'), RangeError));
      it('constrain', () => equal(`${new DateTime(2019, 1, 32, 0, 0, 0, 0, 0, 0, 'constrain')}`, '2019-01-31T00:00'));
      it('balance', () => equal(`${new DateTime(2019, 1, 32, 0, 0, 0, 0, 0, 0, 'balance')}`, '2019-02-01T00:00'));
      it('throw when bad disambiguation', () =>
        throws(() => new DateTime(2019, 1, 1, 0, 0, 0, 0, 0, 0, 'xyz'), TypeError));
      it('reject leap second', () => throws(() => new DateTime(2016, 12, 31, 23, 59, 60, 0, 0, 0, 'reject'), RangeError));
      it('constrain leap second', () => equal(`${new DateTime(2016, 12, 31, 23, 59, 60, 0, 0, 0, 'constrain')}`, '2016-12-31T23:59:59'));
      it('balance leap second', () => equal(`${new DateTime(2016, 12, 31, 23, 59, 60, 0, 0, 0, 'balance')}`, '2017-01-01T00:00'));
    });
  });
  describe('.with manipulation', () => {
    const datetime = new DateTime(1976, 11, 18, 15, 23, 30, 123, 456, 789);
    it('datetime.with({ year: 2019 } works', () => {
      equal(`${datetime.with({ year: 2019 })}`, '2019-11-18T15:23:30.123456789');
    });
    it('datetime.with({ month: 5 } works', () => {
      equal(`${datetime.with({ month: 5 })}`, '1976-05-18T15:23:30.123456789');
    });
    it('datetime.with({ day: 5 } works', () => {
      equal(`${datetime.with({ day: 5 })}`, '1976-11-05T15:23:30.123456789');
    });
    it('datetime.with({ hour: 5 } works', () => {
      equal(`${datetime.with({ hour: 5 })}`, '1976-11-18T05:23:30.123456789');
    });
    it('datetime.with({ minute: 5 } works', () => {
      equal(`${datetime.with({ minute: 5 })}`, '1976-11-18T15:05:30.123456789');
    });
    it('datetime.with({ second: 5 } works', () => {
      equal(`${datetime.with({ second: 5 })}`, '1976-11-18T15:23:05.123456789');
    });
    it('datetime.with({ millisecond: 5 } works', () => {
      equal(`${datetime.with({ millisecond: 5 })}`, '1976-11-18T15:23:30.005456789');
    });
    it('datetime.with({ microsecond: 5 } works', () => {
      equal(`${datetime.with({ microsecond: 5 })}`, '1976-11-18T15:23:30.123005789');
    });
    it('datetime.with({ nanosecond: 5 } works', () => {
      equal(`${datetime.with({ nanosecond: 5 })}`, '1976-11-18T15:23:30.123456005');
    });
    it('datetime.with({ month: 5, second: 15 } works', () => {
      equal(`${datetime.with({ month: 5, second: 15 })}`, '1976-05-18T15:23:15.123456789');
    });
  });
  describe('DateTime.compare() works', () => {
    const dt1 = DateTime.from('1976-11-18T15:23:30.123456789');
    const dt2 = DateTime.from('2019-10-29T10:46:38.271986102');
    it('equal', () => equal(DateTime.compare(dt1, dt1), 0));
    it('smaller/larger', () => equal(DateTime.compare(dt1, dt2), -1));
    it('larger/smaller', () => equal(DateTime.compare(dt2, dt1), 1));
    it("doesn't cast first argument", () => {
      throws(() => DateTime.compare({ year: 1976, month: 11, day: 18, hour: 15 }, dt2), TypeError);
      throws(() => DateTime.compare('1976-11-18T15:23:30.123456789', dt2), TypeError);
    });
    it("doesn't cast second argument", () => {
      throws(() => DateTime.compare(dt1, { year: 2019, month: 10, day: 29, hour: 10 }), TypeError);
      throws(() => DateTime.compare('2019-10-29T10:46:38.271986102', dt2), TypeError);
    });
  });
  describe('date/time maths', () => {
    const earlier = DateTime.from('1976-11-18T15:23:30.123456789');
    const later = DateTime.from('2019-10-29T10:46:38.271986102');
    const diff = earlier.difference(later);
    it(`(${earlier}).difference(${later}) == (${later}).difference(${earlier})`, () =>
      equal(`${later.difference(earlier)}`, `${diff}`));
    it(`(${earlier}).plus(${diff}) == (${later})`, () => equal(`${earlier.plus(diff)}`, `${later}`));
    it(`(${later}).minus(${diff}) == (${earlier})`, () => equal(`${later.minus(diff)}`, `${earlier}`));
  });
  describe('date/time maths: hours overflow', () => {
    const later = DateTime.from('2019-10-29T10:46:38.271986102');
    const earlier = later.minus({ hours: 12 });
    it("result", () => equal(`${earlier}`, '2019-10-28T22:46:38.271986102'));
  });
  describe('DateTime.difference()', () => {
    const dt = DateTime.from('1976-11-18T15:23:30.123456789');
    it("doesn't cast argument", () => {
      throws(() => dt.difference({ year: 2019, month: 10, day: 29, hour: 10}), TypeError);
      throws(() => dt.difference('2019-10-29T10:46:38.271986102'), TypeError);
    });
  });
  describe('DateTime.from() works', () => {
    it('DateTime.from("1976-11-18 15:23:30")', () => equal(`${DateTime.from('1976-11-18 15:23:30')}`, "1976-11-18T15:23:30"));
    it('DateTime.from("1976-11-18 15:23:30.001")', () => equal(`${DateTime.from('1976-11-18 15:23:30.001')}`, "1976-11-18T15:23:30.001"));
    it('DateTime.from("1976-11-18 15:23:30.001123")', () => equal(`${DateTime.from('1976-11-18 15:23:30.001123')}`, "1976-11-18T15:23:30.001123"));
    it('DateTime.from("1976-11-18 15:23:30.001123456")', () => equal(`${DateTime.from('1976-11-18 15:23:30.001123456')}`, "1976-11-18T15:23:30.001123456"));
    it('DateTime.from(1976-11-18) == 1976-11-18', () => {
      const orig = new DateTime(1976, 11, 18, 15, 23, 20, 123, 456, 789);
      const actual = DateTime.from(orig);
      equal(actual, orig);
    });
    it('DateTime.from({ year: 1976, month: 11, day: 18 }) == 1976-11-18T00:00', () => equal(`${DateTime.from({ year: 1976, month: 11, day: 18 })}`, '1976-11-18T00:00'));
    it('DateTime.from({ year: 1976, month: 11, day: 18, millisecond: 123 }) == 1976-11-18T00:00:00.123', () => equal(`${DateTime.from({ year: 1976, month: 11, day: 18, millisecond: 123 })}`, '1976-11-18T00:00:00.123'));
    it('DateTime.from({ month: 11, day: 18, hour: 15, minute: 23, second: 30, millisecond: 123 }) throws', () =>
      throws(() => DateTime.from({ month: 11, day: 18, hour: 15, minute: 23, second: 30, millisecond: 123 }), TypeError));
    it('DateTime.from({}) throws', () => throws(() => DateTime.from({}), TypeError));
    it('DateTime.from(required prop undefined) throws', () =>
      throws(() => DateTime.from({ year: undefined, month: 11, day: 18 }), TypeError));
    it('DateTime.from(ISO string leap second) is constrained', () => {
      equal(`${DateTime.from('2016-12-31T23:59:60')}`, '2016-12-31T23:59:59');
    });
    it('DateTime.from(property bag leap second) throws', () => {
      throws(() => DateTime.from({ year: 2016, month: 12, day: 31, hour: 23, minute: 59, second: 60 }), RangeError);
    });
    it.skip('DateTime.from(number) is converted to string', () =>
      equal(`${DateTime.from(19761118)}`, `${DateTime.from('19761118')}`));
  });
  describe('DateTime.inTimeZone() works', () => {
    it('recent date', () => {
      const dt = DateTime.from('2019-10-29T10:46:38.271986102');
      const tz = Temporal.TimeZone.from('Europe/Amsterdam');
      equal(`${dt.inTimeZone(tz)}`, '2019-10-29T09:46:38.271986102Z');
      equal(`${dt.inTimeZone('Europe/Amsterdam')}`, '2019-10-29T09:46:38.271986102Z');
    });
    it('year ≤ 99', () => {
      const dt = DateTime.from('+000098-10-29T10:46:38.271986102');
      equal(`${dt.inTimeZone('+06:00')}`, '+000098-10-29T04:46:38.271986102Z');
    });
    it('year < 1', () => {
      let dt = DateTime.from('+000000-10-29T10:46:38.271986102');
      equal(`${dt.inTimeZone('+06:00')}`, '+000000-10-29T04:46:38.271986102Z');
      dt = DateTime.from('-001000-10-29T10:46:38.271986102');
      equal(`${dt.inTimeZone('+06:00')}`, '-001000-10-29T04:46:38.271986102Z');
    });
  });
});

import { normalize } from 'path';
if (normalize(import.meta.url.slice(8)) === normalize(process.argv[1]))
  report(reporter).then((failed) => process.exit(failed ? 1 : 0));