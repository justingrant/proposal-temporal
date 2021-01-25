/* global __debug__ */

import { ES } from './ecmascript.mjs';
import { GetIntrinsic, MakeIntrinsicClass, DefineIntrinsic } from './intrinsicclass.mjs';
import { CALENDAR_ID, ISO_YEAR, ISO_MONTH, ISO_DAY, CreateSlots, GetSlot, HasSlot, SetSlot } from './slots.mjs';

const ArrayIncludes = Array.prototype.includes;
const ObjectAssign = Object.assign;

const impl = {};

export class Calendar {
  constructor(id) {
    // Note: if the argument is not passed, IsBuiltinCalendar("undefined") will fail. This check
    //       exists only to improve the error message.
    if (arguments.length < 1) {
      throw new RangeError('missing argument: id is required');
    }

    id = ES.ToString(id);
    if (!IsBuiltinCalendar(id)) throw new RangeError(`invalid calendar identifier ${id}`);
    CreateSlots(this);
    SetSlot(this, CALENDAR_ID, id);

    if (typeof __debug__ !== 'undefined' && __debug__) {
      Object.defineProperty(this, '_repr_', {
        value: `${this[Symbol.toStringTag]} <${id}>`,
        writable: false,
        enumerable: false,
        configurable: false
      });
    }
  }
  get id() {
    return ES.ToString(this);
  }
  dateFromFields(fields, options, constructor) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    if (ES.Type(fields) !== 'Object') throw new TypeError('invalid fields');
    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);
    return impl[GetSlot(this, CALENDAR_ID)].dateFromFields(fields, overflow, constructor, this);
  }
  yearMonthFromFields(fields, options, constructor) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    if (ES.Type(fields) !== 'Object') throw new TypeError('invalid fields');
    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);
    return impl[GetSlot(this, CALENDAR_ID)].yearMonthFromFields(fields, overflow, constructor, this);
  }
  monthDayFromFields(fields, options, constructor) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    if (ES.Type(fields) !== 'Object') throw new TypeError('invalid fields');
    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);
    return impl[GetSlot(this, CALENDAR_ID)].monthDayFromFields(fields, overflow, constructor, this);
  }
  fields(fields) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    fields = ES.CreateListFromArrayLike(fields, ['String']);
    return impl[GetSlot(this, CALENDAR_ID)].fields(fields);
  }
  mergeFields(fields, additionalFields) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].mergeFields(fields, additionalFields);
  }
  dateAdd(date, duration, options, constructor) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    duration = ES.ToTemporalDuration(duration, GetIntrinsic('%Temporal.Duration%'));
    options = ES.NormalizeOptionsObject(options);
    const overflow = ES.ToTemporalOverflow(options);
    const { year, month, day } = impl[GetSlot(this, CALENDAR_ID)].dateAdd(date, duration, overflow);
    return new constructor(year, month, day, this);
  }
  dateUntil(one, two, options) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    one = ES.ToTemporalDate(one, GetIntrinsic('%Temporal.PlainDate%'));
    two = ES.ToTemporalDate(two, GetIntrinsic('%Temporal.PlainDate%'));
    options = ES.NormalizeOptionsObject(options);
    const largestUnit = ES.ToLargestTemporalUnit(options, 'days', [
      'hours',
      'minutes',
      'seconds',
      'milliseconds',
      'microseconds',
      'nanoseconds'
    ]);
    const { years, months, weeks, days } = impl[GetSlot(this, CALENDAR_ID)].dateUntil(one, two, largestUnit);
    const Duration = GetIntrinsic('%Temporal.Duration%');
    return new Duration(years, months, weeks, days, 0, 0, 0, 0, 0, 0);
  }
  year(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].year(date);
  }
  month(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].month(date);
  }
  day(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].day(date);
  }
  era(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].era(date);
  }
  eraYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].eraYear(date);
  }
  monthCode(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].monthCode(date);
  }
  regularMonth(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].regularMonth(date);
  }
  monthType(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].monthType(date);
  }
  dayOfWeek(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].dayOfWeek(date);
  }
  dayOfYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].dayOfYear(date);
  }
  weekOfYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].weekOfYear(date);
  }
  daysInWeek(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].daysInWeek(date);
  }
  daysInMonth(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].daysInMonth(date);
  }
  daysInYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].daysInYear(date);
  }
  monthsInYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].monthsInYear(date);
  }
  inLeapYear(date) {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return impl[GetSlot(this, CALENDAR_ID)].inLeapYear(date);
  }
  toString() {
    if (!ES.IsTemporalCalendar(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR_ID);
  }
  toJSON() {
    return ES.ToString(this);
  }
  static from(item) {
    if (ES.Type(item) === 'Object') {
      if (!('calendar' in item)) return item;
      item = item.calendar;
      if (ES.Type(item) === 'Object' && !('calendar' in item)) return item;
    }
    const stringIdent = ES.ToString(item);
    if (IsBuiltinCalendar(stringIdent)) return new Calendar(stringIdent);
    let calendar;
    try {
      ({ calendar } = ES.ParseISODateTime(stringIdent, { zoneRequired: false }));
    } catch {
      throw new RangeError(`Invalid calendar: ${stringIdent}`);
    }
    if (!calendar) calendar = 'iso8601';
    return new Calendar(calendar);
  }
}

MakeIntrinsicClass(Calendar, 'Temporal.Calendar');
DefineIntrinsic('Temporal.Calendar.from', Calendar.from);

