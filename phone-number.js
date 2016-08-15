'use strict'

var validator = require('validator'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const VALID_CHARS = '0123456789';
const ERROR_NUMBER = '0000000000';

var PhoneNumber = function(rawNumber) {
  this.phoneNumber = this.validatePhoneNumber(this.sanitize(rawNumber));
  this.parse();
};

PhoneNumber.prototype.number = function() {
  return this.phoneNumber;
};

PhoneNumber.prototype.areaCode = function() {
  throw new NotImplementedException();
}

/*
 * Returns phone number in the format '(areaCode) exchange-base'
 */
PhoneNumber.prototype.toString = function() {
  throw new NotImplementedException();
}

/*
 * Takes a valid 10 digit phone number and pulls out the area code,
 * exchange code and base.
 */
PhoneNumber.prototype.parse = function() {
  this.areaCodeString = this.phoneNumber.substring(0, 3);
  this.exchangeCodeString = this.phoneNumber.substring(3, 6);
  this.baseCodeString = this.phoneNumber.substring(6,10);
};

/*
 * Remove all chars except for digits.
 * Does no validation.
 */
PhoneNumber.prototype.sanitize = function(rawInput) {
  var i = 0,
    result = '';

  if (typeof rawInput !== 'string') {
    throw new InvalidParameterException('Input was not a string');
  }

  for (i = 0 ; i < rawInput.length ; i++ ) {
    if (validator.isWhitelisted(rawInput[i], VALID_CHARS)) {
      result = result + rawInput[i];
    }
  }

  return result;
};

/*
 * Validates that a numeric string is a valid phone number according to
 * the rules set in the README.
 * Valid 11 digit numbers have their 1st number trimmed off.
 */

PhoneNumber.prototype.validatePhoneNumber = function(rawNumber) {
  var i = 0;

  if (typeof rawNumber !== 'string') {
    throw new InvalidParameterException('Input was not a string');
  }

  if (10 !== rawNumber.length && 11 !== rawNumber.length) {
    return ERROR_NUMBER;
  }

  for (i = 0 ; i < rawNumber.length ; i++ ) {
    if (!validator.isWhitelisted(rawNumber[i], VALID_CHARS)) {
      return ERROR_NUMBER;
    }
  }

  if (11 === rawNumber.length) {
    if (rawNumber[0] === '1') {
      rawNumber = rawNumber.substring(1, rawNumber.length);
    } else {
      return ERROR_NUMBER;
    }
  }

  return rawNumber;
};

module.exports = PhoneNumber;
