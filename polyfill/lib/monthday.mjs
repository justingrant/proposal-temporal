import { ES } from './ecmascript.mjs';
import { GetIntrinsic, MakeIntrinsicClass } from './intrinsicclass.mjs';
import { ISO_MONTH, ISO_DAY, REF_ISO_YEAR, CALENDAR, CreateSlots, GetSlot, SetSlot } from './slots.mjs';

const ObjectAssign = Object.assign;

export class MonthDay {
  constructor(isoMonth, isoDay, calendar = undefined, refIsoYear = 1972) {
    isoMonth = ES.ToInteger(isoMonth);
    isoDay = ES.ToInteger(isoDay);
    calendar = ES.ToTemporalCalendar(calendar);
    refIsoYear = ES.ToInteger(refIsoYear);
    ES.RejectDate(refIsoYear, isoMonth, isoDay);
    CreateSlots(this);
    SetSlot(this, ISO_MONTH, isoMonth);
    SetSlot(this, ISO_DAY, isoDay);
    SetSlot(this, REF_ISO_YEAR, refIsoYear);
    SetSlot(this, CALENDAR, calendar);
  }

  get month() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).month(this);
  }
  get day() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR).day(this);
  }
  get calendar() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    return GetSlot(this, CALENDAR);
  }

  with(temporalMonthDayLike, options) {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    const props = ES.ToPartialRecord(temporalMonthDayLike, ['day', 'month']);
    if (!props) {
      throw new RangeError('invalid month-day-like');
    }
    const fields = ES.ToRecord(this, [['day'], ['month']]);
    ObjectAssign(fields, props);
    const Construct = ES.SpeciesConstructor(this, MonthDay);
    const result = GetSlot(this, CALENDAR).monthDayFromFields(fields, options, Construct);
    if (!ES.IsTemporalMonthDay(result)) throw new TypeError('invalid result');
    return result;
  }
  toString() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    let month = ES.ISODateTimePartString(GetSlot(this, ISO_MONTH));
    let day = ES.ISODateTimePartString(GetSlot(this, ISO_DAY));
    let resultString = `${month}-${day}`;
    return resultString;
  }
  toLocaleString(...args) {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    return new Intl.DateTimeFormat(...args).format(this);
  }
  withYear(year) {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    const calendar = GetSlot(this, CALENDAR);
    const day = calendar.day(this);
    const month = calendar.month(this);
    const Date = GetIntrinsic('%Temporal.Date%');
    return calendar.dateFromFields({ year, month, day }, { disambiguation: 'reject' }, Date);
  }
  getFields() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    const fields = ES.ToRecord(this, [['day'], ['month']]);
    fields.calendar = GetSlot(this, CALENDAR);
    return fields;
  }
  getISOFields() {
    if (!ES.IsTemporalMonthDay(this)) throw new TypeError('invalid receiver');
    return {
      month: GetSlot(this, ISO_MONTH),
      day: GetSlot(this, ISO_DAY)
    };
  }
  static from(item, options = undefined) {
    const disambiguation = ES.ToTemporalDisambiguation(options);
    let month, day, calendar, refIsoYear, result;
    if (typeof item === 'object' && item) {
      if (ES.IsTemporalMonthDay(item)) {
        month = GetSlot(item, ISO_MONTH);
        day = GetSlot(item, ISO_DAY);
        calendar = GetSlot(item, CALENDAR);
        refIsoYear = GetSlot(item, REF_ISO_YEAR);
        result = new this(month, day, calendar, refIsoYear);
      } else {
        const TemporalCalendar = GetIntrinsic('%Temporal.Calendar%');
        calendar = item.calendar ? TemporalCalendar.from(item.calendar) : ES.GetDefaultCalendar();
        result = calendar.monthDayFromFields(item, options, this);
      }
    } else {
      ({ month, day } = ES.ParseTemporalMonthDayString(ES.ToString(item)));
      ({ month, day } = ES.RegulateMonthDay(month, day, disambiguation));
      calendar = ES.GetDefaultCalendar();
      refIsoYear = 1972;
      result = new this(month, day, calendar, refIsoYear);
    }
    if (!ES.IsTemporalMonthDay(result)) throw new TypeError('invalid result');
    return result;
  }
  static compare(one, two) {
    if (!ES.IsTemporalMonthDay(one) || !ES.IsTemporalMonthDay(two)) throw new TypeError('invalid MonthDay object');
    return ES.CompareMonthDay(one, two);
  }
}
MonthDay.prototype.toJSON = MonthDay.prototype.toString;

MakeIntrinsicClass(MonthDay, 'Temporal.MonthDay');
