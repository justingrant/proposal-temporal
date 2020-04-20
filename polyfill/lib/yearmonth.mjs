import { ES } from './ecmascript.mjs';
import { GetIntrinsic, MakeIntrinsicClass } from './intrinsicclass.mjs';
import { ISO_YEAR, ISO_MONTH, REF_ISO_DAY, CreateSlots, GetSlot, SetSlot } from './slots.mjs';

export class YearMonth {
  constructor(isoYear, isoMonth, refIsoDay = 1) {
    isoYear = ES.ToInteger(isoYear);
    isoMonth = ES.ToInteger(isoMonth);
    refIsoDay = ES.ToInteger(refIsoDay);
    ES.RejectYearMonth(isoYear, isoMonth, refIsoDay);
    CreateSlots(this);
    SetSlot(this, ISO_YEAR, isoYear);
    SetSlot(this, ISO_MONTH, isoMonth);
    SetSlot(this, REF_ISO_DAY, refIsoDay);
  }
  get year() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, ISO_YEAR);
  }
  get month() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, ISO_MONTH);
  }
  get daysInMonth() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return ES.DaysInMonth(GetSlot(this, ISO_YEAR), GetSlot(this, ISO_MONTH));
  }
  get daysInYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return ES.LeapYear(GetSlot(this, ISO_YEAR)) ? 366 : 365;
  }
  get isLeapYear() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return ES.LeapYear(GetSlot(this, ISO_YEAR));
  }
  with(temporalYearMonthLike = {}, options) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const disambiguation = ES.ToTemporalDisambiguation(options);
    const props = ES.ToPartialRecord(temporalYearMonthLike, ['month', 'year']);
    if (!props) {
      throw new RangeError('invalid year-month-like');
    }
    let { year = GetSlot(this, ISO_YEAR), month = GetSlot(this, ISO_MONTH) } = props;
    ({ year, month } = ES.RegulateYearMonth(year, month, disambiguation));
    const Construct = ES.SpeciesConstructor(this, YearMonth);
    const result = new Construct(year, month);
    if (!ES.IsTemporalYearMonth(result)) throw new TypeError('invalid result');
    return result;
  }
  plus(temporalDurationLike, options) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const disambiguation = ES.ToArithmeticTemporalDisambiguation(options);
    const duration = ES.ToLimitedTemporalDuration(temporalDurationLike);
    let { year, month } = this;
    const { years, months, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration;
    const { days } = ES.BalanceDuration(
      duration.days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds,
      'days'
    );
    ({ year, month } = ES.AddDate(year, month, 1, years, months, days, disambiguation));
    ({ year, month } = ES.BalanceYearMonth(year, month));
    ({ year, month } = ES.RegulateYearMonth(year, month, disambiguation));
    const Construct = ES.SpeciesConstructor(this, YearMonth);
    const result = new Construct(year, month);
    if (!ES.IsTemporalYearMonth(result)) throw new TypeError('invalid result');
    return result;
  }
  minus(temporalDurationLike, options) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const disambiguation = ES.ToArithmeticTemporalDisambiguation(options);
    const duration = ES.ToLimitedTemporalDuration(temporalDurationLike);
    let { year, month } = this;
    const { years, months, hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = duration;
    const { days } = ES.BalanceDuration(
      duration.days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds,
      'days'
    );
    const lastDay = ES.DaysInMonth(year, month);
    ({ year, month } = ES.SubtractDate(year, month, lastDay, years, months, days, disambiguation));
    ({ year, month } = ES.BalanceYearMonth(year, month));
    ({ year, month } = ES.RegulateYearMonth(year, month, disambiguation));
    const Construct = ES.SpeciesConstructor(this, YearMonth);
    const result = new Construct(year, month);
    if (!ES.IsTemporalYearMonth(result)) throw new TypeError('invalid result');
    return result;
  }
  difference(other, options) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    if (!ES.IsTemporalYearMonth(other)) throw new TypeError('invalid YearMonth object');
    const largestUnit = ES.ToLargestTemporalUnit(options, 'years', ['days', 'hours', 'minutes', 'seconds']);
    const [one, two] = [this, other].sort(YearMonth.compare);
    let years = two.year - one.year;
    let months = two.month - one.month;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    if (largestUnit === 'months') {
      months += 12 * years;
      years = 0;
    }
    const Duration = GetIntrinsic('%Temporal.Duration%');
    return new Duration(years, months);
  }
  toString() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    let year = ES.ISOYearString(GetSlot(this, ISO_YEAR));
    let month = ES.ISODateTimePartString(GetSlot(this, ISO_MONTH));
    let resultString = `${year}-${month}`;
    return resultString;
  }
  toLocaleString(...args) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return new Intl.DateTimeFormat(...args).format(this);
  }
  withDay(day) {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    const year = GetSlot(this, ISO_YEAR);
    const month = GetSlot(this, ISO_MONTH);
    const Date = GetIntrinsic('%Temporal.Date%');
    return new Date(year, month, day);
  }
  getFields() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return ES.ToRecord(this, [['month'], ['year']]);
  }
  getISOFields() {
    if (!ES.IsTemporalYearMonth(this)) throw new TypeError('invalid receiver');
    return {
      year: GetSlot(this, ISO_YEAR),
      month: GetSlot(this, ISO_MONTH)
    };
  }
  static from(item, options = undefined) {
    const disambiguation = ES.ToTemporalDisambiguation(options);
    let year, month, refIsoDay;
    if (typeof item === 'object' && item) {
      if (ES.IsTemporalYearMonth(item)) {
        year = GetSlot(item, ISO_YEAR);
        month = GetSlot(item, ISO_MONTH);
        refIsoDay = GetSlot(item, REF_ISO_DAY);
      } else {
        // Intentionally alphabetical
        ({ year, month } = ES.ToRecord(item, [['month'], ['year']]));
        refIsoDay = 1;
      }
    } else {
      ({ year, month } = ES.ParseTemporalYearMonthString(ES.ToString(item)));
      refIsoDay = 1;
    }
    ({ year, month } = ES.RegulateYearMonth(year, month, disambiguation));
    const result = new this(year, month, refIsoDay);
    if (!ES.IsTemporalYearMonth(result)) throw new TypeError('invalid result');
    return result;
  }
  static compare(one, two) {
    if (!ES.IsTemporalYearMonth(one) || !ES.IsTemporalYearMonth(two)) throw new TypeError('invalid YearMonth object');
    return ES.CompareYearMonth(one, two);
  }
}
YearMonth.prototype.toJSON = YearMonth.prototype.toString;

MakeIntrinsicClass(YearMonth, 'Temporal.YearMonth');
