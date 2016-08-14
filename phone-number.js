var NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

const ERROR_NUMBER = '0000000000';

var PhoneNumber = function(rawNumber) {
  throw new NotImplementedException();
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
 * Remove control chars, trim, and remove 
 */
PhoneNumber.prototype.sanitize = function() {
  throw new NotImplementedException();
};

module.exports = PhoneNumber;
