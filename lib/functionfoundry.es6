// Copyright 2015 Peter W Moresi

// Returns true when the value is a finite number.
function isnumber(value) {
    return typeof(value) === 'number' && !Number.isNaN(value) && isFinite(value);
}

// Copyright 2015 Peter W Moresi

// List of errors in the spreadsheet system

function FFError(message) {
    this.name = "NotImplementedError";
    this.message = (message || "");
}

FFError.prototype = Error.prototype;
FFError.prototype.toString = function() { return this.message }

let nil = new FFError('#NULL!');
let div0 = new FFError('#DIV/0!');
let value = new FFError('#VALUE!');
let ref = new FFError('#REF!');
let name = new FFError('#NAME?');
let num = new FFError('#NUM!');
let na = new FFError('#N/A!');
let error$1 = new FFError('#ERROR!');
let data = new FFError('#GETTING_DATA!');
let missing = new FFError('#MISSING!');
let unknown = new FFError('#UNKNOWN!');
var error$2 = {
  nil,
  div0,
  value,
  ref,
  name,
  num,
  na,
  error: error$1,
  data,
  missing,
  unknown
}

// ABS computes absolute value of a number
function abs(value) {

  // Return `#VALUE!` if not number
  if (!isnumber(value)) {
    return error$2.value;
  }

  // Use built-in Math.abs
  return Math.abs(value);
}

// ACOS computes the inverse cosine of a number
function acos(value) {

  // Return `#VALUE!` if not number
  if (!isnumber(value)) {
    return error$2.value;
  }

  // Use built-in Math.acos
  return Math.acos(value);

}

// ADD calculates the sum of two numbers.
function add(...values) {

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var [a, b] = values

  // Return `#VALUE!` if either a or b is not a number.
  if (!isnumber(a) || !isnumber(b)) {
    return error$2.value
  }

  // Return the sum.
  return a + b
}

// AND reduces list of truthy values into true or false value
function and(...criteria) {

  // Reduce criteria into boolean value.
  return criteria.reduce(
    (acc, item) => {

      // return `#VALUE!` if not true, false, 1 or 0
      if (item !== true && item !== false && item !== 1 && item !== 0) {
        return error$2.value
      }

      // Once `#VALUE!` is found then always return `#VALUE!`
      if (acc === error$2.value) return error$2.value

      // Once `false` is found always return `false`
      if (acc === false) return false

      // Return the current value whether true or false
      return item === true || item === 1;
    })
  }

// Copyright 2015 Peter W Moresi

// FLATTEN converts a nested array into a flattened array. It only supports one
// level of nesting.
function flatten(ref){
    return ref.reduce(function(a, b) {
      return a.concat(b);
    }, []);
}

// SUM a given list of `numbers`
function sum(...numbers) {
    return flatten(flatten(numbers))
    .reduce((a, b) => {
      if (typeof b !== 'number') { return error$2.value }
      return a + b
    });
}

// ISERR returns true when the value is an error (except `#NA!`) or when then
// value is a number which is NaN or [-]Infinity.
function iserr(value) {
  return (
    (
      value !== error$2.na &&
      value.constructor.name === 'Error'
    ) || (
      typeof value === 'number' && (
        Number.isNaN(value) || !Number.isFinite(value)
      )
    )
  );
}

// ISERROR returns true when the value is an error.
function iserror(value) {
    return iserr(value) || value === error$2.na;
}

// AVERAGE computes sum of items divided by number of items
function average(...items) {

  // compute sum all of the items.
  var v = sum(...items)

  // return sum when computed error.
  if (iserror(v)) {
    return v;
  }

  // return sum divided by item count
  return  v / items.length;
}

// BIN2DEC converts binary string into decimal value
function bin2dec(value) {
    var valueAsString;

    if (typeof value === "string") {
        valueAsString = value;
    } else if (typeof value !== "undefined") {
        valueAsString = value.toString();
    } else {
        return error$2.NA;
    }

    if (valueAsString.length > 10) return error$2.NUM;

    // we subtract 512 when the leading number is 0.
    if (valueAsString.length === 10 && valueAsString[0] === '1') {
        return parseInt(valueAsString.substring(1), 2) - 512;
    }

    // Convert binary number to decimal with built-in facility
    return parseInt(valueAsString, 2);

};

// Copyright 2015 Peter W Moresi

// branch is the function equivalent to `if-then-else`
//
// syntax:
// branch( test, result_if_true, [test2, result_if_true,] false_result )
function branch(...cases) {

  var found = false

  // Reduce all cases into a value.
  return cases.reduce( function(acc, item, index) {

    // Return previously found result
    if (found === true) return acc

    // Handle last item
    if ( index === cases.length - 1 ) {
      // There is no last item.
      if (index % 2 === 1) return;

      // return the last item
      return item;
    }

    // Check if condition is true
    if (index % 2 === 0 && item === true) {
      found = true
      // return the found item
      return cases[index+1];
    }

    return acc;

  }, undefined)

}

// Copyright 2015 Peter W Moresi

// Shared constants
let d1900 = new Date(1900, 0, 1);
let JulianOffset = 2415019;
let SecondsInHour = 3600;
let SecondsInDay = 86400;
let MilliSecondsInDay = 86400000;
let DayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let DayNames3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let MonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let MonthNames3 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let AM = "AM";
let AM1 = "A";
let PM = "PM";
let PM1 = "P";
let τ = 6.28318530717958;
let MaxCols = 16384;
let SeparatorChar = ",";
let DecimalChar = ".";
let DefaultCurrency = "$";
let AllowedColors = {
    BLACK: "#000000",
    BLUE: "#0000FF",
    CYAN: "#00FFFF",
    GREEN: "#00FF00",
    MAGENTA: "#FF00FF",
    RED: "#FF0000",
    WHITE: "#FFFFFF",
    YELLOW: "#FFFF00"
  };

// CELLINDEX computes the index for row and column in a 2 dimensional array.
function cellindex(row, col) {
  // Multiple row by maximum columns plus the col.
  return Math.floor( (row * MaxCols) + col );
}

// Copyright 2015 Peter W Moresi

// UNIQUE reduces an `array` into an array without duplicate values.
function unique(array) {
  return array.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, [])
}

// CHANGED computes the list of keys that are different between two objects.
function changed(a, b) {

  // Compute the keys in object a and b.
  var keysA = Object.keys(a),
  keysB = Object.keys(b)

  // Find the unique set of properties comparing a to b and b to a.
  return unique(
    keysA
    .filter( n => a[n] !== b[n])
    .concat(
      keysB
      .filter( n => a[n] !== b[n])
    )
  )
}

// CHOOSE accepts an index and a list of items. It returns the item that corresponds to the index.
function choose(index, ...items) {

  // Return `#NA!` if index or items are not provided.
  if (!index || items.length === 0) {
    return error$2.na;
  }

  // Return `#VALUE!` if index is less than 1 or greater than 254.
  if (index < 1 || index > 254) {
    return error$2.value;
  }

  // Return `#VALUE!` if number of items is less than index.
  if (items.length < index) {
    return error$2.value;
  }

  // Return the item.
  return items[index-1];
}

// Copyright 2015 Peter W Moresi

// ISBLANK returns true when the value is undefined or null.
function isblank(value) {
    return typeof value === 'undefined' || value === null;
};

// Copyright 2015 Peter W Moresi

// ISARRAY returns true when the value is an aray.
function isarray(value) {
  return Object.prototype.toString.call( value ) === '[object Array]'
}

// SELECT fields from object
function select(fields, body) {
  // non-json
  if (!body || 'object' != typeof body) return;

  // check for fields
  if (!fields) return;

  // split
  if ('string' == typeof fields) fields = fields.split(/ *, */);

  // fields array
  if (isarray(body)) {
    return body.map(function(obj){
      return fields.reduce(function(ret, key){
        ret[key] = obj[key];
        return ret;
      }, {});
    });

    return;
  }

  // fields object
  return fields.reduce(function(ret, key){
    ret[key] = body[key];
    return ret;
  }, {});
}

// CLEAN accepts an object and remove properties that are blank.
function clean(obj) {
  // Compute keys where value is non blank.
  var keys = Object.keys(obj).filter( n => !isblank(obj[n]) )

  // Compute object with only non-blank keys.
  return select( keys, obj )
}

