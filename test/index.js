import test from 'tape'
import * as ff from '../src/index'

test('index', function(t) {

  t.test( 87 )
  t.ok( ff.abs, 'abs should be there')
  t.ok( ff.acos, 'acos should be there')
  t.ok( ff.add, 'add should be there')
  t.ok( ff.and, 'and should be there')
  t.ok( ff.average, 'average should be there')
  t.ok( ff.bin2dec, 'bin2dec should be there')
  t.ok( ff.branch, 'branch should be there')
  t.ok( ff.cellindex, 'cellindex should be there')
  t.ok( ff.choose, 'choose should be there')
  t.ok( ff.concatenate, 'concatenate should be there')
  t.ok( ff.code, 'code should be there')
  t.ok( ff.column, 'column should be there')
  t.ok( ff.columnletter, 'columnletter should be there')
  t.ok( ff.columnnumber, 'columnnumber should be there')
  t.ok( ff.cos, 'cos should be there')
  t.ok( ff.date, 'date should be there')
  t.ok( ff.datedif, 'datedif should be there')
  t.ok( ff.datevalue, 'datevalue should be there')
  t.ok( ff.days360, 'days360 should be there')
  t.ok( ff.dec2bin, 'dec2bin should be there')
  t.ok( ff.divide, 'divide should be there')
  t.ok( ff.eq, 'eq should be there')
  t.ok( ff.exact, 'exact should be there')
  t.ok( ff.filter, 'filter should be there')
  t.ok( ff.find, 'find should be there')
  t.ok( ff.flatten, 'flatten should be there')
  t.ok( ff.gt, 'gt should be there')
  t.ok( ff.gte, 'gte should be there')
  t.ok( ff.hlookup, 'hlookup should be there')
  t.ok( ff.ifna, 'ifna should be there')
  t.ok( ff.ifblank, 'ifblank should be there')
  t.ok( ff.ifempty, 'ifempty should be there')
  t.ok( ff.index2col, 'index2col should be there')
  t.ok( ff.index2row, 'index2row should be there')
  t.ok( ff.indirect, 'indirect should be there')
  t.ok( ff.isarray, 'isarray should be there')
  t.ok( ff.isblank, 'isblank should be there')
  t.ok( ff.isdate, 'isdate should be there')
  t.ok( ff.isempty, 'isempty should be there')
  t.ok( ff.isemail, 'isemail should be there')
  t.ok( ff.iserror, 'iserror should be there')
  t.ok( ff.iseven, 'iseven should be there')
  t.ok( ff.isna, 'isna should be there')
  t.ok( ff.isnumber, 'isnumber should be there')
  t.ok( ff.isodd, 'isodd should be there')
  t.ok( ff.isref, 'isref should be there')
  t.ok( ff.istext, 'istext should be there')
  t.ok( ff.left, 'left should be there')
  t.ok( ff.len, 'len should be there')
  t.ok( ff.lookup, 'lookup should be there')
  t.ok( ff.lower, 'lower should be there')
  t.ok( ff.lt, 'lt should be there')
  t.ok( ff.lte, 'lte should be there')
  t.ok( ff.min, 'min should be there')
  t.ok( ff.max, 'max should be there')
  t.ok( ff.multiply, 'multiply should be there')
  t.ok( ff.n, 'n should be there')
  t.ok( ff.numbervalue, 'numbervalue should be there')
  t.ok( ff.ne, 'ne should be there')
  t.ok( ff.oct2dec, 'oct2dec should be there')
  t.ok( ff.or, 'or should be there')
  t.ok( ff.parsebool, 'parsebool should be there')
  t.ok( ff.parsedate, 'parsedate should be there')
  t.ok( ff.pi, 'pi should be there')
  t.ok( ff.pmt, 'pmt should be there')
  t.ok( ff.power, 'power should be there')
  t.ok( ff.ref, 'ref should be there')
  t.ok( ff.rept, 'rept should be there')
  t.ok( ff.replace, 'replace should be there')
  t.ok( ff.right, 'right should be there')
  t.ok( ff.search, 'search should be there')
  t.ok( ff.select, 'select should be there')
  t.ok( ff.split, 'split should be there')
  t.ok( ff.sin, 'sin should be there')
  t.ok( ff.some, 'some should be there')
  t.ok( ff.sort, 'sort should be there')
  t.ok( ff.subtract, 'subtract should be there')
  t.ok( ff.substitute, 'substitute should be there')
  t.ok( ff.sum, 'sum should be there')
  t.ok( ff.tan, 'tan should be there')
  t.ok( ff.tau, 'tau should be there')
  t.ok( ff.text, 'text should be there')
  t.ok( ff.unique, 'unique should be there')
  t.ok( ff.upper, 'upper should be there')
  t.ok( ff.vlookup, 'vlookup should be there')
  t.ok( ff.xor, 'xor should be there')
})