impl['iso8601'] = {
  dateFromFields(fields, overflow, constructor, calendar) {
    // Intentionally alphabetical
    fields = ES.ToRecord(fields, [
      ['day'],
      ['era', undefined],
      ['eraYear', undefined],
      ['month', undefined],
      ['monthCode', undefined],
      ['year', undefined]
    ]);
    fields = resolveNonLunisolarMonth(fields);
    fields = resolveNonEraYear(fields);
    let { year, month, day } = fields;
    ({ year, month, day } = ES.RegulateDate(year, month, day, overflow));
    return new constructor(year, month, day, calendar);
  },
  yearMonthFromFields(fields, overflow, constructor, calendar) {
    // Intentionally alphabetical
    fields = ES.ToRecord(fields, [
      ['era', undefined],
      ['eraYear', undefined],
      ['month', undefined],
      ['monthCode', undefined],
      ['year', undefined]
    ]);
    fields = resolveNonLunisolarMonth(fields);
    fields = resolveNonEraYear(fields);
    let { year, month } = fields;
    ({ year, month } = ES.RegulateYearMonth(year, month, overflow));
    return new constructor(year, month, calendar, 1);
  },
  monthDayFromFields(fields, overflow, constructor, calendar) {
    fields = ES.ToRecord(fields, [['day'], ['month', undefined], ['year', undefined], ['monthCode', undefined]]);
    fields = resolveNonLunisolarMonth(fields);
    let { month, day } = fields;
    ({ month, day } = ES.RegulateMonthDay(month, day, 1972, overflow));
    return new constructor(month, day, calendar, /* referenceISOYear = */ 1972);
  },
  fields(fields) {
    // Some non-ISO calendars accept multiple ways to specify a year and/or a
    // month. Here's where we add this support for all calendars (including
    // ISO), which makes it easier to write cross-calendar code. Note that this
    // only affects only how input is interpreted. `getFields()` output is not
    // affected.
    if (fields.includes('year')) {
      fields.push('era');
      fields.push('eraYear');
    }
    if (fields.includes('month')) {
      fields.push('monthCode');
    }
    return fields;
  },
  mergeFields(fields, additionalFields) {
    // If the user includes one of `fields` as input to `with()`, then the
    // returned fields array will be not be pulled from `this` before `with()`
    // does the merge. For example, if the user calls `date.with({monthCode})`
    // then `month` will be excluded from the merge so the input to the
    // calendar's `dateFromFields()` method will be `{day, monthCode, year}`
    // not `{day, month, monthCode, year}` which would be problematic because
    // the month values could conflict and the calendar wouldn't know which
    // one to use.
    const { era, year, eraYear, month, monthCode, ...original } = fields;
    const {
      year: newYear,
      era: newEra,
      eraYear: newEraYear,
      month: newMonth,
      monthCode: newMonthCode
    } = additionalFields;
    if (newYear === undefined && newEra === undefined && newEraYear === undefined) {
      original.year = year;
      original.era = era;
      original.eraYear = eraYear;
    }
    if (newMonth === undefined && newMonthCode === undefined) {
      original.month = month;
      original.monthCode = monthCode;
    }
    return { ...original, ...additionalFields };
  },
  dateAdd(date, duration, overflow) {
    const { years, months, weeks, days } = duration;
    const year = GetSlot(date, ISO_YEAR);
    const month = GetSlot(date, ISO_MONTH);
    const day = GetSlot(date, ISO_DAY);
    return ES.AddDate(year, month, day, years, months, weeks, days, overflow);
  },
  dateUntil(one, two, largestUnit) {
    return ES.DifferenceDate(
      GetSlot(one, ISO_YEAR),
      GetSlot(one, ISO_MONTH),
      GetSlot(one, ISO_DAY),
      GetSlot(two, ISO_YEAR),
      GetSlot(two, ISO_MONTH),
      GetSlot(two, ISO_DAY),
      largestUnit
    );
  },
  year(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return GetSlot(date, ISO_YEAR);
  },
  month(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return GetSlot(date, ISO_MONTH);
  },
  day(date) {
    if (!HasSlot(date, ISO_DAY)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return GetSlot(date, ISO_DAY);
  },
  era(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return undefined;
  },
  eraYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return GetSlot(date, ISO_YEAR);
  },
  monthCode(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return `${GetSlot(date, ISO_MONTH)}`;
  },
  regularMonth(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return GetSlot(date, ISO_MONTH);
  },
  monthType(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return 'regular';
  },
  dayOfWeek(date) {
    date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return ES.DayOfWeek(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  dayOfYear(date) {
    date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return ES.DayOfYear(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  weekOfYear(date) {
    date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return ES.WeekOfYear(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH), GetSlot(date, ISO_DAY));
  },
  daysInWeek(date) {
    ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return 7;
  },
  daysInMonth(date) {
    if (!HasSlot(date, ISO_YEAR) || !HasSlot(date, ISO_MONTH)) {
      date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    }
    return ES.DaysInMonth(GetSlot(date, ISO_YEAR), GetSlot(date, ISO_MONTH));
  },
  daysInYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return ES.LeapYear(GetSlot(date, ISO_YEAR)) ? 366 : 365;
  },
  monthsInYear(date) {
    if (!HasSlot(date, ISO_YEAR)) ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return 12;
  },
  inLeapYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    return ES.LeapYear(GetSlot(date, ISO_YEAR));
  }
};

// Note: other built-in calendars than iso8601 are not part of the Temporal
// proposal for ECMA-262. An implementation of these calendars is present in
// this polyfill in order to validate the Temporal API and to get early feedback
// about non-ISO calendars. However, non-ISO calendar implementation is subject
// to change because these calendars are implementation-defined.

/**
 * This prototype implementation of non-ISO calendars makes many repeated calls
 * to Intl APIs which may be slow (e.g. >0.2ms). This trivial cache will speed
 * up these repeat accesses. Each cache instance is associated (via a WeakMap)
 * to a specific Temporal object, which speeds up multiple calendar calls on the
 * same Temporal object instance.  No invalidation or pruning is necessary
 * because each object's cache is thrown away when the object is GC-ed.
 */
class OneObjectCache {
  constructor() {
    this.map = new Map();
    this.calls = 0;
    this.now = globalThis.performance ? globalThis.performance.now() : Date.now();
    this.hits = 0;
    this.misses = 0;
  }
  get(key) {
    const result = this.map.get(key);
    if (result) {
      this.hits++;
      this.report();
    }
    this.calls++;
    return result;
  }
  set(key, value) {
    this.map.set(key, value);
    this.misses++;
    this.report();
  }
  report() {
    if (this.calls === 0) return;
    /*
    const ms = (globalThis.performance ? globalThis.performance.now() : Date.now()) - this.now;
    const hitRate = ((100 * this.hits) / this.calls).toFixed(0);
    console.log(`${this.calls} calls in ${ms.toFixed(2)}ms. Hits: ${this.hits} (${hitRate}%). Misses: ${this.misses}.`);
    */
  }
  setObject(obj) {
    if (OneObjectCache.objectMap.get(obj)) throw new RangeError('object already cached');
    OneObjectCache.objectMap.set(obj, this);
    this.report();
  }
}
OneObjectCache.objectMap = new WeakMap();
OneObjectCache.getCacheForObject = function (obj) {
  let cache = OneObjectCache.objectMap.get(obj);
  if (!cache) {
    cache = new OneObjectCache();
    OneObjectCache.objectMap.set(obj, cache);
  }
  return cache;
};

function monthCodeNumberPart(monthCode) {
  if (typeof monthCode !== 'string') {
    throw new RangeError(`monthCode must be a string, not ${ES.Type(monthCode).toLowerCase()}`);
  }
  monthCode = monthCode.trim();
  const month = monthCode.endsWith('L') ? +monthCode.slice(0, -1) : +monthCode;
  if (isNaN(month)) throw new RangeError(`Invalid month code: ${monthCode}`);
  return month;
}

/**
 * Safely merge a month, monthCode pair into an integer month.
 * If both are present, make sure they match.
 * This logic doesn't work for lunisolar calendars!
 * */
function resolveNonLunisolarMonth(calendarDate) {
  let { month, monthCode } = calendarDate;
  if (monthCode === undefined) {
    if (month === undefined) throw new TypeError('Either month or monthCode are required');
    monthCode = `${month}`;
  } else {
    const numberPart = monthCodeNumberPart(monthCode);
    if (month !== undefined && month !== numberPart) {
      throw new RangeError(`monthCode ${monthCode} and month ${month} must match if both are present`);
    }
    if (!/^1?[0-9]$/.test(monthCode)) {
      throw new RangeError(`invalid monthCode: ${monthCode}. Expected: numeric string "1"-"12".`);
    }
    month = numberPart;
  }
  return { ...calendarDate, month, monthCode };
}

/**
 * Safely merge a year, eraYear pair in a calendar that doesn't use eras. We
 * still support passing eraYear to make it easier to write cross-calendar code.
 */
function resolveNonEraYear(calendarDate) {
  let { year, eraYear, era } = calendarDate;
  if (era !== undefined) throw new RangeError('This calendar does not support eras');
  if (eraYear === undefined) {
    if (year === undefined) throw new TypeError('Either year or eraYear are required');
    eraYear = year;
  } else {
    if (year !== undefined && eraYear !== year) {
      throw new RangeError(`year ${year} and eraYear ${eraYear} must match if both are present`);
    }
    year = eraYear;
  }
  return { ...calendarDate, eraYear, year };
}

function toUtcIsoDateString({ isoYear, isoMonth, isoDay }) {
  const yearString = ES.ISOYearString(isoYear);
  const monthString = ES.ISODateTimePartString(isoMonth);
  const dayString = ES.ISODateTimePartString(isoDay);
  return `${yearString}-${monthString}-${dayString}T00:00Z`;
}

function simpleDateDiff(one, two) {
  return {
    years: one.year - two.year,
    months: one.month - two.month,
    days: one.day - two.day
  };
}

/**
 * Implementation that's common to all non-trivial non-ISO calendars
 */
const nonIsoHelperBase = {
  // The properties and methods below here should be the same for all lunar/lunisolar calendars.
  isoToCalendarDate(isoDate, cache) {
    let { year: isoYear, month: isoMonth, day: isoDay } = isoDate;
    const key = JSON.stringify({ func: 'isoToCalendarDate', isoYear, isoMonth, isoDay, id: this.id });
    const cached = cache.get(key);
    if (cached) return cached;

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      calendar: this.id,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      era: this.eraLength,
      timeZone: 'UTC'
    });
    let parts, isoString;
    try {
      isoString = toUtcIsoDateString({ isoYear, isoMonth, isoDay });
      parts = dateTimeFormat.formatToParts(new Date(isoString));
    } catch (e) {
      throw new RangeError(`Invalid ISO date: ${JSON.stringify({ isoYear, isoMonth, isoDay })}`);
    }
    const result = {};
    for (let { type, value } of parts) {
      if (type === 'year') result.eraYear = +value;
      if (type === 'relatedYear') result.eraYear = +value;
      if (type === 'month') {
        const matches = /^([-0-9.]+)(.*?)$/.exec(value);
        if (!matches || matches.length != 3) throw new RangeError(`Unexpected month: ${value}`);
        result.month = +matches[1];
        if (result.month < 1) {
          throw new RangeError(
            `Invalid month ${value} from ${isoString}[c=${this.id}]` +
              ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10527)'
          );
        }
        if (result.month > 13) {
          throw new RangeError(
            `Invalid month ${value} from ${isoString}[c=${this.id}]` +
              ' (probably due to https://bugs.chromium.org/p/v8/issues/detail?id=10529)'
          );
        }
        if (matches[2]) result.monthExtra = matches[2];
      }
      if (type === 'day') result.day = +value;
      if (type === 'era' && value != null && value !== '') {
        // The convention for Temporal era values is lowercase, so following
        // that convention in this prototype. Punctuation is removed, accented
        // letters are normalized, and spaces are replaced with dashes.
        // E.g.: "ERA0" => "era0", "Before R.O.C." => "before-roc", "En’ō" => "eno"
        // The call to normalize() and the replacement regex deals with era
        // names that contain non-ASCII characters like Japanese eras. Also
        // ignore extra content in parentheses like JPN era date ranges.
        value = value.split(' (')[0];
        result.era = value
          .normalize('NFD')
          .replace(/[^-0-9 \p{L}]/gu, '')
          .replace(' ', '-')
          .toLowerCase();
      }
    }
    const calendarDate = this.adjustCalendarDate(result, cache, 'constrain', true);
    if (calendarDate.year === undefined) throw new RangeError(`Missing year converting ${JSON.stringify(isoDate)}`);
    if (calendarDate.month === undefined) throw new RangeError(`Missing month converting ${JSON.stringify(isoDate)}`);
    if (calendarDate.day === undefined) throw new RangeError(`Missing day converting ${JSON.stringify(isoDate)}`);
    cache.set(key, calendarDate);
    return calendarDate;
  },
  validateCalendarDate(calendarDate) {
    let { month, year, day, era, eraYear, monthCode, monthExtra } = calendarDate;
    // When there's a suffix (e.g. "5bis" for a leap month in Chinese calendar)
    // the derived class must deal with it.
    if (monthExtra !== undefined) throw new RangeError('Unexpected `monthExtra` value');
    if (year === undefined && eraYear === undefined) throw new TypeError('year or eraYear is required');
    if (month === undefined && monthCode === undefined) throw new TypeError('month or monthCode is required');
    if (day === undefined) throw new RangeError('Missing day');
    if (eraYear !== undefined && era === undefined && this.hasEra) throw new TypeError('era is required');
    if (era !== undefined && !this.hasEra) throw new RangeError(`No eras in ${this.id} calendar`);
    if (era !== undefined && eraYear === undefined && this.hasEra) throw new TypeError('eraYear is required');
    if (monthCode !== undefined) {
      if (typeof monthCode !== 'string') {
        throw new RangeError(`monthCode must be a string, not ${ES.Type(monthCode).toLowerCase()}`);
      }
      if (!/^(1?\d)(L?)$/.test(monthCode)) throw new RangeError(`Invalid monthCode: ${monthCode}`);
    }
  },
  /**
   * Allows derived calendars to add additional fields and/or to make
   * adjustments e.g. to set the era based on the date or to revise the month
   * number in lunisolar calendars per
   * https://github.com/tc39/proposal-temporal/issues/1203.
   *
   * The base implementation fills in missing values by assuming the simplest
   * possible calendar:
   * - no eras or a constant era defined in `.constantEra`
   * - non-lunisolar calendar (no leap months)
   * */
  adjustCalendarDate(calendarDate /*, cache, overflow, fromLegacyDate = false */) {
    if (this.calendarType === 'lunisolar') throw new RangeError('Override required for lunisolar calendars');
    this.validateCalendarDate(calendarDate);
    let { month, year, eraYear, monthCode } = calendarDate;
    if (year === undefined) year = eraYear;
    if (eraYear === undefined) eraYear = year;
    if (monthCode !== undefined) {
      month = +monthCode;
    }
    // For calendars that always use the same era, set it here so that derived
    // calendars won't need to implement this method simply to set the era.
    if (this.constantEra) calendarDate = { ...calendarDate, era: this.constantEra };
    return { ...calendarDate, year, eraYear, month, monthCode: `${month}` };
  },
  regulateMonthDayNaive(calendarDate, overflow, cache) {
    const largestMonth = this.monthsInYear(calendarDate, cache);
    let { month, day } = calendarDate;
    if (overflow === 'reject') {
      if (month < 1 || month > largestMonth) throw new RangeError(`Invalid month: ${month}`);
      if (day < 1 || day > this.maximumMonthLength(calendarDate)) throw new RangeError(`Invalid day: ${day}`);
    } else {
      if (month < 1) month = 1;
      if (month > largestMonth) month = largestMonth;
      if (day < 1) day = 1;
      if (day > this.maximumMonthLength(calendarDate)) day = this.maximumMonthLength(calendarDate);
    }
    return { ...calendarDate, month, day };
  },
  calendarToIsoDate(date, overflow = 'constrain', cache) {
    // First, normalize the calendar date to ensure that (year, month, day)
    // are all present, converting monthCode and eraYear if needed.
    date = this.adjustCalendarDate(date, cache, overflow, false);

    // Fix obviously out-of-bounds values. Values that are valid generally, but
    // not in this particular year, will be handled lower below.
    date = this.regulateMonthDayNaive(date, overflow, cache);

    const { year, month, day } = date;
    const key = JSON.stringify({ func: 'calendarToIsoDate', year, month, day, overflow, id: this.id });
    const cached = cache.get(key);
    if (cached) return cached;

    // First, try to roughly guess the result
    let isoEstimate = this.estimateIsoDate({ year, month, day });
    const calculateSameMonthResult = (diffDays) => {
      // If the estimate is in the same year & month as the target, then we can
      // calculate the result exactly and short-circuit any additional logic.
      // This optimization assumes that months are continuous (no skipped days)
      // so it breaks in the case of calendar changes like 1582's skipping of
      // days in October in the Roman calendar. This is just a prototype
      // implementation so this error is OK for now.
      let testIsoEstimate = this.addDaysIso(isoEstimate, diffDays);
      if (date.day > this.minimumMonthLength(date)) {
        // There's a chance that the calendar date is out of range. Throw or
        // constrain if so.
        let testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
        while (testCalendarDate.month !== month || testCalendarDate.year !== year) {
          if (overflow === 'reject') {
            throw new RangeError(`day ${day} does not exist in month ${month} of year ${year}`);
          }
          // Back up a day at a time until we're not hanging over the month end
          testIsoEstimate = this.addDaysIso(testIsoEstimate, -1);
          testCalendarDate = this.isoToCalendarDate(testIsoEstimate, cache);
        }
      }
      return testIsoEstimate;
    };
    let roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
    let diff = simpleDateDiff(date, roundtripEstimate);
    const diffTotalDaysEstimate = diff.years * 365 + diff.months * 30 + diff.days;
    isoEstimate = this.addDaysIso(isoEstimate, diffTotalDaysEstimate);
    roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
    diff = simpleDateDiff(date, roundtripEstimate);
    let sign = 0;
    if (diff.years === 0 && diff.months === 0) {
      isoEstimate = calculateSameMonthResult(diff.days);
    } else {
      sign = this.compareCalendarDates(date, roundtripEstimate);
    }

    // If the initial guess is not in the same month, then then bisect the
    // distance to the target, starting with 8 days per step.
    let increment = 8;
    while (sign) {
      isoEstimate = this.addDaysIso(isoEstimate, sign * increment);
      const oldRoundtripEstimate = roundtripEstimate;
      roundtripEstimate = this.isoToCalendarDate(isoEstimate, cache);
      const oldSign = sign;
      sign = this.compareCalendarDates(date, roundtripEstimate);
      if (sign) {
        diff = simpleDateDiff(date, roundtripEstimate);
        if (diff.years === 0 && diff.months === 0) {
          isoEstimate = calculateSameMonthResult(diff.days);
          sign = 0; // signal the loop condition that there's a match.
        } else if (oldSign && sign !== oldSign) {
          if (increment > 1) {
            // If the estimate overshot the target, try again with a smaller increment
            // in the reverse direction.
            increment /= 2;
          } else {
            // Increment is 1, and neither the previous estimate nor the new
            // estimate is correct. The only way that can happen is if the
            // original date was an invalid value that will be constrained or
            // rejected here.
            if (overflow === 'reject') {
              throw new RangeError(`Can't find ISO date from calendar date: ${JSON.stringify({ year, month, day })}`);
            } else {
              // To constrain, pick the earliest value
              const order = this.compareCalendarDates(roundtripEstimate, oldRoundtripEstimate);
              // If current value is larger, then back up to the previous value.
              if (order > 0) isoEstimate = this.addDaysIso(isoEstimate, -1);
              sign = 0;
            }
          }
        }
      }
    }
    cache.set(key, isoEstimate);
    return isoEstimate;
  },
  temporalToCalendarDate(date, cache) {
    const isoDate = { year: GetSlot(date, ISO_YEAR), month: GetSlot(date, ISO_MONTH), day: GetSlot(date, ISO_DAY) };
    const result = this.isoToCalendarDate(isoDate, cache);
    return result;
  },
  compareCalendarDates(date1, date2) {
    // `date1` and `date2` are already records. The calls below simply validate
    // that all three required fields are present.
    date1 = ES.ToRecord(date1, [['day'], ['month'], ['year']]);
    date2 = ES.ToRecord(date2, [['day'], ['month'], ['year']]);
    if (date1.year !== date2.year) return ES.ComparisonResult(date1.year - date2.year);
    // NOTE: we're assuming that month numbers correspond to chronological order for a given year
    if (date1.month !== date2.month) return ES.ComparisonResult(date1.month - date2.month);
    if (date1.day !== date2.day) return ES.ComparisonResult(date1.day - date2.day);
    return 0;
  },
  /** Ensure that a calendar date actually exists. If not, return the closest earlier date. */
  regulateDate(calendarDate, overflow = 'constrain', cache) {
    const isoDate = this.calendarToIsoDate(calendarDate, overflow, cache);
    return this.isoToCalendarDate(isoDate, cache);
  },
  addDaysIso(isoDate, days) {
    const added = ES.AddDate(isoDate.year, isoDate.month, isoDate.day, 0, 0, 0, days, 'constrain');
    return added;
  },
  addDaysCalendar(calendarDate, days, cache) {
    const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
    const addedIso = this.addDaysIso(isoDate, days);
    const addedCalendar = this.isoToCalendarDate(addedIso, cache);
    return addedCalendar;
  },
  addMonthsCalendar(calendarDate, months, overflow, cache) {
    const { day } = calendarDate;
    for (let i = 0, absMonths = Math.abs(months); i < absMonths; i++) {
      const days = months < 0 ? -this.daysInPreviousMonth(calendarDate, cache) : this.daysInMonth(calendarDate, cache);
      const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
      const addedIso = this.addDaysIso(isoDate, days, cache);
      calendarDate = this.isoToCalendarDate(addedIso, cache);
      if (calendarDate.day !== day) {
        // try to retain the original day-of-month, if possible
        calendarDate = this.regulateDate({ ...calendarDate, day }, 'constrain', cache);
      }
    }
    if (overflow === 'reject' && calendarDate.day !== day) {
      throw new RangeError(`Day ${day} does not exist in resulting calendar month`);
    }
    return calendarDate;
  },
  addCalendar(calendarDate, { years = 0, months = 0, weeks = 0, days = 0 }, overflow, cache) {
    const { year, month, day } = calendarDate;
    const addedMonths = this.addMonthsCalendar({ year: year + years, month, day }, months, overflow, cache);
    days += weeks * 7;
    const addedDays = this.addDaysCalendar(addedMonths, days, cache);
    return addedDays;
  },
  untilCalendar(calendarOne, calendarTwo, largestUnit, cache) {
    let days = 0;
    let weeks = 0;
    let months = 0;
    let years = 0;
    switch (largestUnit) {
      case 'days':
        days = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
        break;
      case 'weeks': {
        const totalDays = this.calendarDaysUntil(calendarOne, calendarTwo, cache);
        days = totalDays % 7;
        weeks = (totalDays - days) / 7;
        break;
      }
      case 'months':
      case 'years': {
        const diffYears = calendarTwo.year - calendarOne.year;
        const diffMonths = calendarTwo.month - calendarOne.month;
        const diffDays = calendarTwo.day - calendarOne.day;
        const sign = this.compareCalendarDates(calendarTwo, calendarOne);
        if (largestUnit === 'years' && diffYears) {
          const isOneFurtherInYear = diffMonths * sign < 0 || (diffMonths === 0 && diffDays * sign < 0);
          years = isOneFurtherInYear ? diffYears - sign : diffYears;
        }
        const yearsAdded = years ? this.addCalendar(calendarOne, { years }, 'constrain', cache) : calendarOne;
        // Now we have less than one year remaining. Add one month at a time
        // until we go over the target, then back up one month and calculate
        // remaining days and weeks.
        let current;
        let next = yearsAdded;
        do {
          months++;
          current = next;
          next = this.addMonthsCalendar(current, sign, 'constrain', cache);
          if (next.day !== calendarOne.day) {
            // In case the day was constrained down, try to un-constrain it
            next = this.regulateDate({ ...next, day: calendarOne.day }, 'constrain', cache);
          }
        } while (this.compareCalendarDates(calendarTwo, next) * sign >= 0);
        months--; // correct for loop above which overshoots by 1
        const remainingDays = this.calendarDaysUntil(current, calendarTwo, cache);
        days = remainingDays % 7;
        weeks = (remainingDays - days) / 7;
        break;
      }
    }
    return { years, months, weeks, days };
  },
  daysInMonth(calendarDate, cache) {
    // Add the length of the smallest possible month. If it rolls over to the
    // next month, then back up to the end of the previous month to know its day
    // count. If it doesn't roll over, add the same number of days again until
    // we get a rollover.
    //
    // NOTE: This won't work for months where days are skipped (e.g. Gregorian
    // switchover) which is OK because this is a prototype implementation.
    const { month: originalCalendarMonth } = calendarDate;
    const increment = this.minimumMonthLength(calendarDate);

    // easiest case: we already know the month length if min and max are the same.
    if (increment === this.maximumMonthLength(calendarDate)) return increment;

    let addedIsoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
    let addedCalendarDate;
    do {
      addedIsoDate = this.addDaysIso(addedIsoDate, increment);
      addedCalendarDate = this.isoToCalendarDate(addedIsoDate, cache);
    } while (addedCalendarDate.month === originalCalendarMonth);

    // Now back up to the last day of the original month
    const endOfMonthIso = this.addDaysIso(addedIsoDate, -addedCalendarDate.day);
    const endOfMonthCalendar = this.isoToCalendarDate(endOfMonthIso, cache);
    return endOfMonthCalendar.day;
  },
  daysInPreviousMonth(calendarDate, cache) {
    const { day, month, year } = calendarDate;

    // Check to see if we already know the month length, and return it if so
    const previousMonthYear = month > 1 ? year : year - 1;
    let previousMonthDate = { year: previousMonthYear, month, day: 1 };
    const previousMonth = month > 1 ? month - 1 : this.monthsInYear(previousMonthDate, cache);
    previousMonthDate = { ...previousMonthDate, month: previousMonth };
    const min = this.minimumMonthLength(previousMonthDate);
    const max = this.maximumMonthLength(previousMonthDate);
    if (min === max) return max;

    const isoDate = this.calendarToIsoDate(calendarDate, 'constrain', cache);
    const lastDayOfPreviousMonthIso = this.addDaysIso(isoDate, -day);
    const lastDayOfPreviousMonthCalendar = this.isoToCalendarDate(lastDayOfPreviousMonthIso, cache);
    return lastDayOfPreviousMonthCalendar.day;
  },
  startOfCalendarYear(calendarDate) {
    return { year: calendarDate.year, month: 1, day: 1 };
  },
  startOfCalendarMonth(calendarDate) {
    return { year: calendarDate.year, month: calendarDate.month, day: 1 };
  },
  calendarDaysUntil(calendarOne, calendarTwo, cache) {
    const oneIso = this.calendarToIsoDate(calendarOne, 'constrain', cache);
    const twoIso = this.calendarToIsoDate(calendarTwo, 'constrain', cache);
    return this.isoDaysUntil(oneIso, twoIso);
  },
  isoDaysUntil(oneIso, twoIso) {
    const duration = ES.DifferenceDate(
      oneIso.year,
      oneIso.month,
      oneIso.day,
      twoIso.year,
      twoIso.month,
      twoIso.day,
      'days'
    );
    return duration.days;
  },
  // The short era format works for all calendars except Japanese, which will
  // override.
  eraLength: 'short',
  // All built-in calendars except Chinese/Dangi and Hebrew use an era
  hasEra: true,
  getRegularMonth(calendarDate) {
    // this will be accurate for all calendars except Hebrew, which will override
    return monthCodeNumberPart(calendarDate.monthCode);
  },
  monthDayFromFields(fields, overflow, cache) {
    let { year, month, monthCode, day, era, eraYear } = fields;
    if (
      this.calendarType === 'lunisolar' &&
      year === undefined &&
      (era === undefined || eraYear === undefined) &&
      monthCode === undefined
    ) {
      throw new TypeError('`monthCode` or `year` is required when using a lunisolar calendar');
    }
    // For non-lunisolar calendars, monthCode is the string equivalent of the month index
    if (this.calendarType !== 'lunisolar' && monthCode === undefined) monthCode = ES.ToString(month);

    if (year === undefined && eraYear !== undefined && era !== undefined) {
      // TODO: calculate year from era/eraYear
      throw new TypeError('era/eraYear resolution is not yet supported for Temporal.MonthDay');
    }

    let isoYear, isoMonth, isoDay;
    let closest;
    if (year === undefined) {
      const today = new Date();
      const currentDateIso = { year: today.getUTCFullYear(), month: today.getUTCMonth() + 1, day: today.getUTCDate() };
      const { year: calendarYear } = this.isoToCalendarDate(currentDateIso, cache);

      // Look backwards up to 100 years to find a year that has this month and
      // day. Normal months and days will match immediately, but for leap days
      // and leap months we may have to look for a while.
      for (let i = 0; i < 100; i++) {
        const testCalendarDate = { day, monthCode, year: calendarYear - i };
        ({ year: isoYear, month: isoMonth, day: isoDay } = this.calendarToIsoDate(
          testCalendarDate,
          'constrain',
          cache
        ));
        if (isoMonth === month && isoDay === day) {
          return { month: isoMonth, day: isoDay, year: isoYear };
        } else if (overflow === 'constrain') {
          const constrained = this.regulateDate(testCalendarDate, 'constrain', cache);
          // non-ISO constrain algorithm tries to find the closest date in a matching month
          if (
            closest === undefined ||
            constrained.month > closest.month ||
            (constrained.month === closest.month && constrained.day > closest.day)
          ) {
            closest = constrained;
          }
        }
      }
      if (overflow === 'constrain' && closest !== undefined) return closest;
      throw new RangeError(`No recent ${this.id} year with month ${monthCode} and day ${day}`);
    } else {
      // If we get here, we know the year so it's easy
      const { year: isoYear, month: isoMonth, day: isoDay } = this.calendarToIsoDate(
        { day, monthCode, year },
        overflow,
        cache
      );
      return { month: isoMonth, day: isoDay, year: isoYear };
    }
  }
};