// CODE accepts text and optionally index (default 1) returning the character code.
function code(text='', index=1) {
  if (index < 1) return error$2.na
  if (text.length < index) return error$2.value
  return text.charCodeAt(index-1);
}

// Copyright 2015 Peter W Moresi

// ISTEXT returns true when the value is a string.
function istext(value) {
    return 'string' === typeof(value);
};

// ISREF returns true when the value is a reference.
function isref(value) {
  if (!value) return false
  return value._isref === true
}

// Convert letter to number (e.g A -> 0)
function columnnumber(column) {

  if (!istext(column)) {
    return error$2.value
  }

  // see toColumn for rant on why this is sensible even though it is illogical.
  var s = 0, secondPass;

  if (column.length > 0) {

    s = column.charCodeAt(0) - 'A'.charCodeAt(0);

    for (var i = 1; i < column.length; i++) {
      // compensate for spreadsheet column naming
      s+=1
      s *= 26;
      s += column.charCodeAt(i) - 'A'.charCodeAt(0);
      secondPass = true;
    }

    return s;

  }

  return error$2.value;

}

// COLUMN return the column number that corresponds to the reference.
function column(value) {

  // Return `#VALUE!` when the value is not a reference.
  if (!isref(value)) {
    return error$2.value;
  }

  // Run the COLUMNNUMBER and convert to base 1.
  return columnnumber(value.column) + 1;
}

// Convert index to letter (e.g 0 -> A)
function columnletter( index ) {

  if (!isnumber(index)) {
    return error$2.value
  }

  // The column is determined by applying a modified Hexavigesimal algorithm.
  // Normally BA follows Z but spreadsheets count wrong and nobody cares.

  // Instead they do it in a way that makes sense to most people but
  // is mathmatically incorrect. So AA follows Z which in the base 10
  // system is like saying 01 follows 9.

  // In the least significant digit
  // A..Z is 0..25

  // For the second to nth significant digit
  // A..Z is 1..26

  var converted = ""
  ,secondPass = false
  ,remainder
  ,value = Math.abs(index);

  do {
    remainder = value % 26;

    if (secondPass) {
      remainder--;
    }

    converted = String.fromCharCode((remainder + 'A'.charCodeAt(0))) + converted;
    value = Math.floor((value - remainder) / 26);

    secondPass = true;
  } while (value > 0);

  return converted;

}

// Copyright 2015 Peter W Moresi

// CONCATENATE reduces a list of values into a single string.
function concatenate(...values) {
  // Combine into a single string value
  return values.reduce(
    (acc, item) => `${acc}${item}`
  )
}

// COS returns the cosine of a value.
function cos(value) {

  // Return `#VALUE!` when value is not a number.
  if (!isnumber(value)) {
    return error$2.value;
  }

  return Math.cos(value);

}

// Copyright 2015 Peter W Moresi

// ISDATE returns true when the `value` is a JavaScript date object.
function isdate(value) {
    return value && Object.prototype.toString.call(value) == '[object Date]';
};

// SERIAL convert a date object into a serial number.
function serial(date) {
  // Credit: https://github.com/sutoiku/formula.js/
  if (!isdate(date)) { return error$2.na }
  var diff = Math.ceil((date - d1900) / MilliSecondsInDay)
  return diff + ( diff > 59 ? 2 : 1)
}

// DATE returns a serial number given a year, month and day.
function date(year, month, day) {
  return serial(new Date(year, month-1, day));
}

// PARSEDATE converts a value into a Date object.
function parsedate(val) {


  /* *******************
  Extracted from Social Calc

  convert_date_julian_to_gregorian(juliandate)

  ymd->{}
  .year
  .month
  .day

  From: http://aa.usno.navy.mil/faq/docs/JD_Formula.html
  Uses: Fliegel, H. F. and van Flandern, T. C. (1968). Communications of the ACM, Vol. 11, No. 10 (October, 1968).
  Translated from the FORTRAN

  ************************* */
  function convert_date_julian_to_gregorian(juliandate) {

    var L, N, I, J, K;

    L = juliandate+68569;
    N = Math.floor(4*L/146097);
    L = L-Math.floor((146097*N+3)/4);
    I = Math.floor(4000*(L+1)/1461001);
    L = L-Math.floor(1461*I/4)+31;
    J = Math.floor(80*L/2447);
    K = L-Math.floor(2447*J/80);
    L = Math.floor(J/11);
    J = J+2-12*L;
    I = 100*(N-49)+I+L;

    return new Date(I, J-1, K);

  }

  if (val instanceof Error) {
    return val;
  } else if (typeof val === 'number') {
    // val is assumed to be serial number.
    return convert_date_julian_to_gregorian( Math.floor(val+JulianOffset) );
  } else if (typeof val === 'string') {
    var timestamp=Date.parse(val)
    if (Number.isNaN(timestamp))
    {
      return error$2.value;
    }
    return new Date(timestamp);
  }

  return error$2.value;

}

// DATEVALUE parses a date string and returns a serial number.
function datevalue(d) {
  return serial(parsedate(d));
}

// DATEDIF return the difference between two dates given a start date, end date and unit.
function datedif(start_date, end_date, unit) {
  var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
  start_date = parsedate(start_date),
  end_date = parsedate(end_date)

  var timediff = end_date - start_date;
  if (Number.isNaN(timediff)) return NaN;

  switch (unit) {
    case "Y": return end_date.getFullYear() - start_date.getFullYear();
    case "M": return (
      ( end_date.getFullYear() * 12 + end_date.getMonth() )
        -
      ( start_date.getFullYear() * 12 + start_date.getMonth() )
    );
    case "W"  : return Math.floor(timediff / week);
    case "D"   : return Math.floor(timediff / day);
    case "MD"   : return end_date.getdate() - start_date.getdate();
    case "YM" : return end_date.getMonth() - start_date.getMonth();
    case "YD": return new error("NOT IMPLEMENTED");
    default: return undefined;
  }

}

// PARSEBOOL converts a truthy value into a boolean value.
function parsebool(val) {

  if (val instanceof Error) {
    return val;
  } else if (typeof val === 'boolean') {
    return val;
  } else if (typeof val === 'number') {
    return val !== 0;
  } else if (typeof val === 'string') {
    var up = val.toUpperCase();
    if (up === 'TRUE' || up === 'FALSE') {
      return up === 'TRUE';
    }
  }

  return error$2.value;
}

function days360(start_date, end_date, method) {
    method = parsebool(method);
    start_date = parsedate(start_date);
    end_date = parsedate(end_date);

    if (start_date instanceof Error) {
        return start_date;
    }
    if (end_date instanceof Error) {
        return end_date;
    }
    if (method instanceof Error) {
        return method;
    }
    var sm = start_date.getMonth();
    var em = end_date.getMonth();
    var sd, ed;
    if (method) {
        sd = start_date.getDate() === 31 ? 30 : start_date.getDate();
        ed = end_date.getDate() === 31 ? 30 : end_date.getDate();
    } else {
        var smd = new Date(start_date.getFullYear(), sm + 1, 0).getDate();
        var emd = new Date(end_date.getFullYear(), em + 1, 0).getDate();
        sd = start_date.getDate() === smd ? 30 : start_date.getDate();
        if (end_date.getDate() === emd) {
            if (sd < 30) {
                em++;
                ed = 1;
            } else {
                ed = 30;
            }
        } else {
            ed = end_date.getDate();
        }
    }
    return (
      360 * (end_date.getFullYear() - start_date.getFullYear()) + 30 * (em - sm) + (ed - sd)
    );
}

// Copyright 2015 Peter W Moresi

// REPT creates string by repeating text a given number of times.
function rept(text, number) {
  var r = '';
  for (var i = 0; i < number; i++) {
    r += text;
  }
  return r;
}

