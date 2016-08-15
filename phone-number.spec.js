'use strict'

var PhoneNumber = require('./phone-number'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const ERROR_NUMBER = '0000000000';
const UNPRINTABLE_CHARS = '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f';

xdescribe('number()', function() {
  it('cleans the number (123) 456-7890', function() {
    var phone = new PhoneNumber('(123) 456-7890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('cleans numbers with dots', function() {
    var phone = new PhoneNumber('123.456.7890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('valid when 11 digits and first digit is 1', function() {
    var phone = new PhoneNumber('11234567890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('invalid when 11 digits', function() {
    var phone = new PhoneNumber('21234567890');
    expect(phone.number()).toEqual('0000000000');
  });

  it('invalid when 9 digits', function() {
    var phone = new PhoneNumber('123456789');
    expect(phone.number()).toEqual('0000000000');
  });
});

xdescribe('areaCode()', function() {
  xit('has an area code', function() {
    var phone = new PhoneNumber('1234567890');
    expect(phone.areaCode()).toEqual('123');
  });
});

xdescribe('toString()', function() {
  xit('formats a number', function() {
    var phone = new PhoneNumber('1234567890');
    expect(phone.toString()).toEqual('(123) 456-7890');
  });
});

describe('parse()', function() {
  it('parses areaCode properly', function() {
    var input = '0123456789';
    var phone = new PhoneNumber(input);
    var expected = '012';
    expect(phone.areaCode).toEqual(expected);
  });

  it('parses exchangeCode properly', function() {
    var input = '0123456789';
    var phone = new PhoneNumber(input);
    var expected = '345';
    expect(phone.exchangeCode).toEqual(expected);
  });

  it('parses baseCode properly', function() {
    var input = '0123456789';
    var phone = new PhoneNumber(input);
    var expected = '6789';
    expect(phone.baseCode).toEqual(expected);
  });
});

xdescribe('sanitize()', function() {
  it('throws InvalidParameterException when given non-string input', function() {
    expect(function() {
      var phone = new PhoneNumber('10');
      phone.sanitize({});
    }).toThrow(
      new InvalidParameterException('Input was not a string'));
  });

  it('removes garbage characters and returns a numeric string.', function() {
    var input = UNPRINTABLE_CHARS + '01234567890123456789';
    var phone = new PhoneNumber(input);
    var actual = phone.sanitize(input);
    var expected = '01234567890123456789';
    expect(actual).toEqual(expected);
  });

  it('removes letters and returns a numeric string', function() {
    var input = 'a012asdfasfwei345earwar;klasjdf678901a;lksjd\t\nfaklsjfa23^((*$&(#*))@)*&$(&456789';
    var phone = new PhoneNumber(input);
    var actual = phone.sanitize(input);
    var expected = '01234567890123456789';
    expect(actual).toEqual(expected);
  });

  it('returns empty string when there are no numbers in the input', function () {
    var input = UNPRINTABLE_CHARS + 'asjdafklsjfklajsklf;jsa*&*()&*()&*()&$(*)&)$*(';
    var phone = new PhoneNumber(input);
    var actual = phone.sanitize(input);
    var expected = '';
    expect(actual).toEqual(expected);
  });

  it('negative numbers become positive, since \-\ is not a number', function() {
    var input = '1234';
    var phone = new PhoneNumber(input);
    var actual = phone.sanitize(input);
    var expected = '1234';
    expect(actual).toEqual(expected);
  });
});

xdescribe('validatePhoneNumber()', function() {
  it('throws InvalidParameterException for non-string input', function() {
    expect(function() {
      var phone = new PhoneNumber('10');
      phone.validatePhoneNumber({});
    }).toThrow(
      new InvalidParameterException('Input was not a string'));
  });

  it('returns error number for input containing non-numeric characters', function() {
    var input = UNPRINTABLE_CHARS + 'a012asdfasfwei345earwar;klasjdf678901a;lksjd\t\nfaklsjfa23^((*$&(#*))@)*&$(&456789';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = ERROR_NUMBER;
    expect(actual).toEqual(expected);
  });

  it('returns error number for numeric input containing more than 11 characters', function() {
    var input = '012345678901234567890123456789';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = ERROR_NUMBER;
    expect(actual).toEqual(expected);
  });

  it('returns error number for numeric input containing less than 10 characters', function() {
    var input = '10';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = ERROR_NUMBER;
    expect(actual).toEqual(expected);
  });

  it('returns valid number for 10 digit numeric strings', function() {
    var input = '0123456789';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = '0123456789';
    expect(actual).toEqual(expected);
  });

  it('returns valid number for 11 digit numeric strings when the first digit is a \'1\'', function() {
    var input = '10123456789';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = '0123456789';
    expect(actual).toEqual(expected);
  });

  it('returns error number for 11 digit numeric strings when the first digit is not a \'1\'', function() {
    var input = '60123456789';
    var phone = new PhoneNumber(input);
    var actual = phone.validatePhoneNumber(input);
    var expected = ERROR_NUMBER;
    expect(actual).toEqual(expected);
  });
});