const helperHebrew = ObjectAssign({}, nonIsoHelperBase, {
  id: 'hebrew',
  calendarType: 'lunisolar',
  inLeapYear(calendarDate /*, cache */) {
    const { year } = calendarDate;
    // FYI: In addition to adding a month in leap years, the Hebrew calendar
    // also has per-year changes to the number of days of Heshvan and Kislev.
    // Given that these can be calculated by counting the number of days in
    // those months, I assume that these DO NOT need to be exposed as
    // Hebrew-only prototype fields or methods.
    return (7 * year + 1) % 19 < 7;
  },
  monthsInYear(calendarDate) {
    return this.inLeapYear(calendarDate) ? 13 : 12;
  },
  minimumMonthLength(calendarDate) {
    return this.minMaxMonthLength(calendarDate, 'min');
  },
  maximumMonthLength(calendarDate) {
    return this.minMaxMonthLength(calendarDate, 'max');
  },
  minMaxMonthLength(calendarDate, minOrMax) {
    const { month, year } = calendarDate;
    const monthCode = this.getMonthCode(year, month);
    const monthInfo = Object.entries(this.months).find((m) => m[1].monthCode === monthCode);
    if (monthInfo === undefined) throw new TypeError(`unmatched Hebrew month: ${month}`);
    const daysInMonth = monthInfo[1].days;
    return typeof daysInMonth === 'number' ? daysInMonth : daysInMonth[minOrMax];
  },
  /** Take a guess at what ISO date a particular calendar date corresponds to */
  estimateIsoDate(calendarDate) {
    const { year } = calendarDate;
    return { year: year - 3760, month: 1, day: 1 };
  },
  months: {
    Tishri: { leap: 1, regular: 1, monthCode: '1', days: 30 },
    Heshvan: { leap: 2, regular: 2, monthCode: '2', days: { min: 29, max: 30 } },
    Kislev: { leap: 3, regular: 3, monthCode: '3', days: { min: 29, max: 30 } },
    Tevet: { leap: 4, regular: 4, monthCode: '4', days: 29 },
    Shevat: { leap: 5, regular: 5, monthCode: '5', days: 30 },
    Adar: { leap: undefined, regular: 6, monthCode: '6', days: 29 },
    'Adar I': { leap: 6, regular: undefined, monthCode: '5L', days: 30 },
    'Adar II': { leap: 7, regular: undefined, monthCode: '6', days: 29 },
    Nisan: { leap: 8, regular: 7, monthCode: '7', days: 30 },
    Iyar: { leap: 9, regular: 8, monthCode: '8', days: 29 },
    Sivan: { leap: 10, regular: 9, monthCode: '9', days: 30 },
    Tamuz: { leap: 11, regular: 10, monthCode: '10', days: 29 },
    Av: { leap: 12, regular: 11, monthCode: '11', days: 30 },
    Elul: { leap: 13, regular: 12, monthCode: '12', days: 29 }
  },
  getMonthCode(year, month) {
    if (this.inLeapYear({ year })) {
      return month === 6 ? '5L' : `${month < 6 ? month : month - 1}`;
    } else {
      return `${month}`;
    }
  },
  getRegularMonth(calendarDate) {
    // For non-lunisolar calendars, `regularMonth` is the same as `month`. For
    // lunisolar calendars, `regularMonth` also the same as `month` for months
    // in non-leap years. However, in years with leap months, `regularMonth`
    // will refer to the corresponding regular month for each month. For
    // example, in a Hebrew leap year:
    // 5th month: { month: 5, monthCode: "5", regularMonth: 5, monthType: "regular" }
    // 6th month: { month: 6, monthCode: "5L", regularMonth: 6, monthType: "leap" }
    // 7th month: { month: 7, monthCode: "6", regularMonth: 6, monthType: "regular" }
    // 8th month: { month: 8, monthCode: "7", regularMonth: 7, monthType: "regular" }
    // Note that Chinese (the only other ICU lunisolar calendar) the regular
    // month is the same as the numeric part of the month code, so the base
    // helper implementation is OK.
    const { monthCode } = calendarDate;
    if (monthCode === undefined) throw new TypeError('missing monthCode');
    return monthCode === '5L' ? '6' : +monthCode;
  },
  adjustCalendarDate(calendarDate, cache, overflow = 'constrain', fromLegacyDate = false) {
    // The current Intl implementation skips index 6 (Adar I) in non-leap years
    let { year, eraYear, month, monthCode, day, monthExtra } = calendarDate;
    if (year === undefined) year = eraYear;
    if (eraYear === undefined) eraYear = year;
    if (fromLegacyDate) {
      // DateTimeFormat.formatToParts returns either a numeric string (e.g. "4")
      // or the name of a month (e.g. "Tevet"), even when the month format is
      // set to 'numeric. Even running the same exact code in the Chrome dev
      // tools debugger yields different results!  I assume it's a caching bug
      // somewhere in the Intl code. I've not been able to reproduce the cause
      // of the divergent behavior. But given that this implementation is a
      // prototype and will be thrown away in a few months, for now we'll defend
      // against this behavior here by handling either a numeric string or a
      // name.
      if (monthExtra) {
        const monthInfo = this.months[monthExtra];
        if (!monthInfo) throw new RangeError(`Unrecognized month from formatToParts: ${monthExtra}`);
        month = this.inLeapYear({ year }) ? monthInfo.leap : monthInfo.regular;
      }
      monthCode = this.getMonthCode(year, month);
      const result = { year, month, day, era: undefined, eraYear, monthCode };
      return result;
    } else {
      // When called without input coming from legacy Date output, simply ensure
      // that all fields are present.
      this.validateCalendarDate(calendarDate);
      if (month === undefined) {
        if (monthCode.endsWith('L')) {
          if (monthCode !== '5L') throw new RangeError(`Hebrew leap month must have monthCode 5L, not ${monthCode}`);
          month = 6;
          if (!this.inLeapYear({ year })) {
            if (overflow === 'reject') {
              throw new RangeError(`Hebrew monthCode 5L is invalid in year ${year} which is not a leap year`);
            } else {
              // constrain to last day of previous month (Av)
              month = 5;
              day = 30;
            }
          }
        } else {
          month = monthCodeNumberPart(monthCode);
          // if leap month is before this one, the month index is one more than the month code
          if (this.inLeapYear({ year }) && month > 6) month++;
        }
      }
      if (monthCode === undefined) monthCode = this.getMonthCode(year, month);
      return { ...calendarDate, month, monthCode, year, eraYear };
    }
  },
  // All built-in calendars except Chinese/Dangi and Hebrew use an era
  hasEra: false
});

