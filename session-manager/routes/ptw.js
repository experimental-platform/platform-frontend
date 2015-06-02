var request = require('request').defaults({ json: true });
var HttpStatus = require('http-status-codes');
var async = require('async')
var auth = require('../helper/auth')
var api = require('../helper/api').apiUrl
var error_helper = require('../helper/error').errorHelper

module.exports = function(router) {
  router.get('/ptw', auth, function(req, res, next) {
    async.parallel({
      enabled: function(callback) {
        request(api('/ptw/enabled'), function(err, res, result) {
          if (res.statusCode == HttpStatus.Ok) {
            callback(null, true)
          } else if (res.statusCode == HttpStatus.NOT_FOUND) {
            callback(null, false)
          } else {
            next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR));
          }
        });
      },
      nodename: function(callback) {
        request(api('/ptw/nodename'), function(err, res, result) {
          if (res.statusCode == HttpStatus.Ok) {
            callback(null, result.value)
          } else if (res.statusCode == HttpStatus.NOT_FOUND) {
            callback(null, null)
          } else {
            next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR));
          }
        });
      }
    }, function(err, results) {
      if (err) {
        next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR));
      } else {
        res.json(results);
      }
    });
  });
}
