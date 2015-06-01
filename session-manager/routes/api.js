var express = require('express');
var router = express.Router();
var password = require('bcrypt-password');
var request = require('request');
var HttpStatus = require('http-status-codes');

var API_URL = "http://skvs"

if (process.env.NODE_ENV == 'development') {
  API_URL = "http://127.0.0.1:8080"
}

function error(statusCode, message) {
  statusCode = statusCode == undefined ? 500 : statusCode;
  if (message == undefined) {
    message = HttpStatus.getStatusText(statusCode);
  }
  var err = new Error(message);
  err.status = statusCode;
  return  err;
}

router.post('/login', function (req, res, next) {
    var secret = req.body['password'];
    if (secret == undefined || secret == "") {
      res.json()
    } else {
      password.hash(secret, function (error, digest) {
        request({url: API_URL + '/password', json: true}, function (error, response, body) {
            if (response.statusCode === HttpStatus.NOT_FOUND) {
              next(error(HttpStatus.NOT_FOUND, 'Password not set.'));
            } else if (response.statusCode === HttpStatus.OK) {
              var saved_digest = body['value'];

              password.check(digest, saved_digest, function (error, match) {
                if (match === true) {
                  req.session.logged_in = true;
                  res.json({status: "Ok"})
                } else {
                  // TODO: check for error?
                  next(error(HttpStatus.FORBIDDEN, 'Wrong Password, access denied.'));
                }
              });
            }
          }
        );
      });
    }
  }
);

router.post('/logout', function (req, res, next) {
    // TODO: Error handling ;)
    req.session = null;
    res.json({status: "Ok"})
  }
);


router.post('/password', function (req, res, next) {
    console.log(req.body.password)
    var password = req.body['password'];
    if (password != undefined && password != "") {
      // TODO: Add more Password requirments!
      password.hash(secret, function (error, digest) {
        var options = {
          url: API_URL + '/password',
          method: 'POST'
        }
      });
    } else {
      var err = new Error('No password given.')
      err.status = HttpStatus.NOT_FOUND
      err.message
      next(err)
    }
  }
);


module.exports = router;
