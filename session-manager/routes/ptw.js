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
          if (res.statusCode == HttpStatus.OK) {
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
          if (res.statusCode == HttpStatus.OK) {
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

  router.post('/ptw/nodename', auth, function(req, res, next) {
    var nodename = req.body['nodename'];
    if (nodename != undefined && nodename != "") {
      // make more checks and if name is really avaible! We need some kind of own service to do this..
      var options = {
        url: api('/ptw/nodename'),
        method: 'POST',
        form: {
          value: nodename
        }
      }

      request(options, function(err, response, result) {
        console.log(response.statusCode, HttpStatus.OK);
        if (response.statusCode == HttpStatus.OK) {
          res.json({
            nodename: result.value,
            success: true
          })
        } else {
          next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR))
        }
      });
    } else {
      next(error_helper(HttpStatus.BAD_REQUEST));
    }
  });
}
