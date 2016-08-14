var NotImplementedException = require('./exceptions/NotImplementedException.js'),
  InvalidParameterException = require('./exceptions/InvalidParameterException.js');

var PhoneNumber = function(rawNumber) {
  throw new NotImplementedException();
};

PhoneNumber.prototype.number = function() {
  throw new NotImplementedException();
};

module.exports = PhoneNumber;