/**
 * For Temporal purposes, the Islamic calendar is simple because it's always the
 * same 12 months in the same order.
 */
const helperIslamic = ObjectAssign({}, nonIsoHelperBase, {
  id: 'islamic',
  calendarType: 'lunar',
  inLeapYear(calendarDate, cache) {
    // In leap years, the 12th month has 30 days. In non-leap years: 29.
    const days = this.daysInMonth({ year: calendarDate.year, month: 12, day: 1 }, cache);
    return days === 30;
  },
  monthsInYear(/* calendarYear, cache */) {
    return 12;
  },
  minimumMonthLength: (/* calendarDate */) => 29,
  maximumMonthLength: (/* calendarDate */) => 30,
  DAYS_PER_ISLAMIC_YEAR: 354 + 11 / 30,
  DAYS_PER_ISO_YEAR: 365.2425,
  constantEra: 'ah',
  estimateIsoDate(calendarDate) {
    const { year } = this.adjustCalendarDate(calendarDate);
    return { year: Math.floor((year * this.DAYS_PER_ISLAMIC_YEAR) / this.DAYS_PER_ISO_YEAR) + 622, month: 1, day: 1 };
  }
});

const helperPersian = ObjectAssign({}, nonIsoHelperBase, {
  id: 'persian',
  calendarType: 'solar',
  inLeapYear(calendarDate, cache) {
    // Same logic (count days in the last month) for Persian as for Islamic,
    // even though Persian is solar and Islamic is lunar.
    return helperIslamic.inLeapYear(calendarDate, cache);
  },
  monthsInYear(/* calendarYear, cache */) {
    return 12;
  },
  minimumMonthLength(calendarDate) {
    const { month } = calendarDate;
    if (month === 12) return 29;
    return month <= 6 ? 31 : 30;
  },
  maximumMonthLength(calendarDate) {
    const { month } = calendarDate;
    if (month === 12) return 30;
    return month <= 6 ? 31 : 30;
  },
  constantEra: 'ap',
  estimateIsoDate(calendarDate) {
    const { year } = this.adjustCalendarDate(calendarDate);
    return { year: year + 621, month: 1, day: 1 };
  }
});

