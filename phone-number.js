var validator = require('validator'),
  NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const ERROR_NUMBER = '0000000000';

var PhoneNumber = function(rawNumber) {
  this.number = rawNumber;
};

PhoneNumber.prototype.number = function() {
  throw new NotImplementedException();
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
    if (validator.isWhitelisted(rawInput[i], '0123456789')) {
      result = result + rawInput[i];
    }
  }

  return result;
};

/*
 * Validates that a numeric string is a valid phone number according to
 * the rules set in the README.
 */

PhoneNumber.prototype.validatePhoneNumber = function() {
  throw new NotImplementedException();
};

module.exports = PhoneNumber;