// based on https://github.com/sutoiku/formula.js/blob/mast../src/engineering.js
function dec2bin(input, places) {

  // exit if input is an error
  if (input instanceof Error) {
    return number;
  }

  // cast input to number
  var number = parseInt(input);

  if (!/^-?[0-9]{1,3}$/.test(number) || Number.isNaN(number)) {
    return error$2.value;
  }

  // Return error.if number is not decimal, is lower than -512, or is greater than 511
  if (number < -512 || number > 511) {
    return error$2.num;
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (number < 0) {
    return '1' + rept('0', 9 - (512 + number).toString(2).length) + (512 + number).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(number, 10).toString(2);

  // Return binary number using the minimum number of characters necessary if places is undefined
  if (typeof places === 'undefined') {
    return result;
  } else {
    // Return error.if places is nonnumeric
    if (!/^-?[0-9]{1,3}$/.test(places) || Number.isNaN(places)) {
      return error$2.value;
    }

    // Return error.if places is negative
    if (places < 0) {
      return error$2.num;
    }

    // Truncate places in case it is not an integer
    places = Math.floor(places);

    // Pad return value with leading 0s (zeros) if necessary (using Underscore.string)
    return (places >= result.length) ? rept('0', places - result.length) + result : error$2.num;
  }
}

// Copyright 2015 Peter W Moresi

function diff(a, b) {
  let keysA = Object.keys(a),
  keysB = Object.keys(b),
  InA = keysB.filter(n => keysA.indexOf(n) > -1),
  NotInA = keysB.filter(n => keysA.indexOf(n) === -1),
  NotInB = keysA.filter(n => keysB.indexOf(n) === -1),
  Diff = InA.filter( n => a[n] !== b[n])

  return {
    unique_left: NotInA,
    unique_right: NotInB,
    diff: Diff.reduce( (x, y) => {
      var diff = { }
      diff[y] = { left: a[y], right: b[y]}
      return Object.assign({}, x, diff)
    }, {})
  }
}

// DIVIDE calculates the product of two numbers.
function divide(...values) {

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var [a, b] = values

  // You cannot divide a number by 0.
  if (b === 0) {
    return error$2.div0
  }

  // Return `#VALUE!` if either a or b is not a number.
  if (!isnumber(a) || !isnumber(b)) {
    return error$2.value
  }

  // Return the product
  return a / b
}

// Copyright 2015 Peter W Moresi

// EQ compares two values and returns a boolean value.
function eq(a,b) {
  // String comparisions are case-insensitive
  if (typeof a === "string" && typeof b === "string") {
    return a.toLowerCase() === b.toLowerCase()
  } else {
    return a === b;
  }
}

// Exact compares two values and only returns true if they meet strict equivalence.
const exact = (a, b) => a === b

// Copyright 2015 Peter W Moresi

// FILTER limits a range based on arrays of boolean values.
function filter(range, ...filters) {

  // A filter is an array of true/false values.
  // The filter may be for rows or for columns but not both.
  // A array filter may only filter a range that covers a single row or a single column.

  function makefilter() {
    return function(value, index) {
      return filters.reduce( function( previousValue, currentValue ) {
        if (previousValue === false ) {
          return false;
        } else {
          return currentValue[index];
        }
      }, true);
    }
  }

  return range.filter( makefilter() )

}

// FIND searches for text within a string
function find(find_text, within_text='', position=1) {

  // Find the position of the text
  position = within_text.indexOf(find_text, position - 1)

  // If found return the position as base 1.
  return position === -1 ? error$2.value : position+1
}

function gt(a,b) {
  if ( isref(a) && isref(b) ) {
    return error$2.na;
  } else if ( isarray(a) && isarray(b) ) {
    return error$2.na;
  } else if ( isref(a) || isarray(a) ) {
    return a.map( (d) => d > b );
  } else if ( isref(b) || isarray(b) ) {
    return b.map( (d) => d > a );
  } else {
    return a > b;
  }
}

function gte(a,b) {
  if ( isref(a) && isref(b) ) {
    return error.na;
  } else if ( isarray(a) && isarray(b) ) {
    return error.na;
  } else if ( isref(a) || isarray(a) ) {
    return a.map( (d) => d >= b );
  } else if ( isref(b) || isarray(b) ) {
    return b.map( (d) => d >= a );
  } else {
    return a >= b;
  }
}

// Copyright 2015 Peter W Moresi

// credit to http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
// rfc4122 version 4 compliant solution

// Generate a globally unique identifier
function guid(){
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return guid;
};

// HLOOKUP searches for a needle across the rows.
function hlookup(needle, table, index=1, exactmatch) {
    if (typeof needle === "undefined" || isblank(needle)) {
        return null;
    }

    if (index > table.length) {
      return error$2.ref
    }

    var needleLower = (needle + '').toLowerCase(),
    row = table[0];

    for (var i = 0; i < row.length; i++){

      if ((exactmatch && row[i]===needle) ||
          ((row[i] == needle) ||
           (typeof row[i] === "string" && row[i].toLowerCase().indexOf(needleLower) != -1) )) {
            return table[index-1][i];
        }
    }

    return error$2.na;
}

// IFBLANK return the `value` if non-blank, otherwise it returns `value_if_blank`.
function ifblank(value, value_if_blank) {
    return isblank(value) ? value_if_blank : value;
}

// ISEMPTY returns true when the value is blank, is an empty array or when it
// is an empty string.
function isempty(value) {
    return (
      isblank(value) ||
      isarray(value) && value.length === 0 ||
      istext(value) && value === ''
    );
};

// IFBLANK return the `value` if empty, otherwise it returns `value_if_empty`.
function ifempty(value, value_if_empty) {
    return isempty(value) ? value_if_empty : value;
}

// IFBLANK return the `value` if error, otherwise it returns `value_if_error`.
function iferror(value, value_if_error=null) {
    return iserror(value) ? value_if_error : value;
}

// IFBLANK return the `value` if `#NA!`, otherwise it returns `value_if_na`.
function ifna(value, value_if_na) {
    return value === error$2.na ? value_if_na : value;
}

// INDEX2COL computes the row given a cell index
function index2row(index) {
  return Math.floor(index / MaxCols);
}

// INDEX2COL computes the column given a cell index
function index2col(index) {
  return index - (index2row(index) * MaxCols);
}

// Copyright 2015 Peter W Moresi

// ISFUNCTION returns true when `value` is a function.
function isfunction(value) {
    return value && Object.prototype.toString.call(value) == '[object Function]';
};

// REF accepts top and bottom and returns a reference object. It encapsulates a cell or a range.
function ref$1(top, bottom) {

  // The index must be a number
  if (!isnumber(top) && !isfunction(top)) {
    return error$2.value
  }

  if (isblank(bottom)) {
    bottom = top
  }

  var getTop = () => isfunction(top) ? top() : top
  var getBottom = () => isfunction(bottom) ? bottom() : bottom

  return {

    get _isref(){
      return true
    },

    get top() {
      return getTop()
    },

    get bottom() {
      return getBottom()
    },

    // Returns row (rowIndex plus 1)
    get row() {
      return index2row( getTop() ) + 1;
    },

    // Returns rowIndex (base 0)
    get rowIndex() {
      return index2row( getTop() )
    },

    // Returns column letter
    get column() {
      return columnletter( index2col( getTop() ) )
    },

    // Returns column index
    get columnIndex() {
      return index2col( getTop() )
    },

    // Returns row (rowIndex plus 1)
    get bottomRow() {
      return index2row( getBottom() ) + 1;
    },

    // Returns rowIndex (base 0)
    get bottomRowIndex() {
      return index2row( getBottom() )
    },

    // Returns column letter
    get bottomColumn() {
      return columnletter( index2col( getBottom() ) )
    },

    // Returns column index
    get bottomColumnIndex() {
      return index2col( getBottom() )
    },

    // The cell id puts the whole table into a single dimension. It simply needs to be between the topLeft and the bottomRight to qualify.
    hit(index) {

      // Return `#NA!` when index is negative.
      if (index < 0) return error$2.na

      // Check if value is inside range from top to bottom, inclusive.
      return (
        ( index >= getTop() ) &&
        ( index <= getBottom() )
      );
    },

    get size() {
      return 1 + (getBottom() - getTop())
    },

    // Return array with every cell index
    get cells() {
      return Array.apply(
        getTop(),
        Array( 1 + (getBottom() - getTop()) )
      )
      .map( (x, y) => y + getTop())
    },

    // Return array with every row
    get rows() {
      return unique(
        Array.apply(
          getTop(),
          Array( 1 + (getBottom() - getTop()) )
        )
        .map( (x, y) => index2row(y + getTop()))
      )
    }

  }
}

// Returns a cell indirection
function indirect(ref) {
  return ref(ref);
}

// Copyright 2015 Peter W Moresi

// ISEMAIL returns true when the `value` matches the regex.
function isemail(value) {
  // credit to http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
};

// Copyright 2015 Peter W Moresi

// ISEVEN returns true when the value is even.
function iseven(value) {
    return !(Math.floor(Math.abs(value)) & 1);
}

// ISNA returns true when the value is `#NA!`
function isna(value) {
  return value === error$2.na;
}

// Copyright 2015 Peter W Moresi

// ISODD returns true when the value is odd.
function isodd(value) {
  return !!(Math.floor(Math.abs(value)) & 1);
}

// Copyright 2015 Peter W Moresi

// ISURL returns true when the value matches the regex for a uniform resource locator.
function isurl(str){
  // credit: http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

// LEN returns the size of a string or array.
function len(text) {
  if (arguments.length === 0) {
    return error$2.error;
  }

  if (typeof text === 'string') {
    return text.length;
  }

  if (text.length) {
    return text.length;
  }

  return error$2.value;
};

// Copyright 2015 Peter W Moresi

// LOOKUP find a value in an array.
function lookup() {
    var lookup_value, lookup_array, lookup_vector, results_vector;
    if (arguments.length === 2) { // array form
        var wide = false;

        lookup_value = arguments[0].valueOf();
        lookup_array = arguments[1];

        for (var i = 0; i < lookup_array.length; i++) {
            if (typeof lookup_array[i] !== 'undefined' && lookup_value === lookup_array[i].valueOf()) {
                return lookup_array[i];
            }
        }

    } else if (arguments.length === 3) { // vector form`
        lookup_value = arguments[0].valueOf();
        lookup_vector = arguments[1];
        results_vector = arguments[2];

        for (var i = 0; i < lookup_vector.length; i++) {
            if (typeof lookup_vector[i] !== 'undefined' && lookup_value === lookup_vector[i].valueOf()) {
                return results_vector[i];
            }
        }

    }

    return error.na;

}

// LOWER converts `value` to lower case
function lower(value) {
  if (!istext(value)) return error$2.value
  return value.toLowerCase()
}

// LT compares two values and returns true when a is less than b.
function lt(a,b) {
  if ( isref(a) && isref(b) ) {
    return error.na;
  } else if ( isarray(a) && isarray(b) ) {
    return error.na;
  } else if ( isref(a) || isarray(a) ) {
    return a.map( (d) => d < b );
  } else if ( isref(b) || isarray(b) ) {
    return b.map( (d) => d < a );
  } else {
    return a < b;
  }
}

// LT compares two values and returns true when a is less than or equal to b.
function lte(a,b) {
  if ( isref(a) && isref(b) ) {
    return error.na;
  } else if ( isarray(a) && isarray(b) ) {
    return error.na;
  } else if ( isref(a) || isarray(a) ) {
    return a.map( (d) => d <= b );
  } else if ( isref(b) || isarray(b) ) {
    return b.map( (d) => d <= a );
  } else {
    return a <= b;
  }
}

// MIN returns the smallest number from a `list`.
function min(...list) {
  return flatten( list ).reduce((min, next) => {
    if (isnumber(next)) {
      return Math.min(min, next);
    }

    return min;

  }, Number.POSITIVE_INFINITY );
}

// MAX returns the largest number from a `list`.
function max(...list) {
  return flatten( list ).reduce((max, next) => {
    if (isnumber(next)) {
      return Math.max(max, next);
    }

    return max;

  }, Number.NEGATIVE_INFINITY );
}

// MULTIPLY calculates the product of two numbers.
function multiply(...values) {

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var [a, b] = values

  // Return `#VALUE!` if either a or b is not a number.
  if (!isnumber(a) || !isnumber(b)) {
    return error$2.value
  }

  // Return the product
  return a * b
}

// N converts a `value` to a number. It supports numbers, true, false and dates.
function n(value) {

  // Pass numbers and errors back out.
  if (isnumber(value) || iserror(value)) {
    return value;
  }

  // Convert dates to serial number.
  if (value instanceof Date) {
    return serial(value);
  }

  // Convert true to 1
  if (value === true) {
    return 1;
  }

  // Convert false to 0
  if (value === false) {
    return 0;
  }

  // Return 0 in all other cases.
  return 0;

}

// Convert a text value into a number value.
function numbervalue(text, decimal_separator, group_separator)  {
  decimal_separator = decimal_separator || '.'
  group_separator = group_separator || ','

  // Return `#VALUE!` when text is empty
  if (isempty(text)) {
    return error$2.value
  }

  // Return the value when it is already a number.
  if (isnumber(text)) {
    return text
  }

  var foundDecimal = false,
  len = text.length-1

  return text.split('').reduce( (acc, item, index) => {
    if (acc === error$2.value) {
      return error$2.value;
    } else if (len === index) {
      if (item === '%') {
        return +acc / 100
      }
      return +acc.concat(item)
    } else if (item === decimal_separator) {
      if (foundDecimal) return error$2.value;
      foundDecimal = true
      return acc.concat('.')
    } else if( item === group_separator ) {
      return acc
    // check if between 0 and 9 ascii codes
    } else if (item.charCodeAt(0) < 48 ||  item.charCodeAt(0) > 57) {
      return error$2.value
    }

    return acc.concat(item);

  })
};

// NE returns true when a is not equal to b.
function ne(a,b) {
  return !eq(a, b)
}

// NOT negates a `value`
function not(value) {
  return (value !== true && value !== false && value !== 1 && value !== 0) ? 
  error$2.value :
  !value
}

// OCT2DEC converts a octal value into a decimal value.
function oct2dec(octalNumber) {
  // Credits: Based on implementation found in https://gist.github.com/ghalimi/4525876#file-oct2dec-js
  // Return error.when number passed in is not octal or has more than 10 digits
  if (!/^[0-7]{1,10}$/.test(octalNumber)) return error$2.num;

  // Convert octal number to decimal number
  var nonNegativeDecimalNumber = parseInt(octalNumber, 8);

  // Returns the corresponding decimal number
  // Two's Complement Decimal Range: -(2^N-1) to (2^N-1 - 1) where N=30 (N = number of bits) and ^ means raised to the power of
  // 2^N-1 = 2^(30 - 1) = 2^29 = 536870912
  // 2^N-1 - 1 = 536870912 - 1 = 536870911
  // 2^N = 2^30 = 1073741824
  // Two's Complement Decimal Range: [-536870912,536870911]
  // Largest octal number allowed: 7777777777 which in decimal is 1073741823 = 2^N - 1
  // Case 1: Negative Range
  //  if nonNegativeDecimalNumber >= 2^N-1, then return (nonNegativeNumber - 2^N)
  //  Smallest Number: 2^N-1 - 2^N = 2^N-1 - 2*2^N-1 = 2^N-1 * (1 - 2) = 2^N-1 * (-1) = -2^N-1
  //  Largest Number: (2^N - 1) - (2^N) = (2^N - 2^N) - 1 = -1
  //  Range: [-2^N-1, -1] = [-536870912, -1]
  //
  // Smallest octal number allowed: 0 which in decimal is 0
  // Case 2: Non-Negative Range
  //   Range: [0, 2^N-1 - 1] = [0, 536870911]

  return (nonNegativeDecimalNumber >= 536870912) ? nonNegativeDecimalNumber - 1073741824 : nonNegativeDecimalNumber;
}

// Copyright 2015 Peter W Moresi

// OR returns true when any of the criter is true or 1.
function or(...criteria) {
  return criteria.reduce( (acc, item) => {
    if (acc === true) return true;
    return item === true || item === 1;
  }, false)
}

// PI returns half the universal circle constant
function pi() {
  return τ / 2;
}

// PMT returns a loan payment
function pmt(rate, periods, present, future = 0, type = 0) {

  if (!isnumber(rate) || !isnumber(periods)) {
    return error$2.value;
  }

  if (rate === 0) {
    return -((present + future) / periods);
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      return -((future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate));
    } else {
      return -(future * rate / (term - 1) + present * rate / (1 - 1 / term));
    }
  }

};

// POWER computes the power of a value and nth degree.
function power(...values) {

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var [val, nth] = values

  // Return `#VALUE!` if either a or b is not a number.
  if (!isnumber(val) || !isnumber(nth)) {
    return error$2.value
  }

  // Compute the power of val to the nth.
  return Math.pow(val, nth);
}

// REPLACE returns a new string after replacing with `new_text`.
function replace(text, position, length, new_text) {

  if (iserror(position) || iserror(length) ||
  typeof text !== 'string' || typeof new_text !== 'string') {
    return error$2.value;
  }
  return text.substr(0, position - 1) + new_text + text.substr(position - 1 + length);
}

// RIGHT pulls a given number of character from the right side of `text`.
function right(text, number) {

  if (isblank(text)) {
    return ''
  }

  if (!n(+number)) {
    return text
  }

  return text.substring( text.length - number )

}

// Copyright 2015 Peter W Moresi

// CONVERT a number to a fixed precision.
function round(number, precision) {
  return +number.toFixed(precision);
}

// Copyright 2015 Peter W Moresi

// ROUNDUP converts a number to a fixed precision by rounding up.
function roundup(number, precision) {
  var factors = [1,10,100,1000,10000,100000,1000000,10000000,100000000,1000000000];
  var factor = factors[precision];
  if (number > 0) {
    return Math.ceil(number * factor) / factor;
  } else {
    return Math.floor(number * factor) / factor;
  }
}

// SEARCH finds text using wildcards ?, *, ~?, and ~*.
function search(find_text, within_text, position) {
    if (!within_text) { return null; }
    position = (typeof position === 'undefined') ? 1 : position;

    // The SEARCH function translated the find_text into a regex.
    var find_exp = find_text
        .replace(/([^~])\?/g, '$1.')   // convert ? into .
        .replace(/([^~])\*/g, '$1.*')  // convert * into .*
        .replace(/([~])\?/g, '\\?')    // convert ~? into \?
        .replace(/([~])\*/g, '\\*');   // convert ~* into \*

    position = new RegExp(find_exp, "i").exec(within_text);

    if (position) { return position.index + 1 }
    return error$2.value;
}

// SIN calculates the sinine of a value.
function sin(value) {

  if (!isnumber(value)) {
    return error$2.value;
  }

  return Math.sin(value);

}

// INT returns true when a needle is found in a list.
function some(needle, list) {

  // Return `#NA!` when the needle and list are blank.
  if ( isblank(needle) && isblank(list) ) {
    return error$2.na;
  }

  // Return `#NA!` when the list is not an array.
  if (!isarray(list)) {
    return error$2.na;
  }

  // Return true when some of the values match the needle.
  return list.some(n => eq(n, needle) )
}

// SORT a reference or an array.
//
// The criteria may use 1 of several forms:
//
// sort(reference(reference: Array, ...criteria : List<string>)
// sort(reference(reference: Range, ...criteria : List<string>)
//
// The List<function> will be reduced into a single function.
//
// The list<string> will also be reduced into a single function which
// interprets the strings as pairs. The odd items are fields and the
// even ones are direction (ASC|DESC).
function sort(ref, ...criteria) {

  // reduce the criteria array into a function
  let makeComparer = () => {
    return function(a, b) {
      var result = 0;
      for (var i = 0; i < criteria.length; i+2) {
        let field = (typeof criteria[i] === 'string' ? criteria[i] : criteria[i] - 1),
            order = criteria[i+1];

        if (a[field] < b[field]) {
          return order ? -1 : 1;
        } else {
          return order ? 1 : -1;
        }

      }

      return result;

    }

  }

  if (isref(ref) || isarray(ref)) {
    return ref.sort( makeComparer() );
  }

  return error$2.na;

}

// Copyright 2015 Peter W Moresi

// SPLIT `text` given a `delimiter`.
function split(text, delimiter) {
  return text.split(delimiter)
}

// Copyright 2015 Peter W Moresi

// SUBSTITUTE `old_text` with `new_text` a given number of occurrences in `text`.
function substitute(text, old_text, new_text, occurrence) {
  if (!text || !old_text || !new_text) {
    return text;
  } else if (occurrence === undefined) {
    return text.replace(new RegExp(old_text, 'g'), new_text);
  } else {
    var index = 0;
    var i = 0;
    while (text.indexOf(old_text, index) > 0) {
      index = text.indexOf(old_text, index + 1);
      i++;
      if (i === occurrence) {
        return text.substring(0, index) + new_text + text.substring(index + old_text.length);
      }
    }
  }
}

// SUBTRACT calculates the difference of two numbers.
function subtract(...values) {

  // Return `#NA!` if 2 arguments are not provided.
  if (values.length !== 2) {
    return error$2.na;
  }

  // decompose values into a and b.
  var [a, b] = values

  // Return `#VALUE!` if either a or b is not a number.
  if (!isnumber(a) || !isnumber(b)) {
    return error$2.value
  }

  // Return the difference.
  return a - b
}

// TAN computes the tagent of a value.
function tan(value) {

  if (!isnumber(value)) {
    return error$2.value;
  }

  return Math.tan(value);

}

// TAU returns the universal circle constant
function tau() {
  return τ;
}

let FormatNumber = {};

FormatNumber.format_definitions = {}; // Parsed formats are stored here globally

// Other constants

FormatNumber.commands = {
  copy: 1, color: 2, integer_placeholder: 3, fraction_placeholder: 4, decimal: 5,
  currency: 6, general:7, separator: 8, date: 9, comparison: 10, section: 11, style: 12
};


/* *******************

result = FormatNumber.formatNumberWithFormat = function(rawvalue, format_string, currency_char)

************************* */

FormatNumber.formatNumberWithFormat = function(rawvalue, format_string, currency_char) {

  var scfn = FormatNumber;

  var op, operandstr, fromend, cval, operandstrlc;
  var startval, estartval;
  var hrs, mins, secs, ehrs, emins, esecs, ampmstr, ymd;
  var minOK, mpos, mspos;
  var result='';
  var format;
  var section, gotcomparison, compop, compval, cpos, oppos;
  var sectioninfo;
  var i, decimalscale, scaledvalue, strvalue, strparts, integervalue, fractionvalue;
  var integerdigits2, integerpos, fractionpos, textcolor, textstyle, separatorchar, decimalchar;
  var value; // working copy to change sign, etc.

  rawvalue = rawvalue-0; // make sure a number
  value = rawvalue;
  if (!isFinite(value)) return 'NaN';

  var negativevalue = value < 0 ? 1 : 0; // determine sign, etc.
  if (negativevalue) value = -value;
  var zerovalue = value == 0 ? 1 : 0;

  currency_char = currency_char || DefaultCurrency;

  FormatNumber.parse_format_string(scfn.format_definitions, format_string); // make sure format is parsed
  //console.log("format_string", format_string, format)
  format = scfn.format_definitions[format_string]; // Get format structure
  //console.log("format", format)

  if (!format) throw 'Format not parsed error.';

  section = format.sectioninfo.length - 1; // get number of sections - 1

  // has comparisons - determine which section
  if (format.hascomparison) {
    section = 0; // set to which section we will use
    gotcomparison = 0; // this section has no comparison
    for (cpos=0; ;cpos++) { // scan for comparisons
      op = format.operators[cpos];
      operandstr = format.operands[cpos]; // get next operator and operand

      // at end with no match
      if (!op) {
        // if comparison but no match
        if (gotcomparison) {
          format_string = 'General'; // use default of General
          scfn.parse_format_string(scfn.format_definitions, format_string);
          format = scfn.format_definitions[format_string];
          section = 0;
        }
        break; // if no comparision, matches on this section
      }
      // end of section
      if (op == scfn.commands.section) {
        if (!gotcomparison) { // no comparison, so it's a match
          break;
        }
        gotcomparison = 0;
        section++; // check out next one
        continue;
      }
      // found a comparison - do we meet it?
      if (op == scfn.commands.comparison) {
        i=operandstr.indexOf(':');
        compop=operandstr.substring(0,i);
        compval=operandstr.substring(i+1)-0;
        if ((compop == '<' && rawvalue < compval) ||
        (compop == '<=' && rawvalue <= compval) ||
        (compop == '=' && rawvalue == compval) ||
        (compop == '<>' && rawvalue != compval) ||
        (compop == '>=' && rawvalue >= compval) ||
        (compop == '>' && rawvalue > compval)) {
          break;
        }
        gotcomparison = 1;
      }
    }
  }
  // more than one section (separated by ";")
  else if (section > 0) {
    // two sections
    if (section == 1) {
      if (negativevalue) {
        negativevalue = 0; // sign will provided by section, not automatically
        section = 1; // use second section for negative values
      }
      else {
        section = 0; // use first for all others
      }
    }
    // three sections
    else if (section == 2) {
      if (negativevalue) {
        negativevalue = 0; // sign will provided by section, not automatically
        section = 1; // use second section for negative values
      }
      else if (zerovalue) {
        section = 2; // use third section for zero values
      }
      else {
        section = 0; // use first for positive
      }
    }
  }

  sectioninfo = format.sectioninfo[section]; // look at values for our section

  if (sectioninfo.commas > 0) { // scale by thousands
    for (i=0; i<sectioninfo.commas; i++) {
      value /= 1000;
    }
  }
  if (sectioninfo.percent > 0) { // do percent scaling
    for (i=0; i<sectioninfo.percent; i++) {
      value *= 100;
    }
  }

  decimalscale = 1; // cut down to required number of decimal digits
  for (i=0; i<sectioninfo.fractiondigits; i++) {
    decimalscale *= 10;
  }
  scaledvalue = Math.floor(value * decimalscale + 0.5);
  scaledvalue = scaledvalue / decimalscale;

  if (typeof scaledvalue != 'number') return 'NaN';
  if (!isFinite(scaledvalue)) return 'NaN';

  strvalue = scaledvalue+''; // convert to string (Number.toFixed doesn't do all we need)

  //   strvalue = value.toFixed(sectioninfo.fractiondigits); // cut down to required number of decimal digits
  // and convert to string

  if (scaledvalue == 0 && (sectioninfo.fractiondigits || sectioninfo.integerdigits)) {
    negativevalue = 0; // no "-0" unless using multiple sections or General
  }

  //console.log(rawvalue+'')

  // converted to scientific notation
  if (strvalue.indexOf('e')>=0) {
    return rawvalue+''; // Just return plain converted raw value
  }

  strparts=strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
  if (!strparts) return 'NaN'; // if not a number
  integervalue = strparts[1];
  if (!integervalue || integervalue=='0') integervalue='';
  fractionvalue = strparts[2];
  if (!fractionvalue) fractionvalue = '';

  // there are date placeholders
  if (sectioninfo.hasdate) {
    //console.log('hasdate')
    // bad date
    if (rawvalue < 0) {
      return '??-???-?? ??:??:??';
    }
    startval = (rawvalue-Math.floor(rawvalue)) * SecondsInDay; // get date/time parts
    estartval = rawvalue * SecondsInDay; // do elapsed time version, too
    hrs = Math.floor(startval / SecondsInHour);
    ehrs = Math.floor(estartval / SecondsInHour);
    startval = startval - hrs * SecondsInHour;
    mins = Math.floor(startval / 60);
    emins = Math.floor(estartval / 60);
    secs = startval - mins * 60;
    decimalscale = 1; // round appropriately depending if there is ss.0
    for (i=0; i<sectioninfo.fractiondigits; i++) {
      decimalscale *= 10;
    }
    secs = Math.floor(secs * decimalscale + 0.5);
    secs = secs / decimalscale;
    esecs = Math.floor(estartval * decimalscale + 0.5);
    esecs = esecs / decimalscale;
    if (secs >= 60) { // handle round up into next second, minute, etc.
      secs = 0;
      mins++; emins++;
      if (mins >= 60) {
        mins = 0;
        hrs++; ehrs++;
        if (hrs >= 24) {
          hrs = 0;
          rawvalue++;
        }
      }
    }
    fractionvalue = (secs-Math.floor(secs))+''; // for "hh:mm:ss.000"
    fractionvalue = fractionvalue.substring(2); // skip "0."

    ymd = parsedate(rawvalue);
    ymd = {
      year: ymd.getFullYear(),
      month: ymd.getMonth() + 1,
      day: ymd.getDate()
    }

    minOK = 0; // says "m" can be minutes if true
    mspos = sectioninfo.sectionstart; // m scan position in ops
    for ( ; ; mspos++) { // scan for "m" and "mm" to see if any minutes fields, and am/pm
      op = format.operators[mspos];
      operandstr = format.operands[mspos]; // get next operator and operand
      if (!op) break; // don't go past end
      if (op==scfn.commands.section) break;
      if (op==scfn.commands.date) {
        if ((operandstr.toLowerCase()=='am/pm' || operandstr.toLowerCase()=='a/p') && !ampmstr) {
          if (hrs >= 12) {
            hrs -= 12;
            ampmstr = operandstr.toLowerCase()=='a/p' ? PM1 : PM; // "P" : "PM";
          }
          else {
            ampmstr = operandstr.toLowerCase()=='a/p' ? AM1 : AM; // "A" : "AM";
          }
          if (operandstr.indexOf(ampmstr)<0)
          ampmstr = ampmstr.toLowerCase(); // have case match case in format
        }
        if (minOK && (operandstr=='m' || operandstr=='mm')) {
          format.operands[mspos] += 'in'; // turn into "min" or "mmin"
        }
        if (operandstr.charAt(0)=='h') {
          minOK = 1; // m following h or hh or [h] is minutes not months
        }
        else {
          minOK = 0;
        }
      }
      else if (op!=scfn.commands.copy) { // copying chars can be between h and m
        minOK = 0;
      }
    }
    minOK = 0;
    for (--mspos; ; mspos--) { // scan other way for s after m
      op = format.operators[mspos];
      operandstr = format.operands[mspos]; // get next operator and operand
      if (!op) break; // don't go past end
      if (op==scfn.commands.section) break;
      if (op==scfn.commands.date) {
        if (minOK && (operandstr=='m' || operandstr=='mm')) {
          format.operands[mspos] += 'in'; // turn into "min" or "mmin"
        }
        if (operandstr=='ss') {
          minOK = 1; // m before ss is minutes not months
        }
        else {
          minOK = 0;
        }
      }
      else if (op!=scfn.commands.copy) { // copying chars can be between ss and m
        minOK = 0;
      }
    }
  }

  integerdigits2 = 0; // init counters, etc.
  integerpos = 0;
  fractionpos = 0;
  textcolor = '';
  textstyle = '';
  separatorchar = SeparatorChar;
  if (separatorchar.indexOf(' ')>=0) separatorchar = separatorchar.replace(/ /g, ' ');
  decimalchar = DecimalChar;
  if (decimalchar.indexOf(' ')>=0) decimalchar = decimalchar.replace(/ /g, ' ');

  oppos = sectioninfo.sectionstart;

  while (op = format.operators[oppos]) { // execute format
    operandstr = format.operands[oppos++]; // get next operator and operand

    if (op == scfn.commands.copy) { // put char in result
      result += operandstr;
    }

    else if (op == scfn.commands.color) { // set color
      textcolor = operandstr;
    }

    else if (op == scfn.commands.style) { // set style
      textstyle = operandstr;
    }

    else if (op == scfn.commands.integer_placeholder) { // insert number part
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      integerdigits2++;
      if (integerdigits2 == 1) { // first one
        if (integervalue.length > sectioninfo.integerdigits) { // see if integer wider than field
          for (;integerpos < (integervalue.length - sectioninfo.integerdigits); integerpos++) {
            result += integervalue.charAt(integerpos);
            if (sectioninfo.thousandssep) { // see if this is a separator position
              fromend = integervalue.length - integerpos - 1;
              if (fromend > 2 && fromend % 3 == 0) {
                result += separatorchar;
              }
            }
          }
        }
      }
      if (integervalue.length < sectioninfo.integerdigits
        && integerdigits2 <= sectioninfo.integerdigits - integervalue.length) { // field is wider than value
          if (operandstr == '0' || operandstr == '?') { // fill with appropriate characters
          result += operandstr == '0' ? '0' : ' ';
          if (sectioninfo.thousandssep) { // see if this is a separator position
            fromend = sectioninfo.integerdigits - integerdigits2;
            if (fromend > 2 && fromend % 3 == 0) {
              result += separatorchar;
            }
          }
        }
      }
      else { // normal integer digit - add it
        result += integervalue.charAt(integerpos);
        if (sectioninfo.thousandssep) { // see if this is a separator position
          fromend = integervalue.length - integerpos - 1;
          if (fromend > 2 && fromend % 3 == 0) {
            result += separatorchar;
          }
        }
        integerpos++;
      }
    }
    else if (op == scfn.commands.fraction_placeholder) { // add fraction part of number
      if (fractionpos >= fractionvalue.length) {
        if (operandstr == '0' || operandstr == '?') {
          result += operandstr == '0' ? '0' : ' ';
        }
      }
      else {
        result += fractionvalue.charAt(fractionpos);
      }
      fractionpos++;
    }

    else if (op == scfn.commands.decimal) { // decimal point
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      result += decimalchar;
    }

    else if (op == scfn.commands.currency) { // currency symbol
      if (negativevalue) {
        result += '-';
        negativevalue = 0;
      }
      result += operandstr;
    }

    else if (op == scfn.commands.general) { // insert "General" conversion

      // *** Cut down number of significant digits to avoid floating point artifacts:

      if (value!=0) { // only if non-zero
        var factor = Math.floor(Math.LOG10E * Math.log(value)); // get integer magnitude as a power of 10
        factor = Math.pow(10, 13-factor); // turn into scaling factor
        value = Math.floor(factor * value + 0.5)/factor; // scale positive value, round, undo scaling
        if (!isFinite(value)) return 'NaN';
      }
      if (negativevalue) {
        result += '-';
      }
      strvalue = value+''; // convert original value to string
      if (strvalue.indexOf('e')>=0) { // converted to scientific notation
      result += strvalue;
      continue;
    }
    strparts=strvalue.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/); // get integer and fraction parts
    integervalue = strparts[1];
    if (!integervalue || integervalue=='0') integervalue='';
    fractionvalue = strparts[2];
    if (!fractionvalue) fractionvalue = '';
    integerpos = 0;
    fractionpos = 0;
    if (integervalue.length) {
      for (;integerpos < integervalue.length; integerpos++) {
        result += integervalue.charAt(integerpos);
        if (sectioninfo.thousandssep) { // see if this is a separator position
          fromend = integervalue.length - integerpos - 1;
          if (fromend > 2 && fromend % 3 == 0) {
            result += separatorchar;
          }
        }
      }
    }
    else {
      result += '0';
    }
    if (fractionvalue.length) {
      result += decimalchar;
      for (;fractionpos < fractionvalue.length; fractionpos++) {
        result += fractionvalue.charAt(fractionpos);
      }
    }
  }
  else if (op==scfn.commands.date) { // date placeholder
    operandstrlc = operandstr.toLowerCase();
    if (operandstrlc=='y' || operandstrlc=='yy') {
      result += (ymd.year+'').substring(2);
    }
    else if (operandstrlc=='yyyy') {
      result += ymd.year+'';
    }
    else if (operandstrlc=='d') {
      result += ymd.day+'';
    }
    else if (operandstrlc=='dd') {
      cval = 1000 + ymd.day;
      result += (cval+'').substr(2);
    }
    else if (operandstrlc=='ddd') {
      cval = Math.floor(rawvalue+6) % 7;
      result += DayNames3[cval];
    }
    else if (operandstrlc=='dddd') {
      cval = Math.floor(rawvalue+6) % 7;
      result += DayNames[cval];
    }
    else if (operandstrlc=='m') {
      result += ymd.month+'';
    }
    else if (operandstrlc=='mm') {
      cval = 1000 + ymd.month;
      result += (cval+'').substr(2);
    }
    else if (operandstrlc=='mmm') {
      result += MonthNames3[ymd.month-1];
    }
    else if (operandstrlc=='mmmm') {
      result += MonthNames[ymd.month-1];
    }
    else if (operandstrlc=='mmmmm') {
      result += MonthNames[ymd.month-1].charAt(0);
    }
    else if (operandstrlc=='h') {
      result += hrs+'';
    }
    else if (operandstrlc=='h]') {
      result += ehrs+'';
    }
    else if (operandstrlc=='mmin') {
      cval = (1000 + mins)+'';
      result += cval.substr(2);
    }
    else if (operandstrlc=='mm]') {
      if (emins < 100) {
        cval = (1000 + emins)+'';
        result += cval.substr(2);
      }
      else {
        result += emins+'';
      }
    }
    else if (operandstrlc=='min') {
      result += mins+'';
    }
    else if (operandstrlc=='m]') {
      result += emins+'';
    }
    else if (operandstrlc=='hh') {
      cval = (1000 + hrs)+'';
      result += cval.substr(2);
    }
    else if (operandstrlc=='s') {
      cval = Math.floor(secs);
      result += cval+'';
    }
    else if (operandstrlc=='ss') {
      cval = (1000 + Math.floor(secs))+'';
      result += cval.substr(2);
    }
    else if (operandstrlc=='am/pm' || operandstrlc=='a/p') {
      result += ampmstr;
    }
    else if (operandstrlc=='ss]') {
      if (esecs < 100) {
        cval = (1000 + Math.floor(esecs))+'';
        result += cval.substr(2);
      }
      else {
        cval = Math.floor(esecs);
        result += cval+'';
      }
    }
  }
  else if (op == scfn.commands.section) {
    // end of section
    break;
  }

  else if (op == scfn.commands.comparison) {
    // ignore
    continue;
  }

  else {
    result += '!! Parse error.!!';
  }
}

if (textcolor) {
  result = '<span style="color:'+textcolor+';">'+result+'</span>';
}
if (textstyle) {
  result = '<span style="'+textstyle+';">'+result+'</span>';
}

//console.log(result)

return result;

};

/* *******************

FormatNumber.parse_format_string(format_defs, format_string)

Takes a format string (e.g., "#,##0.00_);(#,##0.00)") and fills in format_defs with the parsed info

format_defs
["#,##0.0"]->{} - elements in the hash are one hash for each format
.operators->[] - array of operators from parsing the format string (each a number)
.operands->[] - array of corresponding operators (each usually a string)
.sectioninfo->[] - one hash for each section of the format
.start
.integerdigits
.fractiondigits
.commas
.percent
.thousandssep
.hasdates
.hascomparison - true if any section has [<100], etc.

************************* */

FormatNumber.parse_format_string = function(format_defs, format_string) {

  var scfn = FormatNumber;

  var format, section, sectioninfo;
  var integerpart = 1; // start out in integer part
  var lastwasinteger; // last char was an integer placeholder
  var lastwasslash; // last char was a backslash - escaping following character
  var lastwasasterisk; // repeat next char
  var lastwasunderscore; // last char was _ which picks up following char for width
  var inquote, quotestr; // processing a quoted string
  var inbracket, bracketstr, bracketdata; // processing a bracketed string
  var ingeneral, gpos; // checks for characters "General"
  var ampmstr, part; // checks for characters "A/P" and "AM/PM"
  var indate; // keeps track of date/time placeholders
  var chpos; // character position being looked at
  var ch; // character being looked at

  if (format_defs[format_string]) return; // already defined - nothing to do

  format = {operators: [], operands: [], sectioninfo: [{}]}; // create info structure for this format
  format_defs[format_string] = format; // add to other format definitions

  section = 0; // start with section 0
  sectioninfo = format.sectioninfo[section]; // get reference to info for current section
  sectioninfo.sectionstart = 0; // position in operands that starts this section
  sectioninfo.integerdigits = 0; // number of integer-part placeholders
  sectioninfo.fractiondigits = 0; // fraction placeholders
  sectioninfo.commas = 0; // commas encountered, to handle scaling
  sectioninfo.percent = 0; // times to scale by 100

  for (chpos=0; chpos<format_string.length; chpos++) { // parse
    ch = format_string.charAt(chpos); // get next char to examine
    if (inquote) {
      if (ch == '"') {
        inquote = 0;
        format.operators.push(scfn.commands.copy);
        format.operands.push(quotestr);
        continue;
      }
      quotestr += ch;
      continue;
    }
    if (inbracket) {
      if (ch==']') {
        inbracket = 0;
        bracketdata=FormatNumber.parse_format_bracket(bracketstr);
        if (bracketdata.operator==scfn.commands.separator) {
          sectioninfo.thousandssep = 1; // explicit [,]
          continue;
        }
        if (bracketdata.operator==scfn.commands.date) {
          sectioninfo.hasdate = 1;
        }
        if (bracketdata.operator==scfn.commands.comparison) {
          format.hascomparison = 1;
        }
        format.operators.push(bracketdata.operator);
        format.operands.push(bracketdata.operand);
        continue;
      }
      bracketstr += ch;
      continue;
    }

    if (lastwasslash) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch);
      lastwasslash=false;
      continue;
    }

    if (lastwasasterisk) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch+ch+ch+ch+ch); // do 5 of them since no real tabs
      lastwasasterisk=false;
      continue;
    }

    if (lastwasunderscore) {
      format.operators.push(scfn.commands.copy);
      format.operands.push(' ');
      lastwasunderscore=false;
      continue;
    }

    if (ingeneral) {
      if ('general'.charAt(ingeneral)==ch.toLowerCase()) {
        ingeneral++;
        if (ingeneral == 7) {
          format.operators.push(scfn.commands.general);
          format.operands.push(ch);
          ingeneral=0;
        }
        continue;
      }
      ingeneral = 0;
    }

    // last char was part of a date placeholder
    if (indate) {
      //console.log('foo')
      if (indate.charAt(0)==ch) { // another of the same char
        indate += ch; // accumulate it
        continue;
      }
      format.operators.push(scfn.commands.date); // something else, save date info
      format.operands.push(indate);
      sectioninfo.hasdate=1;
      indate = '';
    }
    if (ampmstr) {
      ampmstr += ch;
      part=ampmstr.toLowerCase();
      if (part!='am/pm'.substring(0,part.length) && part!='a/p'.substring(0,part.length)) {
        ampstr='';
      }
      else if (part=='am/pm' || part=='a/p') {
        format.operators.push(scfn.commands.date);
        format.operands.push(ampmstr);
        ampmstr = '';
      }
      continue;
    }
    if (ch=='#' || ch=='0' || ch=='?') { // placeholder
    if (integerpart) {
      sectioninfo.integerdigits++;
      if (sectioninfo.commas) { // comma inside of integer placeholders
        sectioninfo.thousandssep = 1; // any number is thousands separator
        sectioninfo.commas = 0; // reset count of "thousand" factors
      }
      lastwasinteger = 1;
      format.operators.push(scfn.commands.integer_placeholder);
      format.operands.push(ch);
    }
    else {
      sectioninfo.fractiondigits++;
      format.operators.push(scfn.commands.fraction_placeholder);
      format.operands.push(ch);
    }
  } else if (ch == '.') {
    lastwasinteger = 0;
    format.operators.push(scfn.commands.decimal);
    format.operands.push(ch);
    integerpart = 0;
  } else if (ch === '$') {
    lastwasinteger = 0;
    format.operators.push(scfn.commands.currency);
    format.operands.push(ch);
  } else if (ch==',') {
    if (lastwasinteger) {
      sectioninfo.commas++;
    } else {
      format.operators.push(scfn.commands.copy);
      format.operands.push(ch);
    }
  } else if (ch=='%') {
    lastwasinteger = 0;
    sectioninfo.percent++;
    format.operators.push(scfn.commands.copy);
    format.operands.push(ch);
  } else if (ch=='"') {
    lastwasinteger = 0;
    inquote = 1;
    quotestr = '';
  } else if (ch=='[') {
    lastwasinteger = 0;
    inbracket = 1;
    bracketstr = '';
  } else if (ch=='\\') {
    lastwasslash = 1;
    lastwasinteger = 0;
  } else if (ch=='*') {
    lastwasasterisk = 1;
    lastwasinteger = 0;
  } else if (ch=='_') {
    lastwasunderscore = 1;
    lastwasinteger = 0;
  } else if (ch==';') {
    section++; // start next section
    format.sectioninfo[section] = {}; // create a new section
    sectioninfo = format.sectioninfo[section]; // get reference to info for current section
    sectioninfo.sectionstart = 1 + format.operators.length; // remember where it starts
    sectioninfo.integerdigits = 0; // number of integer-part placeholders
    sectioninfo.fractiondigits = 0; // fraction placeholders
    sectioninfo.commas = 0; // commas encountered, to handle scaling
    sectioninfo.percent = 0; // times to scale by 100
    integerpart = 1; // reset for new section
    lastwasinteger = 0;
    format.operators.push(scfn.commands.section);
    format.operands.push(ch);
  } else if (ch.toLowerCase()=='g') {
    ingeneral = 1;
    lastwasinteger = 0;
  } else if (ch.toLowerCase()=='a') {
    ampmstr = ch;
    lastwasinteger = 0;
  } else if ('dmyhHs'.indexOf(ch)>=0) {
    //console.log('foo')
    indate = ch;
  } else {
    lastwasinteger = 0;
    format.operators.push(scfn.commands.copy);
    format.operands.push(ch);
  }
}

