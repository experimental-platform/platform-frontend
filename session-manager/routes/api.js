var express = require('express');
var router = express.Router();
var password = require('bcrypt-password');
var request = require('request');

var API_URL = "http://skvs"

if (process.env.NODE_ENV == 'development') {
  API_URL = "http://127.0.0.1:8080"
}

router.post('/login', function (req, res, next) {
    var secret = req.body['password'];
    password.hash(secret, function (error, digest) {
      request({url: API_URL + '/password', json: true}, function (error, response, body) {
          if (response.statusCode === 404) {
            var err = new Error('Not Found');
            err.status = 404;
            err.message = 'Password not set.';
            next(err);
          } else if (response.statusCode === 200) {
            var saved_digest = body['value'];

            password.check(digest, saved_digest, function (error, match) {
              if (match === true) {
                res.send('OKAY');
                req.session.logged_in = true;
              } else {
                // TODO: check for error?
                var err = new Error('Not Found');
                err.status = 403;
                err.message = 'Wrong Password, access denied.';
                next(err);
              }
            });
          }
        }
      );
    });
  }
);

router.post('/logout', function (req, res, next) {
    // TODO: Error handling ;)
    req.session = null;
    res.send('OKAY');
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
      err.status = 404
      err.message
      next(err)
    }
  }
);


module.exports = router;
