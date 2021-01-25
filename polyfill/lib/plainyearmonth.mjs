/* global __debug__ */

import { ES } from './ecmascript.mjs';
import { DateTimeFormat } from './intl.mjs';
import { GetIntrinsic, MakeIntrinsicClass } from './intrinsicclass.mjs';
import { ISO_YEAR, ISO_MONTH, ISO_DAY, YEAR_MONTH_BRAND, CALENDAR, CreateSlots, GetSlot, SetSlot } from './slots.mjs';

const ObjectAssign = Object.assign;

function YearMonthToString(yearMonth, showCalendar = 'auto') {
  const year = ES.ISOYearString(GetSlot(yearMonth, ISO_YEAR));
  const month = ES.ISODateTimePartString(GetSlot(yearMonth, ISO_MONTH));
  let resultString = `${year}-${month}`;
  const calendar = GetSlot(yearMonth, CALENDAR);
  const calendarID = ES.ToString(calendar);
  if (calendarID !== 'iso8601') {
    const day = ES.ISODateTimePartString(GetSlot(yearMonth, ISO_DAY));
    resultString += `-${day}`;
  }
  const calendarString = ES.FormatCalendarAnnotation(calendarID, showCalendar);
  if (calendarString) resultString += calendarString;
  return resultString;
}