// last char was part of unsaved date placeholder
if (indate) {
  format.operators.push(scfn.commands.date);
  format.operands.push(indate);
  sectioninfo.hasdate = 1;
}

return;

}


/* *******************

bracketdata = FormatNumber.parse_format_bracket(bracketstr)

Takes a bracket contents (e.g., "RED", ">10") and returns an operator and operand

bracketdata->{}
.operator
.operand

************************* */

FormatNumber.parse_format_bracket = function(bracketstr) {

  var scfn = FormatNumber;

  var bracketdata={};
  var parts;

  // currency
  if (bracketstr.charAt(0)=='$') {
    bracketdata.operator = scfn.commands.currency;
    parts=bracketstr.match(/^\$(.+?)(\-.+?){0,1}$/);
    if (parts) {
      bracketdata.operand = parts[1] || DefaultCurrency || '$';
    } else {
      bracketdata.operand = bracketstr.substring(1) || DefaultCurrency || '$';
    }
  } else if (bracketstr=='?$') {
    bracketdata.operator = scfn.commands.currency;
    bracketdata.operand = '[?$]';
  } else if (AllowedColors[bracketstr.toUpperCase()]) {
    bracketdata.operator = scfn.commands.color;
    bracketdata.operand = AllowedColors[bracketstr.toUpperCase()];
  } else if (parts=bracketstr.match(/^style=([^']*)$/)) {
    // [style=...]
    bracketdata.operator = scfn.commands.style;
    bracketdata.operand = parts[1];
  }
  else if (bracketstr==',') {
    bracketdata.operator = scfn.commands.separator;
    bracketdata.operand = bracketstr;
  }
  else if (AllowedDates[bracketstr.toUpperCase()]) {
    bracketdata.operator = scfn.commands.date;
    bracketdata.operand = AllowedDates[bracketstr.toUpperCase()];
  }
  else if (parts=bracketstr.match(/^[<>=]/)) { // comparison operator
    parts=bracketstr.match(/^([<>=]+)(.+)$/); // split operator and value
    bracketdata.operator = scfn.commands.comparison;
    bracketdata.operand = parts[1]+':'+parts[2];
  }
  else { // unknown bracket
    bracketdata.operator = scfn.commands.copy;
    bracketdata.operand = '['+bracketstr+']';
  }

  return bracketdata;

}

function text(value, format, currency_char) {
  return FormatNumber.formatNumberWithFormat(value, format, currency_char);
}

// TRIMS returns a string without whitespace at the beginning or end.
function trim(text) {
    if (typeof text !== 'string') {
        return error$2.value;
    }
    return text.trim();
}

// Copyright 2015 Peter W Moresi

// UPPER converts a string to upper case
function upper(string) {
  return string.toUpperCase()
}

// VLOOKUP find a needle in a table searching vertically.
function vlookup(needle, table=[], index=1, exactmatch=false) {

    if ( iserror(needle) || isblank(needle) ) {
        return needle;
    }

    for (var i = 0; i < table.length; i++){
        var row = table[i];

        if (index > row.length){
          return error$2.ref
        }

        if ((exactmatch && row[0]===needle) ||
            ((row[0] == needle) ||
             (typeof row[0] === "string" && row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1) )) {
            return (index < (row.length+1) ? row[index-1] : row[0]);
        }
    }

    return error$2.na;

}

// XOR computes the exclusive or for a given set of `values`.
function xor(...values) {
    return !!(flatten(values).reduce((a,b) => {
      if (b) {
        return a+1
      }
      return a
    }, 0) & 1)
}

export { abs, acos, add, and, average, bin2dec, branch, cellindex, changed, choose, clean, code, column, columnletter, columnnumber, concatenate, cos, date, datevalue, datedif, days360, dec2bin, diff, divide, eq, exact, filter, find, flatten, gt, gte, guid, hlookup, ifblank, ifempty, iferror, ifna, index2col, index2row, indirect, isarray, isblank, isdate, isemail, isempty, iserror, iseven, isfunction, isna, isnumber, isodd, isref, istext, isurl, len, lookup, lower, lt, lte, min, max, multiply, n, numbervalue, ne, not, oct2dec, or, parsebool, parsedate, pi, pmt, power, ref$1 as ref, replace, rept, right, round, roundup, search, select, serial, sin, some, sort, split, substitute, subtract, sum, tan, tau, text, trim, unique, upper, vlookup, xor };