const helperIndian = ObjectAssign({}, nonIsoHelperBase, {
  id: 'indian',
  calendarType: 'solar',
  inLeapYear(calendarDate /*, cache*/) {
    // From https://en.wikipedia.org/wiki/Indian_national_calendar:
    // Years are counted in the Saka era, which starts its year 0 in the year 78
    // of the Common Era. To determine leap years, add 78 to the Saka year – if
    // the result is a leap year in the Gregorian calendar, then the Saka year
    // is a leap year as well.
    return isGregorianLeapYear(calendarDate.year + 78);
  },
  monthsInYear(/* calendarYear, cache */) {
    return 12;
  },
  minimumMonthLength(calendarDate) {
    const { month } = calendarDate;
    if (month === 1) return this.inLeapYear(calendarDate) ? 31 : 30;
    return month <= 6 ? 31 : 30;
  },
  maximumMonthLength(calendarDate) {
    return this.minimumMonthLength(calendarDate);
  },
  constantEra: 'saka',
  estimateIsoDate(calendarDate) {
    const { year } = this.adjustCalendarDate(calendarDate);
    // The Indian calendar has a 1:1 correspondence to the ISO calendar. Indian
    // months always start at the same well-known Gregorian month and day. So
    // this conversion could be easy and much faster. See
    // https://en.wikipedia.org/wiki/Indian_national_calendar
    return { year: year + 78, month: 1, day: 1 };
  }
});