export class PlainYearMonth {
  constructor(isoYear, isoMonth, calendar = ES.GetISO8601Calendar(), referenceISODay = 1) {
    isoYear = ES.ToInteger(isoYear);
    isoMonth = ES.ToInteger(isoMonth);
    calendar = ES.ToTemporalCalendar(calendar);
    referenceISODay = ES.ToInteger(referenceISODay);

    // Note: if the arguments are not passed, ToInteger(undefined) will have returned 0, which will
    //       be rejected by RejectDate below. This check exists only to improve the error message.
    if (arguments.length < 2) {
      throw new RangeError('missing argument: isoYear and isoMonth are required');
    }

    ES.RejectDate(isoYear, isoMonth, referenceISODay);
    ES.RejectYearMonthRange(isoYear, isoMonth);
    CreateSlots(this);
    SetSlot(this, ISO_YEAR, isoYear);
    SetSlot(this, ISO_MONTH, isoMonth);
    SetSlot(this, ISO_DAY, referenceISODay);
    SetSlot(this, CALENDAR, calendar);
    SetSlot(this, YEAR_MONTH_BRAND, true);

    if (typeof __debug__ !== 'undefined' && __debug__) {
      Object.defineProperty(this, '_repr_', {
        value: `${this[Symbol.toStringTag]} <${YearMonthToString(this)}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get year() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).year(this);
  }
  get month() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).month(this);
  }
  get calendar() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR);
  }
  get era() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).era(this);
  }
  get eraYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).eraYear(this);
  }
  get monthCode() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).monthCode(this);
  }
  get regularMonth() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).regularMonth(this);
  }
  get monthType() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).monthType(this);
  }
  get daysInMonth() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).daysInMonth(this);
  }
  get daysInYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).daysInYear(this);
  }
  get monthsInYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).monthsInYear(this);
  }
  get inLeapYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).inLeapYear(this);
  }
  with(temporalYearMonthLike, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    if (ES.Type(temporalYearMonthLike) !== 'Object') {
      throw new TypeError('invalid argument');
    }
    if (temporalYearMonthLike.calendar !== undefined) {
      throw new TypeError('with() does not support a calendar property');
    }
    if (temporalYearMonthLike.timeZone !== undefined) {
      throw new TypeError('with() does not support a timeZone property');
    }

    const calendar = GetSlot(this, CALENDAR);
    const fieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const props = ES.ToPartialRecord(temporalYearMonthLike, fieldNames);
    if (!props) {
      throw new TypeError('invalid year-month-like');
    }
    let fields = ES.ToTemporalYearMonthFields(this, fieldNames);
    fields = ES.CalendarMergeFields(calendar, fields, props);

    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);

    const Construct = ES.SpeciesConstructor(this, PlainYearMonth);
    return ES.YearMonthFromFields(calendar, fields, Construct, overflow);
  }
  add(temporalDurationLike, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const duration = ES.ToLimitedTemporalDuration(temporalDurationLike);
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration;
    ES.RejectDurationSign(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    ({ days } = ES.BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, 'days'));

    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);

    const TemporalDate = GetIntrinsic('%Temporal.PlainDate%');
    const calendar = GetSlot(this, CALENDAR);
    const fieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const fields = ES.ToTemporalYearMonthFields(this, fieldNames);
    const sign = ES.DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
    const day = sign < 0 ? calendar.daysInMonth(this) : 1;
    const startDate = ES.DateFromFields(calendar, { ...fields, day }, TemporalDate);
    const addedDate = calendar.dateAdd(startDate, { ...duration, days }, options, TemporalDate);
    const addedDateFields = ES.ToTemporalYearMonthFields(addedDate, fieldNames);

    const Construct = ES.SpeciesConstructor(this, PlainYearMonth);
    return ES.YearMonthFromFields(calendar, addedDateFields, Construct, overflow);
  }
  subtract(temporalDurationLike, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    let duration = ES.ToLimitedTemporalDuration(temporalDurationLike);
    duration = {
      years: -duration.years,
      months: -duration.months,
      weeks: -duration.weeks,
      days: -duration.days,
      hours: -duration.hours,
      minutes: -duration.minutes,
      seconds: -duration.seconds,
      milliseconds: -duration.milliseconds,
      microseconds: -duration.microseconds,
      nanoseconds: -duration.nanoseconds
    };
    let { years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration;
    ES.RejectDurationSign(years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds);
    ({ days } = ES.BalanceDuration(days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, 'days'));

    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);

    const TemporalDate = GetIntrinsic('%Temporal.PlainDate%');
    const calendar = GetSlot(this, CALENDAR);
    const fieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const fields = ES.ToTemporalYearMonthFields(this, fieldNames);
    const sign = ES.DurationSign(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
    const day = sign < 0 ? calendar.daysInMonth(this) : 1;
    const startDate = ES.DateFromFields(calendar, { ...fields, day }, TemporalDate);
    const addedDate = calendar.dateAdd(startDate, { ...duration, days }, options, TemporalDate);
    const addedDateFields = ES.ToTemporalYearMonthFields(addedDate, fieldNames);

    const Construct = ES.SpeciesConstructor(this, PlainYearMonth);
    return ES.YearMonthFromFields(calendar, addedDateFields, Construct, overflow);
  }
  until(other, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    other = ES.ToTemporalYearMonth(other, PlainYearMonth);
    const calendar = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarID = ES.ToString(calendar);
    const otherCalendarID = ES.ToString(otherCalendar);
    if (calendarID !== otherCalendarID) {
      throw new RangeError(
        `cannot compute difference between months of ${calendarID} and ${otherCalendarID} calendars`
      );
    }
    options = ES.NormalizeOptionsObject(options);
    const disallowedUnits = [
      'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
      'microseconds',
      'nanoseconds'
    ];
    const smallestUnit = ES.ToSmallestTemporalDurationUnit(options, 'months', disallowedUnits);
    const largestUnit = ES.ToLargestTemporalUnit(options, 'years', disallowedUnits);
    ES.ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ES.ToTemporalRoundingMode(options, 'trunc');
    const roundingIncrement = ES.ToTemporalRoundingIncrement(options, undefined, false);

    const fieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const otherFields = ES.ToTemporalYearMonthFields(other, fieldNames);
    const thisFields = ES.ToTemporalYearMonthFields(this, fieldNames);
    const TemporalDate = GetIntrinsic('%Temporal.PlainDate%');
    const otherDate = ES.DateFromFields(calendar, { ...otherFields, day: 1 }, TemporalDate);
    const thisDate = ES.DateFromFields(calendar, { ...thisFields, day: 1 }, TemporalDate);

    const result = calendar.dateUntil(thisDate, otherDate, { largestUnit });
    if (smallestUnit === 'months' && roundingIncrement === 1) return result;

    let { years, months } = result;
    const TemporalDateTime = GetIntrinsic('%Temporal.PlainDateTime%');
    const relativeTo = new TemporalDateTime(
      GetSlot(thisDate, ISO_YEAR),
      GetSlot(thisDate, ISO_MONTH),
      GetSlot(thisDate, ISO_DAY),
      0,
      0,
      0,
      0,
      0,
      0,
      calendar
    );
    ({ years, months } = ES.RoundDuration(
      years,
      months,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      roundingIncrement,
      smallestUnit,
      roundingMode,
      relativeTo
    ));

    const Duration = GetIntrinsic('%Temporal.Duration%');
    return new Duration(years, months, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  since(other, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    other = ES.ToTemporalYearMonth(other, PlainYearMonth);
    const calendar = GetSlot(this, CALENDAR);
    const otherCalendar = GetSlot(other, CALENDAR);
    const calendarID = ES.ToString(calendar);
    const otherCalendarID = ES.ToString(otherCalendar);
    if (calendarID !== otherCalendarID) {
      throw new RangeError(
        `cannot compute difference between months of ${calendarID} and ${otherCalendarID} calendars`
      );
    }
    options = ES.NormalizeOptionsObject(options);
    const disallowedUnits = [
      'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
      'microseconds',
      'nanoseconds'
    ];
    const smallestUnit = ES.ToSmallestTemporalDurationUnit(options, 'months', disallowedUnits);
    const largestUnit = ES.ToLargestTemporalUnit(options, 'years', disallowedUnits);
    ES.ValidateTemporalUnitRange(largestUnit, smallestUnit);
    const roundingMode = ES.ToTemporalRoundingMode(options, 'trunc');
    const roundingIncrement = ES.ToTemporalRoundingIncrement(options, undefined, false);

    const fieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const otherFields = ES.ToTemporalYearMonthFields(other, fieldNames);
    const thisFields = ES.ToTemporalYearMonthFields(this, fieldNames);
    const TemporalDate = GetIntrinsic('%Temporal.PlainDate%');
    const otherDate = ES.DateFromFields(calendar, { ...otherFields, day: 1 }, TemporalDate);
    const thisDate = ES.DateFromFields(calendar, { ...thisFields, day: 1 }, TemporalDate);

    let { years, months } = calendar.dateUntil(thisDate, otherDate, { largestUnit });
    const Duration = GetIntrinsic('%Temporal.Duration%');
    if (smallestUnit === 'months' && roundingIncrement === 1) {
      return new Duration(-years, -months, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    const TemporalDateTime = GetIntrinsic('%Temporal.PlainDateTime%');
    const relativeTo = new TemporalDateTime(
      GetSlot(thisDate, ISO_YEAR),
      GetSlot(thisDate, ISO_MONTH),
      GetSlot(thisDate, ISO_DAY),
      0,
      0,
      0,
      0,
      0,
      0,
      calendar
    );
    ({ years, months } = ES.RoundDuration(
      years,
      months,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      roundingIncrement,
      smallestUnit,
      ES.NegateTemporalRoundingMode(roundingMode),
      relativeTo
    ));

    return new Duration(-years, -months, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  equals(other) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    other = ES.ToTemporalYearMonth(other, PlainYearMonth);
    // optimization: avoid calling getters if slots are equal
    if (
      GetSlot(this, ISO_YEAR) !== GetSlot(other, ISO_YEAR) ||
      GetSlot(this, ISO_MONTH) !== GetSlot(other, ISO_MONTH) ||
      GetSlot(this, ISO_DAY) !== GetSlot(other, ISO_DAY)
    ) {
      // Call getters; year/month may match even if reference year doesn't
      for (const prop of ['year', 'month']) {
        const val1 = this[prop];
        const val2 = other[prop];
        if (val1 !== val2) return false;
      }
    }
    return ES.CalendarEquals(this, other);
  }
  toString(options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    options = ES.NormalizeOptionsObject(options);
    const showCalendar = ES.ToShowCalendarOption(options);
    return YearMonthToString(this, showCalendar);
  }
  toJSON() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return YearMonthToString(this);
  }
  toLocaleString(locales = undefined, options = undefined) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return new DateTimeFormat(locales, options).format(this);
  }
  valueOf() {
    throw new TypeError('use compare() or equals() to compare Temporal.PlainYearMonth');
  }
  toPlainDate(item) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const calendar = GetSlot(this, CALENDAR);

    const receiverFieldNames = ES.CalendarFields(calendar, ['month', 'year']);
    const fields = ES.ToTemporalYearMonthFields(this, receiverFieldNames);

    const inputFieldNames = ES.CalendarFields(calendar, ['day']);
    const entries = [['day']];
    // Add extra fields from the calendar at the end
    inputFieldNames.forEach((fieldName) => {
      if (!entries.some(([name]) => name === fieldName)) {
        entries.push([fieldName, undefined]);
      }
    });
    ObjectAssign(fields, ES.ToRecord(item, entries));

    const Date = GetIntrinsic('%Temporal.PlainDate%');
    return ES.DateFromFields(calendar, fields, Date, 'reject');
  }
  getISOFields() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return {
      calendar: GetSlot(this, CALENDAR),
      isoDay: GetSlot(this, ISO_DAY),
      isoMonth: GetSlot(this, ISO_MONTH),
      isoYear: GetSlot(this, ISO_YEAR)
    };
  }
  static from(item, options = undefined) {
    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);
    if (ES.IsTemporalYearMonth(item)) {
      const year = GetSlot(item, ISO_YEAR);
      const month = GetSlot(item, ISO_MONTH);
      const calendar = GetSlot(item, CALENDAR);
      const referenceISODay = GetSlot(item, ISO_DAY);
      const result = new this(year, month, calendar, referenceISODay);
      if (!ES.IsTemporalYearMonth(result)) throw new TypeError('invalid result');
      return result;
    }
    return ES.ToTemporalYearMonth(item, this, overflow);
  }
  static compare(one, two) {
    one = ES.ToTemporalYearMonth(one, PlainYearMonth);
    two = ES.ToTemporalYearMonth(two, PlainYearMonth);

    // optimization: avoid calling getters if slots are equal
    if (
      GetSlot(one, ISO_YEAR) !== GetSlot(two, ISO_YEAR) ||
      GetSlot(one, ISO_MONTH) !== GetSlot(two, ISO_MONTH) ||
      GetSlot(one, ISO_DAY) !== GetSlot(two, ISO_DAY)
    ) {
      // Call getters; year/month may match even if reference year doesn't
      for (const prop of ['year', 'month']) {
        const val1 = one[prop];
        const val2 = two[prop];
        if (val1 !== val2) return ES.ComparisonResult(val1 - val2);
      }
    }
    return ES.CalendarCompare(GetSlot(one, CALENDAR), GetSlot(two, CALENDAR));
  }
}

MakeIntrinsicClass(PlainYearMonth, 'Temporal.PlainYearMonth');
