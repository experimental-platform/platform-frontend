var error_helper = require('./error').errorHelper
var HttpStatus = require('http-status-codes');

module.exports = function(req, res, next) {
  if (req.session.logged_in) {
    next();
  } else {
    next(error_helper(HttpStatus.FORBIDDEN, 'No auth, dawg!'))
  }
}