/**
 * This function adds additional metadata that makes it easier to work with
 * eras. Note that it mutates and normalizes the original era data.
 *
 * The result is an array of eras with this shape:
 * ```
 * interface Era {
 *   // name of the era
 *   name: string;
 *
 *   // Signed calendar year where this era begins. Will be
 *   // 1 (or 0 for zero-based eras) for the anchor era. In
 *   // cases where an era starts mid-year (e.g. Japanese)
 *   // then a calendar month and day are included. Otherwise
 *   // `{ month: 1, day: 1 }` is assumed.
 *   anchorEpoch:  { year: number } | { year: number, month: number, day: number }
 *
 *   // ISO date of the first day of this era
 *   isoEpoch: { year: number, month: number, day: number}
 *
 *   // If present, then this era counts years backwards like BC
 *   // and this property points to the forward era. This must be
 *   // the last (oldest) era in the array.
 *   reverseOf: Era;
 *
 *   // If true, the era's years are 0-based. If omitted or false,
 *   // then the era's years are 1-based.
 *   hasYearZero: boolean = false;
 * }
 * ```
 * */
function adjustEras(eras) {
  if (eras.length === 0) {
    throw new RangeError('Invalid era data: eras are required');
  }
  if (eras.length === 1 && eras[0].reverseOf) {
    throw new RangeError('Invalid era data: anchor era cannot count years backwards');
  }
  if (eras.length === 1 && eras[0].reverseOf) {
    throw new RangeError('Invalid era data: anchor era cannot count years backwards');
  }
  if (eras.filter((e) => e.reverseOf != null).length > 1) {
    throw new RangeError('Invalid era data: only one era can count years backwards');
  }

  // Find the "anchor era" which is the default era used when eraYear is
  // specified without also providing an era. Reversed eras can never be
  // anchors. The era without an `anchorEpoch` property is the anchor.
  let anchorEra;
  eras.forEach((e) => {
    if (e.isAnchor || (!e.anchorEpoch && !e.reverseOf)) {
      if (anchorEra) throw new RangeError('Invalid era data: cannot have multiple anchor eras');
      anchorEra = e;
      e.anchorEpoch = { year: e.hasYearZero ? 0 : 1 };
    }
  });
  eras.forEach((e) => {
    // Some eras are mirror images of another era e.g. B.C. is the reverse of A.D.
    // Replace the string-valued "reverseOf" property with the actual era object
    // that's reversed.
    const { reverseOf } = e;
    if (reverseOf) {
      const reversedEra = eras.find((era) => era.name === reverseOf);
      if (reversedEra === undefined) throw new RangeError(`Invalid era data: unmatched reverseOf era: ${reverseOf}`);
      e.reverseOf = reversedEra;
      e.anchorEpoch = reversedEra.anchorEpoch;
      e.isoEpoch = reversedEra.isoEpoch;
    }
    if (e.anchorEpoch.month === undefined) e.anchorEpoch.month = 1;
    if (e.anchorEpoch.day === undefined) e.anchorEpoch.day = 1;
  });

  // Ensure that the latest epoch is first in the array. This lets us try to
  // match eras in index order, with the last era getting the remaining older
  // years. Any reverse-signed era must be at the end.
  eras.sort((e1, e2) => {
    if (e1.reverseOf) return e2;
    if (e2.reverseOf) return e1;
    return e2.isoEpoch.year - e1.isoEpoch.year;
  });

  // If there's a reversed era, then the one before it must be the era that's
  // being reversed.
  const lastEraReversed = eras[eras.length - 1].reverseOf;
  if (lastEraReversed) {
    if (lastEraReversed !== eras[eras.length - 2]) throw new RangeError('Invalid era data: invalid reverse-sign era');
  }

  return { eras, anchorEra: anchorEra || eras[0] };
}

function isGregorianLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/** Base for all Gregorian-like calendars. */
const makeHelperGregorian = (id, originalEras) => {
  const { eras, anchorEra } = adjustEras(originalEras);
  return ObjectAssign({}, nonIsoHelperBase, {
    id,
    eras,
    anchorEra,
    calendarType: 'solar',
    inLeapYear(calendarDate /*, cache */) {
      const { year } = this.estimateIsoDate(calendarDate);
      return isGregorianLeapYear(year);
    },
    monthsInYear(/* calendarDate */) {
      return 12;
    },
    minimumMonthLength(calendarDate) {
      const { month } = calendarDate;
      if (month === 2) return this.inLeapYear(calendarDate) ? 29 : 28;
      return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
    },
    maximumMonthLength(calendarDate) {
      return this.minimumMonthLength(calendarDate);
    },
    /** Fill in missing parts of the (year, era, eraYear) tuple */
    completeEraYear(calendarDate) {
      const checkField = (name, value) => {
        const currentValue = calendarDate[name];
        if (currentValue != null && currentValue != value) {
          throw new RangeError(`Input ${name} ${currentValue} doesn't match calculated value ${value}`);
        }
      };

      let { year, eraYear, era } = calendarDate;
      if (year != null) {
        const matchingEra = this.eras.find((e, i) => {
          if (i === this.eras.length - 1) {
            if (e.reverseOf) {
              // This is a reverse-sign era (like BC) which must be the oldest
              // era. Count years backwards.
              if (year > 0) throw new RangeError(`Signed year ${year} is invalid for era ${e.name}`);
              eraYear = e.anchorEpoch.year - year;
              return true;
            }
            // last era always gets all "leftover" (older than epoch) years,
            // so no need for a comparison like below.
            eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
            return true;
          }
          const comparison = nonIsoHelperBase.compareCalendarDates(calendarDate, e.anchorEpoch);
          if (comparison >= 0) {
            eraYear = year - e.anchorEpoch.year + (e.hasYearZero ? 0 : 1);
            return true;
          }
          return false;
        });
        if (!matchingEra) throw new RangeError(`Year ${year} was not matched by any era`);
        era = matchingEra.name;
        checkField('era', era);
        checkField('eraYear', eraYear);
      } else if (eraYear != null) {
        const matchingEra = era === undefined ? this.anchorEra : this.eras.find((e) => e.name === era);
        if (!matchingEra) throw new RangeError(`Era ${era} (ISO year ${eraYear}) was not matched by any era`);
        if (eraYear < 1 && matchingEra.reverseOf) {
          throw new RangeError(`Years in ${era} era must be positive, not ${year}`);
        }
        if (matchingEra.reverseOf) {
          year = matchingEra.anchorEpoch.year - eraYear;
        } else {
          year = eraYear + matchingEra.anchorEpoch.year - (matchingEra.hasYearZero ? 0 : 1);
        }
        checkField('year', year);
      } else {
        throw new RangeError('Either `year` or `eraYear` and `era` are required');
      }
      return { ...calendarDate, year, eraYear, era };
    },
    adjustCalendarDate(calendarDate /*, cache, overflow, fromLegacyDate = false */) {
      // Because this is not a lunisolar calendar, it's safe to convert monthCode to a number
      const { month, monthCode } = calendarDate;
      if (month === undefined) calendarDate = { ...calendarDate, month: monthCodeNumberPart(monthCode) };
      this.validateCalendarDate(calendarDate);
      calendarDate = this.completeEraYear(calendarDate);
      calendarDate = nonIsoHelperBase.adjustCalendarDate(calendarDate);
      return calendarDate;
    },
    estimateIsoDate(calendarDate) {
      calendarDate = this.adjustCalendarDate(calendarDate);
      const { year, month, day } = calendarDate;
      const { anchorEra } = this;
      const isoYearEstimate = year + anchorEra.isoEpoch.year - (anchorEra.hasYearZero ? 0 : 1);
      return ES.RegulateDate(isoYearEstimate, month, day, 'constrain');
    }
  });
};

const makeHelperOrthodox = (id, originalEras) => {
  const base = makeHelperGregorian(id, originalEras);
  return ObjectAssign(base, {
    inLeapYear(calendarDate /*, cache */) {
      // Leap years happen one year before the Julian leap year. Note that this
      // calendar is based on the Julian calendar which has a leap year every 4
      // years, unlike the Gregorian calendar which doesn't have leap years on
      // years divisible by 100 except years divisible by 400.
      //
      // Note that we're assuming that leap years in before-epoch times match
      // how leap years are defined now. This is probably not accurate but I'm
      // not sure how better to do it.
      const { year } = calendarDate;
      return (year + 1) % 4 === 0;
    },
    monthsInYear(/* calendarDate */) {
      return 13;
    },
    minimumMonthLength(calendarDate) {
      const { month } = calendarDate;
      // Ethiopian/Coptic calendars have 12 30-day months and an extra 5-6 day 13th month.
      if (month === 13) return this.inLeapYear(calendarDate) ? 6 : 5;
      return 30;
    },
    maximumMonthLength(calendarDate) {
      return this.minimumMonthLength(calendarDate);
    }
  });
};

// `coptic` and `ethiopic` calendars are very similar to `ethioaa` calendar,
// with the following differences:
// - Coptic uses BC-like positive numbers for years before its epoch (the other
//   two use negative year numbers before epoch)
// - Coptic has a different epoch date
// - Ethiopic has an additional second era that starts at the same date as the
//   zero era of ethioaa.
const helperEthioaa = makeHelperOrthodox('ethioaa', [{ name: 'era0', isoEpoch: { year: -5492, month: 7, day: 17 } }]);
const helperCoptic = makeHelperOrthodox('coptic', [
  { name: 'era1', isoEpoch: { year: 284, month: 8, day: 29 } },
  { name: 'era0', reverseOf: 'era1' }
]);
// Anchor is currently the older era to match ethioaa, but should it be the newer era?
const helperEthiopic = makeHelperOrthodox('ethiopic', [
  { name: 'era0', isoEpoch: { year: -5492, month: 7, day: 17 } },
  { name: 'era1', isoEpoch: { year: 8, month: 8, day: 27 }, anchorEpoch: { year: 5501 } }
]);

