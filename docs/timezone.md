# Temporal.TimeZone

A `Temporal.TimeZone` is a representation of a time zone: either an [IANA time zone](https://www.iana.org/time-zones), including information about the time zone such as the offset between the local time and UTC at a particular time, and daylight saving time (DST) changes; or simply a particular UTC offset with no DST.

Since `Temporal.Absolute` and `Temporal.DateTime` do not contain any time zone information, a `Temporal.TimeZone` object is required to convert between the two.

An API for creating custom time zones is under discussion.
See [Custom Time Zone Draft](./timezone-draft.md) for more information.

## Constructor

### **new Temporal.TimeZone**(_timeZoneIdentifier_: string) : Temporal.TimeZone

**Parameters:**
- `timeZoneIdentifier` (string): A description of the time zone; either its IANA name, or a UTC offset.

**Returns:** a new `Temporal.TimeZone` object.

For a list of IANA time zone names, see the current version of the [IANA time zone database](https://www.iana.org/time-zones).
A convenient list is also available [on Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), although it might not reflect the latest official status.

The string `timeZoneIdentifier` is canonicalized before being used to determine the time zone.
For example, values like `+01` will be understood to mean `+01:00`, and capitalization will be corrected.
If no time zone can be determined from `timeZoneIdentifier`, then a `RangeError` is thrown.

Use this constructor directly if you have a string that is known to be a correct time zone identifier.
If you have an ISO 8601 date-time string, `Temporal.TimeZone.from()` is probably more convenient.

Example usage:
```javascript
tz = new Temporal.TimeZone('UTC');
tz = new Temporal.TimeZone('Africa/Cairo');
tz = new Temporal.TimeZone('america/VANCOUVER');
tz = new Temporal.TimeZone('Asia/Katmandu');  // alias of Asia/Kathmandu
tz = new Temporal.TimeZone('-04:00');
tz = new Temporal.TimeZone('+0645');
/* WRONG */ tz = new Temporal.TimeZone('local');  // not a time zone, throws
```

#### Difference between IANA time zones and UTC offsets

The returned time zone object behaves slightly differently depending on whether an IANA time zone name (e.g. `Europe/Berlin`) is given, or a UTC offset (e.g. `+01:00`).
IANA time zones may have DST transitions, and UTC offsets do not.
For example:

```javascript
tz1 = new Temporal.TimeZone('-08:00');
tz2 = new Temporal.TimeZone('America/Vancouver');
now = Temporal.now.absolute();
tz1.getTransitions(now).next().done;  // => true
tz2.getTransitions(now).next().done;  // => false
```

## Static methods

### Temporal.TimeZone.**from**(_thing_: any) : Temporal.TimeZone

**Parameters:**
- `thing`: A `Temporal.TimeZone` object or a value from which to create a `Temporal.TimeZone`.

**Returns:** a new `Temporal.TimeZone` object.

This static method creates a new time zone from another value.
If the value is another `Temporal.TimeZone` object, a new object representing the same time zone is returned.

Any other value is converted to a string, which is expected to be either:
- a string that is accepted by `new Temporal.TimeZone()`; or
- a string in the ISO 8601 format including a time zone offset part.

Note that the ISO 8601 string can optionally be extended with an IANA time zone name in square brackets appended to it.

This function is often more convenient to use than `new Temporal.TimeZone()` because it handles a wider range of input.

Usage examples:
```javascript
// IANA time zone names and UTC offsets
tz = Temporal.TimeZone.from('UTC');
tz = Temporal.TimeZone.from('Africa/Cairo');
tz = Temporal.TimeZone.from('america/VANCOUVER');
tz = Temporal.TimeZone.from('Asia/Katmandu');  // alias of Asia/Kathmandu
tz = Temporal.TimeZone.from('-04:00');
tz = Temporal.TimeZone.from('+0645');

// ISO 8601 string with time zone offset part
tz = Temporal.TimeZone.from('2020-01-14T00:31:00.065858086Z');
tz = Temporal.TimeZone.from('2020-01-13T16:31:00.065858086-08:00');
tz = Temporal.TimeZone.from('2020-01-13T16:31:00.065858086-08:00[America/Vancouver]');

// Existing TimeZone object
tz2 = Temporal.TimeZone.from(tz);

/* WRONG */ tz = Temporal.TimeZone.from('local');  // not a time zone, throws
/* WRONG */ tz = Temporal.TimeZone.from({name: 'UTC'});  // not a TimeZone object, throws
/* WRONG */ tz = Temporal.TimeZone.from('2020-01-14T00:31:00');  // ISO 8601 string without time zone offset part, throws
/* WRONG */ tz = Temporal.TimeZone.from('-08:00[America/Vancouver]')  // ISO 8601 string without date-time part, throws
```

## Properties

### timeZone.**name** : string

The `name` property gives an unambiguous identifier for the time zone.
Effectively, this is the canonicalized version of whatever `timeZoneIdentifier` was passed as a parameter to the constructor.

## Methods

### timeZone.**getOffsetFor**(_absolute_: Temporal.Absolute) : number

**Parameters:**
- `absolute` (`Temporal.Absolute`): The time for which to compute the time zone's UTC offset.

**Returns:** The UTC offset at the given time, in nanoseconds.

Since the UTC offset can change throughout the year in time zones that employ DST, this method queries the UTC offset at a particular time.

Note that only `Temporal.TimeZone` objects constructed from an IANA time zone name may have DST transitions; those constructed from a UTC offset do not.
If `timeZone` is a UTC offset time zone, the return value of this method is always the same regardless of `absolute`.

Example usage:
```javascript
// Getting the UTC offset for a time zone at a particular time
timestamp = Temporal.Absolute.fromEpochSeconds(1553993100);
tz = Temporal.TimeZone.from('Europe/Berlin');
tz.getOffsetFor(timestamp);  // => 3600000000000

// TimeZone with a fixed UTC offset
tz = Temporal.TimeZone.from('-08:00');
tz.getOffsetFor(timestamp);  // => -28800000000000
// UTC is always 0 offset
tz = Temporal.TimeZone.from('UTC');
tz.getOffsetFor(timestamp);  // => 0

// Differences between DST and non-DST
tz = Temporal.TimeZone.from('Europe/London');
tz.getOffsetFor(Temporal.Absolute.from('2020-08-06T15:00Z'));  // => 3600000000000
tz.getOffsetFor(Temporal.Absolute.from('2020-11-06T01:00Z'));  // => 0
```

### timeZone.**getOffsetStringFor**(_absolute_: Temporal.Absolute) : string

**Parameters:**
- `absolute` (`Temporal.Absolute`): The time for which to compute the time zone's UTC offset.

**Returns**: a string indicating the UTC offset at the given time.

This method is similar to `timeZone.getOffsetFor()`, but returns the offset formatted as a string, with sign, hours, and minutes.

If `timeZone` is a UTC offset time zone, the return value of this method is effectively the same as `timeZone.name`.

Example usage:
```javascript
// Getting the UTC offset for a time zone at a particular time
timestamp = new Temporal.Absolute(1553993100000000000n);
tz = new Temporal.TimeZone('Europe/Berlin');
tz.getOffsetStringFor(timestamp);  // => +01:00

// TimeZone with a fixed UTC offset
tz = new Temporal.TimeZone('-08:00');
tz.getOffsetStringFor(timestamp);  // => -08:00
```

### timeZone.**getDateTimeFor**(_absolute_: Temporal.Absolute) : Temporal.DateTime

**Parameters:**
- `absolute` (`Temporal.Absolute`): An absolute time to convert.

**Returns:** A `Temporal.DateTime` object indicating the calendar date and wall-clock time in `timeZone` at the absolute time indicated by `absolute`.

This method is one way to convert a `Temporal.Absolute` to a `Temporal.DateTime`.

Example usage:

```javascript
// Converting a specific absolute time to a calendar date / wall-clock time
timestamp = new Temporal.Absolute(1553993100000000000n);
tz = new Temporal.TimeZone('Europe/Berlin');
tz.getDateTimeFor(timestamp);  // => 2019-03-31T01:45

// What time was the Unix Epoch (timestamp 0) in Bell Labs (Murray Hill, New Jersey, USA)?
epoch = new Temporal.Absolute(0n);
tz = new Temporal.TimeZone('America/New_York');
tz.getDateTimeFor(epoch);  // => 1969-12-31T19:00
```

### timeZone.**getAbsoluteFor**(_dateTime_: Temporal.DateTime, _options_?: object) : Temporal.Absolute

**Parameters:**
- `dateTime` (`Temporal.DateTime`): A calendar date and wall-clock time to convert.
- `options` (optional object): An object with properties representing options for the operation.
  The following options are recognized:
  - `disambiguation` (string): How to disambiguate if the date and time given by `dateTime` does not exist in the time zone, or exists more than once.
    Allowed values are `earlier`, `later`, and `reject`.
    The default is `earlier`.

**Returns:** A `Temporal.Absolute` object indicating the absolute time in `timeZone` at the time of the calendar date and wall-clock time from `dateTime`.

This method is one way to convert a `Temporal.DateTime` to a `Temporal.Absolute`.
It is identical to [`dateTime.inTimeZone(timeZone, disambiguation)`](./datetime.html#inTimeZone).

In the case of ambiguity, the `disambiguation` option controls what absolute time to return:
- `earlier`: The earlier of two possible times.
- `later`: The later of two possible times.
- `reject`: Throw a `RangeError` instead.

For usage examples and a more complete explanation of how this disambiguation works and why it is necessary, see [Resolving ambiguity](./ambiguity.md).

If the result is outside the range that `Temporal.Absolute` can represent, then a `RangeError` will be thrown, no matter the value of `disambiguation`.

### timeZone.**getTransitions**(_startingPoint_: Temporal.Absolute) : iterator<Temporal.Absolute>

**Parameters:**
- `startingPoint` (`Temporal.Absolute`): Time after which to start calculating DST transitions.

**Returns:** An iterable yielding `Temporal.Absolute` objects indicating subsequent DST transitions in the given time zone.

This method is used to calculate future DST transitions for the time zone, starting at `startingPoint`.

Note that if the time zone was constructed from a UTC offset, there will be no DST transitions.
In that case, the iterable will be empty.

Example usage:

```javascript
// How long until the next DST change from now, in the current location?
tz = Temporal.now.timeZone();
now = Temporal.now.absolute();
[nextTransition] = tz.getTransitions(now);
duration = nextTransition.difference(now);
duration.toLocaleString();  // output will vary
```

### timeZone.**toString**() : string

**Returns:** The string given by `timeZone.name`.

This method overrides `Object.prototype.toString()` and provides the time zone's `name` property as a human-readable description.

### timeZone.**toJSON**() : string

**Returns:** the string given by `timeZone.name`.

This method is the same as `timeZone.toString()`.
It is usually not called directly, but it can be called automatically by `JSON.stringify()`.

The reverse operation, recovering a `Temporal.TimeZone` object from a string, is `Temporal.TimeZone.from()`, but it cannot be called automatically by `JSON.parse()`.
If you need to rebuild a `Temporal.TimeZone` object from a JSON string, then you need to know the names of the keys that should be interpreted as `Temporal.TimeZone`s.
In that case you can build a custom "reviver" function for your use case.

Example usage:
```js
const user = {
  id: 775,
  username: 'robotcat',
  password: 'hunter2',  // Note: Don't really store passwords like that
  userTimeZone: Temporal.TimeZone.from('Europe/Madrid'),
};
const str = JSON.stringify(user, null, 2);
console.log(str);
// =>
// {
//   "id": 775,
//   "username": "robotcat",
//   "password": "hunter2",
//   "userTimeZone": "Europe/Madrid"
// }

// To rebuild from the string:
function reviver(key, value) {
  if (key.endsWith('TimeZone'))
    return Temporal.TimeZone.from(value);
  return value;
}
JSON.parse(str, reviver);
```
