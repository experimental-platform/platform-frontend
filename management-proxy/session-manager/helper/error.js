var HttpStatus = require('http-status-codes');

module.exports = {
  errorHelper: function(statusCode, message) {
    statusCode = statusCode == undefined ? 500 : statusCode;
    if (message == undefined) {
      message = HttpStatus.getStatusText(statusCode);
    }
    var err = new Error(message);
    err.status = statusCode;
    return  err;
  },
  requestHandler: function(success, failure) {
    return function(err, response, result) {
      if (!err) {
        success(response, result);
      } else {
        failure && failure(err);
      }
    }
  }
};
