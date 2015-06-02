var express = require('express');
var router = express.Router();
var password = require('bcrypt-nodejs');
var request = require('request').defaults({ json: true });
var urljoin = require('url-join');
var HttpStatus = require('http-status-codes');
var async = require('async')

var API_URL = "http://skvs"

if (process.env.NODE_ENV == 'development') {
  API_URL = "http://127.0.0.1:8080"
}

function api(path) {
  return urljoin(API_URL, path);
}

function error_helper(statusCode, message) {
  statusCode = statusCode == undefined ? 500 : statusCode;
  if (message == undefined) {
    message = HttpStatus.getStatusText(statusCode);
  }
  var err = new Error(message);
  err.status = statusCode;
  return  err;
}

function auth(req, res, next) {
  if (req.session.logged_in) {
    next();
  } else {
    next(error_helper(HttpStatus.FORBIDDEN, 'No auth, dawg!'))
  }
}

router.post('/login', function (req, res, next) {
    var secret = req.body['password'];
    if (secret == undefined || secret == "") {
      next(error_helper(HttpStatus.FORBIDDEN, 'No Password given.'))
    } else {
      request(api('/password'), function (error, response, result) {
          if (response.statusCode === HttpStatus.NOT_FOUND) {
            next(error_helper(HttpStatus.NOT_FOUND, 'Password not set.'));
          } else if (response.statusCode === HttpStatus.OK) {
            var saved_digest = result['value'];
            if (password.compareSync(secret, saved_digest)) {
              req.session.logged_in = true;
              res.json({status: "Ok"})
            } else {
              next(error_helper(HttpStatus.FORBIDDEN, 'Wrong Password, access denied.'));
            }
          }
        }
      );
    }
  }
);

router.post('/logout', auth, function (req, res, next) {
    // TODO: Error handling ;)
    req.session.destroy();
    res.json({status: "Ok"})
  }
);

router.post('/password', auth, function (req, res, next) {
    var secret = req.body['password'];
    if (secret != undefined && secret != "") {
      // TODO: Add more Password requirments!
      // * Check if password was confirmed
      // * Check if old password is correct!
      var digest = password.hashSync(secret);
      var options = {
        url: api('/password'),
        method: 'POST',
        form: {
          value: digest
        }
      }
      request(options, function(err, response, result) {
        if (response.statusCode === HttpStatus.OK) {
          res.json({status: "Ok"})
        } else {
          next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR, 'Password could not be set.'));
        }
      });
    } else {
      next(error_helper(HttpStatus.NOT_FOUND, 'No password given.'));
    }
  }
);

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


module.exports = router;
