import test from "tape";
import * as ff from "../fn/functions";

test("lower case functions should be there", function(t) {
  t.plan(154);
  t.ok(ff.abs, "abs should be there");
  t.ok(ff.accrint, "accrint should be there");
  t.ok(ff.acos, "acos should be there");
  t.ok(ff.acosh, "acosh should be there");
  t.ok(ff.acot, "acot should be there");
  t.ok(ff.acoth, "acoth should be there");
  t.ok(ff.asin, "asin should be there");
  t.ok(ff.asinh, "asinh should be there");
  t.ok(ff.atan, "atan should be there");
  t.ok(ff.atan2, "atan2 should be there");
  t.ok(ff.add, "add should be there");
  t.ok(ff.and, "and should be there");
  t.ok(ff.average, "average should be there");
  t.ok(ff.base, "base should be there");
  t.ok(ff.bin2dec, "bin2dec should be there");
  t.ok(ff.branch, "branch should be there");
  t.ok(ff.camelcase, "camelcase should be there");
  t.ok(ff.ceiling, "ceiling should be there");
  t.ok(ff.cellindex, "cellindex should be there");
  t.ok(ff.char, "char should be there");
  t.ok(ff.choose, "choose should be there");
  t.ok(ff.concatenate, "concatenate should be there");
  t.ok(ff.cond, "cond should be there");
  t.ok(ff.code, "code should be there");
  t.ok(ff.column, "column should be there");
  t.ok(ff.columnletter, "columnletter should be there");
  t.ok(ff.columnnumber, "columnnumber should be there");
  t.ok(ff.cos, "cos should be there");
  t.ok(ff.cumipmt, "cumipmt should be there");
  t.ok(ff.date, "date should be there");
  t.ok(ff.datedif, "datedif should be there");
  t.ok(ff.datevalue, "datevalue should be there");
  t.ok(ff.days360, "days360 should be there");
  t.ok(ff.day, "day should be there");
  t.ok(ff.dec2bin, "dec2bin should be there");
  t.ok(ff.divide, "divide should be there");
  t.ok(ff.decodebase64, "decodebase64 should be there");
  t.ok(ff.decodejwt, "decodejwt should be there");
  t.ok(ff.degrees, "degrees should be there");
  t.ok(ff.edate, "edate should be there");
  t.ok(ff.eomonth, "eomonth should be there");
  t.ok(ff.eq, "eq should be there");
  t.ok(ff.even, "even should be there");
  t.ok(ff.exact, "exact should be there");
  t.ok(ff.filter, "filter should be there");
  t.ok(ff.find, "find should be there");
  t.ok(ff.flatten, "flatten should be there");
  t.ok(ff.floor, "floor should be there");
  t.ok(ff.fv, "fv should be there");
  t.ok(ff.get, "get should be there");
  t.ok(ff.gt, "gt should be there");
  t.ok(ff.gte, "gte should be there");
  t.ok(ff.group, "group should be there");
  t.ok(ff.guid, "guid should be there");
  t.ok(ff.hlookup, "hlookup should be there");
  t.ok(ff.hour, "hour should be there");
  t.ok(ff.includes, "includes should be there");
  t.ok(ff.int, "int should be there");
  t.ok(ff.ifna, "ifna should be there");
  t.ok(ff.ifblank, "ifblank should be there");
  t.ok(ff.ifempty, "ifempty should be there");
  t.ok(ff.ifs, "ifs should be there");
  t.ok(ff.index, "index should be there");
  t.ok(ff.index2col, "index2col should be there");
  t.ok(ff.index2row, "index2row should be there");
  t.ok(ff.ipmt, "ipmt should be there");
  t.ok(ff.isarray, "isarray should be there");
  t.ok(ff.isblank, "isblank should be there");
  t.ok(ff.isdate, "isdate should be there");
  t.ok(ff.isempty, "isempty should be there");
  t.ok(ff.isemail, "isemail should be there");
  t.ok(ff.iserror, "iserror should be there");
  t.ok(ff.iseven, "iseven should be there");
  t.ok(ff.isfalsy, "isfalsy should be there");
  t.ok(ff.isfunction, "isfunction should be there");
  t.ok(ff.isleapyear, "isleapyear should be there");
  t.ok(ff.isobject, "isobject should be there");
  t.ok(ff.isna, "isna should be there");
  t.ok(ff.isnan, "isnan should be there");
  t.ok(ff.isnumber, "isnumber should be there");
  t.ok(ff.isodd, "isodd should be there");
  t.ok(ff.isref, "isref should be there");
  t.ok(ff.istext, "istext should be there");
  t.ok(ff.istruthy, "istruthy should be there");
  t.ok(ff.isoweeknum, "isoweeknum should be there");
  t.ok(ff.isurl, "isurl should be there");
  t.ok(ff.iswholenumber, "iswholenumber should be there");
  t.ok(ff.join, "join should be there");
  t.ok(ff.left, "left should be there");
  t.ok(ff.len, "len should be there");
  t.ok(ff.lookup, "lookup should be there");
  t.ok(ff.lower, "lower should be there");
  t.ok(ff.lt, "lt should be there");
  t.ok(ff.lte, "lte should be there");
  t.ok(ff.map, "map should be there");
  t.ok(ff.match, "match should be there");
  t.ok(ff.min, "min should be there");
  t.ok(ff.minute, "minute should be there");
  t.ok(ff.max, "max should be there");
  t.ok(ff.multiply, "multiply should be there");
  t.ok(ff.n, "n should be there");
  t.ok(ff.numbers, "numbers should be there");
  t.ok(ff.numbervalue, "numbervalue should be there");
  t.ok(ff.ne, "ne should be there");
  t.ok(ff.not, "not should be there");
  t.ok(ff.notincludes, "notincludes should be there");
  t.ok(ff.now, "now should be there");
  t.ok(ff.npv, "npv should be there");
  t.ok(ff.nper, "nper should be there");
  t.ok(ff.oct2dec, "oct2dec should be there");
  t.ok(ff.or, "or should be there");
  t.ok(ff.parsebool, "parsebool should be there");
  t.ok(ff.parsedate, "parsedate should be there");
  t.ok(ff.parsequery, "parsequery should be there");
  t.ok(ff.pi, "pi should be there");
  t.ok(ff.pluck, "pluck should be there");
  t.ok(ff.pmt, "pmt should be there");
  t.ok(ff.power, "power should be there");
  t.ok(ff.proper, "proper should be there");
  t.ok(ff.pv, "pv should be there");
  t.ok(ff.query, "query should be there");
  t.ok(ff.reduce, "reduce should be there");
  t.ok(ff.ref, "ref should be there");
  t.ok(ff.rept, "rept should be there");
  t.ok(ff.replace, "replace should be there");
  t.ok(ff.right, "right should be there");
  t.ok(ff.search, "search should be there");
  t.ok(ff.second, "second should be there");
  t.ok(ff.select, "select should be there");
  t.ok(ff.snakecase, "snakecase should be there");
  t.ok(ff.split, "split should be there");
  t.ok(ff.sin, "sin should be there");
  t.ok(ff.some, "some should be there");
  t.ok(ff.sort, "sort should be there");
  t.ok(ff.subtract, "subtract should be there");
  t.ok(ff.substitute, "substitute should be there");
  t.ok(ff.substituteAll, "substituteAll should be there");
  t.ok(ff.surroundKeys, "surroundKeys should be there");
  t.ok(ff.sum, "sum should be there");
  t.ok(ff.tan, "tan should be there");
  t.ok(ff.tau, "tau should be there");
  t.ok(ff.template, "template should be there");
  t.ok(ff.text, "text should be there");
  t.ok(ff.time, "time should be there");
  t.ok(ff.timevalue, "timevalue should be there");
  t.ok(ff.today, "today should be there");
  t.ok(ff.trunc, "trunc should be there");
  t.ok(ff.unflatten, "unflatten should be there");
  t.ok(ff.unique, "unique should be there");
  t.ok(ff.upper, "upper should be there");
  t.ok(ff.vlookup, "vlookup should be there");
  t.ok(ff.xor, "xor should be there");
  t.ok(ff.year, "year should be there");
  t.ok(ff.yearfrac, "yearfrac should be there");
});

// test('camel case functions should be there', function(t) {
// })