const helperRoc = makeHelperGregorian('roc', [
  { name: 'minguo', isoEpoch: { year: 1912, month: 1, day: 1 } },
  { name: 'before-roc', reverseOf: 'minguo' }
]);

const helperBuddhist = makeHelperGregorian('buddhist', [
  { name: 'be', hasYearZero: true, isoEpoch: { year: -543, month: 1, day: 1 } }
]);

const helperGregory = makeHelperGregorian('gregory', [
  { name: 'ad', isoEpoch: { year: 1, month: 1, day: 1 } },
  { name: 'bc', reverseOf: 'ad' }
]);

const helperJapanese = ObjectAssign(
  {},
  // NOTE: For convenience, this hacky implementation only supports the most
  // recent five eras, those of the modern period. For the full list, see:
  // https://github.com/unicode-org/cldr/blob/master/common/supplemental/supplementalData.xml#L4310-L4546
  //
  // NOTE: Japan started using the Gregorian calendar in 6 Meiji, replacing a
  // lunisolar calendar. So the day before January 1 of 6 Meiji (1873) was not
  // December 31, but December 2, of 5 Meiji (1872). The existing Ecma-402
  // Japanese calendar doesn't seem to take this into account, so neither do we:
  // > args = ['en-ca-u-ca-japanese', { era: 'short' }]
  // > new Date('1873-01-01T12:00').toLocaleString(...args)
  // '1 1, 6 Meiji, 12:00:00 PM'
  // > new Date('1872-12-31T12:00').toLocaleString(...args)
  // '12 31, 5 Meiji, 12:00:00 PM'
  //
  // Era codes are constants consisting of the romanized era name.
  // Unfortunately these are not unique throughout history, so this should be
  // solved: https://github.com/tc39/proposal-temporal/issues/526
  // Otherwise, we'd have to introduce some era numbering system, which (as far
  // as I can tell from Wikipedia) the calendar doesn't have, so would be
  // non-standard and confusing, requiring API consumers to figure out "now what
  // number is the Reiwa (current) era?" My understanding is also that this
  // starting point for eras (0645-06-19) is not the only possible one, since
  // there are unofficial eras before that.
  // https://en.wikipedia.org/wiki/Japanese_era_name
  // Note: C locale era names available at
  // https://github.com/unicode-org/icu/blob/master/icu4c/source/data/locales/root.txt#L1582-L1818
  makeHelperGregorian('japanese', [
    // Anchor era in Japanese is TBD. Placeholder anchor is the start of the Meiji era.
    {
      name: 'meiji',
      isoEpoch: { year: 1868, month: 9, day: 8 },
      anchorEpoch: { year: 1, month: 9, day: 8 },
      isAnchor: true
    },
    { name: 'taisho', isoEpoch: { year: 1912, month: 7, day: 30 }, anchorEpoch: { year: 45, month: 7, day: 30 } },
    { name: 'showa', isoEpoch: { year: 1926, month: 12, day: 25 }, anchorEpoch: { year: 59, month: 12, day: 25 } },
    { name: 'heisei', isoEpoch: { year: 1989, month: 1, day: 8 }, anchorEpoch: { year: 122, month: 1, day: 8 } },
    { name: 'reiwa', isoEpoch: { year: 2019, month: 5, day: 1 }, anchorEpoch: { year: 152, month: 5, day: 1 } }
  ]),
  {
    // The last 3 Japanese eras confusingly return only one character in the
    // default "short" era, so need to use the long format.
    eraLength: 'long'
  }
);

const helperChinese = ObjectAssign({}, nonIsoHelperBase, {
  id: 'chinese',
  calendarType: 'lunisolar',
  inLeapYear(calendarDate, cache) {
    const months = this.getMonthList(calendarDate.year, cache);
    return Object.entries(months).length === 13;
  },
  monthsInYear(calendarDate, cache) {
    return this.inLeapYear(calendarDate, cache) ? 13 : 12;
  },
  minimumMonthLength: (/* calendarDate */) => 29,
  maximumMonthLength: (/* calendarDate */) => 30,
  getMonthList(calendarYear, cache) {
    if (calendarYear === undefined) {
      throw new TypeError('Missing year');
    }
    const key = JSON.stringify({ func: 'getMonthList', calendarYear, id: this.id });
    const cached = cache.get(key);
    if (cached) return cached;
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
      calendar: this.id,
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      era: 'short',
      timeZone: 'UTC'
    });

    const getCalendarDate = (isoYear, daysPastFeb1) => {
      const isoStringFeb1 = toUtcIsoDateString({ isoYear, isoMonth: 2, isoDay: 1 });
      const legacyDate = new Date(isoStringFeb1);
      // Now add the requested number of days, which may wrap to the next month.
      legacyDate.setUTCDate(daysPastFeb1);
      const newYearGuess = dateTimeFormat.formatToParts(legacyDate);
      const calendarMonthString = newYearGuess.find((tv) => tv.type === 'month').value;
      const calendarDay = +newYearGuess.find((tv) => tv.type === 'day').value;
      const calendarYearToVerify = +newYearGuess.find((tv) => tv.type === 'relatedYear').value;
      return { calendarMonthString, calendarDay, calendarYearToVerify };
    };

    // First, find a date close to Chinese New Year. Feb 17 will either be in
    // the first month or near the end of the last month of the previous year.
    let isoDaysDelta = 17;
    let { calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta);

    // If we didn't guess the first month correctly, add (almost in some months)
    // a lunar month
    if (calendarMonthString !== '1') {
      isoDaysDelta += 29;
      ({ calendarMonthString, calendarDay } = getCalendarDate(calendarYear, isoDaysDelta));
    }

    // Now back up to near the start of the first month, but not too near that
    // off-by-one issues matter.
    isoDaysDelta -= calendarDay - 5;
    const result = {};
    let monthIndex = 1;
    let oldCalendarDay;
    let oldMonthString;
    let done = false;
    do {
      ({ calendarMonthString, calendarDay, calendarYearToVerify } = getCalendarDate(calendarYear, isoDaysDelta));
      if (oldCalendarDay) {
        result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;
      }
      if (calendarYearToVerify !== calendarYear) {
        done = true;
      } else {
        result[calendarMonthString] = { monthIndex: monthIndex++ };
        // Move to the next month. Because months are sometimes 29 days, the day of the
        // calendar month will move forward slowly but not enough to flip over to a new
        // month before the loop ends at 12-13 months.
        isoDaysDelta += 30;
      }
      oldCalendarDay = calendarDay;
      oldMonthString = calendarMonthString;
    } while (!done);
    result[oldMonthString].daysInMonth = oldCalendarDay + 30 - calendarDay;

    cache.set(key, result);
    return result;
  },
  estimateIsoDate(calendarDate) {
    const { year } = calendarDate;
    return { year, month: 1, day: 1 };
  },
  adjustCalendarDate(calendarDate, cache, overflow = 'constrain', fromLegacyDate = false) {
    let { year, month, monthExtra, day, monthCode, eraYear } = calendarDate;
    if (fromLegacyDate) {
      // Legacy Date output returns a string that's an integer with an optional
      // "bis" suffix used only by the Chinese/Dangi calendar to indicate a leap
      // month. Below we'll normalize the output.
      year = eraYear;
      if (monthExtra && monthExtra !== 'bis') throw new RangeError(`Unexpected leap month suffix: ${monthExtra}`);
      const monthCode = monthExtra === undefined ? `${month}` : `${month}L`;
      const monthString = `${month}${monthExtra || ''}`;
      const months = this.getMonthList(year, cache);
      const monthInfo = months[monthString];
      if (monthInfo === undefined) throw new RangeError(`Unmatched month ${monthString} in Chinese year ${year}`);
      month = monthInfo.monthIndex;
      return { year, month, day, era: undefined, eraYear, monthCode };
    } else {
      // When called without input coming from legacy Date output,
      // simply ensure that all fields are present.
      this.validateCalendarDate(calendarDate);
      if (year === undefined) year = eraYear;
      if (eraYear === undefined) eraYear = year;
      if (month === undefined) {
        const months = this.getMonthList(year, cache);
        let monthInfo = months[monthCode.replace('L', 'bis')];
        month = monthInfo && monthInfo.monthIndex;
        // If this leap month isn't present in this year, constrain down to the last day of the previous month.
        if (
          month === undefined &&
          monthCode.endsWith('L') &&
          !['1L', '12L', '13L'].includes(monthCode) &&
          overflow === 'constrain'
        ) {
          const withoutL = monthCode.slice(0, -1);
          monthInfo = months[withoutL];
          if (monthInfo) {
            ({ daysInMonth: day, monthIndex: month } = monthInfo);
          }
        }
        if (month === undefined) {
          throw new RangeError(`Unmatched month ${monthCode} in Chinese year ${year}`);
        }
      }
      if (monthCode === undefined) monthCode = +month;
      return { ...calendarDate, year, eraYear, month, monthCode, day };
    }
  },
  // All built-in calendars except Chinese/Dangi and Hebrew use an era
  hasEra: false
});

// Dangi (Korean) calendar has same implementation as Chinese
const helperDangi = ObjectAssign({}, { ...helperChinese, id: 'dangi' });

/**
 * Common implementation of all non-ISO calendars.
 * Per-calendar id and logic live in `id` and `helper` properties attached later.
 * This split allowed an easy separation between code that was similar between
 * ISO and non-ISO implementations vs. code that was very different.
 */
const nonIsoGeneralImpl = {
  dateFromFields(fields, overflow, constructor, calendar) {
    const cache = new OneObjectCache();
    // Intentionally alphabetical
    fields = this.toRecord(cache, fields, [
      ['day'],
      ['era', undefined],
      ['eraYear', undefined],
      ['month', undefined],
      ['monthCode', undefined],
      ['year', undefined]
    ]);
    const { year, month, day } = this.helper.calendarToIsoDate(fields, overflow, cache);
    const result = new constructor(year, month, day, calendar);
    cache.setObject(result);
    return result;
  },
  yearMonthFromFields(fields, overflow, constructor, calendar) {
    const cache = new OneObjectCache();
    // Intentionally alphabetical
    fields = this.toRecord(cache, fields, [
      ['era', undefined],
      ['eraYear', undefined],
      ['month', undefined],
      ['monthCode', undefined],
      ['year', undefined]
    ]);
    if (fields.month === undefined && typeof fields.monthCode !== 'string') {
      throw new TypeError(`monthCode must be a string, not ${ES.Type(fields.monthCode).toLowerCase()}`);
    }
    const { year, month, day } = this.helper.calendarToIsoDate({ ...fields, day: 1 }, overflow, cache);
    const result = new constructor(year, month, calendar, /* referenceISODay = */ day);
    cache.setObject(result);
    return result;
  },
  monthDayFromFields(fields, overflow, constructor, calendar) {
    // All built-in calendars require `day`, but some allow other fields to be
    // substituted for `month`. And for lunisolar calendars, either `monthCode`
    // or `year` must be provided because `month` is ambiguous without a year or
    // a code.
    const cache = new OneObjectCache();
    fields = this.toRecord(cache, fields, [
      ['day'],
      ['month', undefined],
      ['year', undefined],
      ['monthCode', undefined],
      ['era', undefined],
      ['eraYear', undefined]
    ]);
    const { year, month, day } = this.helper.monthDayFromFields(fields, overflow, cache);
    // `year` is a reference year where this month/day exists in this calendar
    const result = new constructor(month, day, calendar, /* referenceISOYear */ year);
    cache.setObject(result);
    return result;
  },
  /**
   * ES.ToRecord is an expensive operation for this prototype implementation
   * because it calls all properties without any caching, resulting in 1+
   * expensive (and redundant) calls.  This method checks to see if this access
   * can be optimized if the bag is a Temporal object by converting to a calendar
   * date in one call and then using the resulting plain-object bag.
   */
  toRecord(cache, bag, fields) {
    let bagCache, key;
    if (
      ES.IsTemporalZonedDateTime(bag) ||
      ES.IsTemporalDateTime(bag) ||
      ES.IsTemporalDate(bag) ||
      ES.IsTemporalMonthDay(bag) ||
      ES.IsTemporalYearMonth(bag)
    ) {
      bagCache = OneObjectCache.getCacheForObject(bag);
      key = JSON.stringify({ func: 'toRecord', fields });
      const cached = bagCache.get(key);
      if (cached) return cached;
      return this.helper.temporalToCalendarDate(bag, cache);
    }
    // If it's not a Temporal object, no caching because it could mutate
    return ES.ToRecord(bag, fields);
  },
  fields(fields) {
    return impl['iso8601'].fields(fields);
  },
  mergeFields(fields, additionalFields) {
    return impl['iso8601'].mergeFields(fields, additionalFields);
  },
  dateAdd(date, duration, overflow) {
    const { years, months, weeks, days } = duration;
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const added = this.helper.addCalendar(calendarDate, { years, months, weeks, days }, overflow, cache);
    const isoAdded = this.helper.calendarToIsoDate(added, 'constrain', cache);
    return isoAdded;
  },
  dateUntil(one, two, largestUnit) {
    const cacheOne = OneObjectCache.getCacheForObject(one);
    const cacheTwo = OneObjectCache.getCacheForObject(two);
    const calendarOne = this.helper.temporalToCalendarDate(one, cacheOne);
    const calendarTwo = this.helper.temporalToCalendarDate(two, cacheTwo);
    const result = this.helper.untilCalendar(calendarOne, calendarTwo, largestUnit, cacheOne);
    return result;
  },
  year(date) {
    if (!HasSlot(date, ISO_YEAR) || !HasSlot(date, ISO_MONTH) || !HasSlot(date, ISO_DAY)) {
      date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    }
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.year;
  },
  month(date) {
    if (!HasSlot(date, ISO_YEAR) || !HasSlot(date, ISO_MONTH) || !HasSlot(date, ISO_DAY)) {
      date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    }
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.month;
  },
  day(date) {
    if (!HasSlot(date, ISO_YEAR) || !HasSlot(date, ISO_MONTH) || !HasSlot(date, ISO_DAY)) {
      date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    }
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.day;
  },
  era(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.era;
  },
  eraYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.eraYear;
  },
  monthCode(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    return calendarDate.monthCode;
  },
  regularMonth(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const regularMonth = this.helper.getRegularMonth(calendarDate);
    return regularMonth;
  },
  monthType(date) {
    if (!HasSlot(date, ISO_MONTH)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    // For non-lunisolar calendars, monthType is always 'regular'. For lunisolar
    // calendars, it will be 'regular' or 'leap'.
    return calendarDate.monthCode.endsWith('L') ? 'leap' : 'regular';
  },
  dayOfWeek(date) {
    return impl['iso8601'].dayOfWeek(date);
  },
  dayOfYear(date) {
    const cache = OneObjectCache.getCacheForObject(date);
    date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const calendarDate = this.helper.isoToCalendarDate(date, cache);
    const startOfYear = this.helper.startOfCalendarYear(calendarDate);
    const diffDays = this.helper.calendarDaysUntil(startOfYear, calendarDate, cache);
    return diffDays + 1;
  },
  weekOfYear(date) {
    return impl['iso8601'].weekOfYear(date);
  },
  daysInWeek(date) {
    return impl['iso8601'].daysInWeek(date);
  },
  daysInMonth(date) {
    if (!HasSlot(date, ISO_YEAR) || !HasSlot(date, ISO_MONTH)) {
      date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    }
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);

    // Easy case: if the helper knows the length without any heavy calculation.
    const max = this.helper.maximumMonthLength(calendarDate);
    const min = this.helper.minimumMonthLength(calendarDate);
    if (max === min) return max;

    // The harder case is where months vary every year, e.g. islamic calendars.
    // Find the answer by calculating the difference in days between the first
    // day of the current month and the first day of the next month.
    const startOfMonthCalendar = this.helper.startOfCalendarMonth(calendarDate);
    const startOfNextMonthCalendar = this.helper.addMonthsCalendar(startOfMonthCalendar, 1, 'constrain', cache);
    const result = this.helper.calendarDaysUntil(startOfMonthCalendar, startOfNextMonthCalendar, cache);
    return result;
  },
  daysInYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const startOfYearCalendar = this.helper.startOfCalendarYear(calendarDate);
    const startOfNextYearCalendar = this.helper.addCalendar(startOfYearCalendar, { years: 1 }, 'constrain', cache);
    const result = this.helper.calendarDaysUntil(startOfYearCalendar, startOfNextYearCalendar, cache);
    return result;
  },
  monthsInYear(date) {
    if (!HasSlot(date, ISO_YEAR)) ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const result = this.helper.monthsInYear(calendarDate, cache);
    return result;
  },
  inLeapYear(date) {
    if (!HasSlot(date, ISO_YEAR)) date = ES.ToTemporalDate(date, GetIntrinsic('%Temporal.PlainDate%'));
    const cache = OneObjectCache.getCacheForObject(date);
    const calendarDate = this.helper.temporalToCalendarDate(date, cache);
    const result = this.helper.inLeapYear(calendarDate, cache);
    return result;
  }
};

impl['hebrew'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperHebrew });
impl['islamic'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperIslamic });
['islamic-umalqura', 'islamic-tbla', 'islamic-civil', 'islamic-rgsa', 'islamicc'].forEach((id) => {
  impl[id] = ObjectAssign({}, nonIsoGeneralImpl, { helper: { ...helperIslamic, id } });
});
impl['persian'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperPersian });
impl['ethiopic'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperEthiopic });
impl['ethioaa'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperEthioaa });
impl['coptic'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperCoptic });
impl['chinese'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperChinese });
impl['dangi'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperDangi });
impl['roc'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperRoc });
impl['indian'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperIndian });
impl['buddhist'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperBuddhist });
impl['japanese'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperJapanese });
impl['gregory'] = ObjectAssign({}, nonIsoGeneralImpl, { helper: helperGregory });

const BUILTIN_CALENDAR_IDS = Object.keys(impl);

function IsBuiltinCalendar(id) {
  return ArrayIncludes.call(BUILTIN_CALENDAR_IDS, id);
}
