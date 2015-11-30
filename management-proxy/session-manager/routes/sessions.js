var password = require('bcrypt-nodejs');
var request = require('request').defaults({ json: true });
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth');
var api = require('../helper/api').skvsApiUrl;
var error_helper = require('../helper/error').errorHelper;
var request_handler = require('../helper/error').requestHandler;

module.exports = function(router) {
  router.get('/session', function(req, res, next) {
    request(api('/password'), request_handler(function (response, result) {
      if (response.statusCode === HttpStatus.NOT_FOUND) {
        res.json({ needsSetup: true, loggedIn: false });
      } else {
        res.json({ needsSetup: false, loggedIn: !!req.session.logged_in });
      }
    }));
  });

  router.post('/login', function (req, res, next) {
    check_password(req.body.password, function(success) {
      if (!success) {
        next(error_helper(HttpStatus.FORBIDDEN, 'Wrong password or password not set yet.'));
        return;
      }
      req.session.logged_in = true;
      res.json({ status: "Ok" });
    });
  });

  router.post('/logout', auth, function (req, res, next) {
    // TODO: Error handling ;)
    req.session.destroy();
    res.json({ status: "Ok" });
  });

  var check_password = function(secret, callback) {
    if (!secret || typeof(secret) !== "string") {
      console.log("Password empty.");
      callback(false);
      return;
    }
    request(api('/password'), request_handler(function (response, result) {
      if (response.statusCode === HttpStatus.NOT_FOUND) {
        console.log("Password not set.");
        callback(false);
      } else if (response.statusCode === HttpStatus.OK) {
        var saved_digest = result.value;
        if (password.compareSync(secret, saved_digest)) {
          callback(true);
        } else {
          console.log("Wrong password.");
          callback(false);
        }
      }
    }, function() {
      console.log("Error checking password.");
      callback(false);
    }));
  };

  var set_password = function (req, res, next) {
    var secret = req.body.password;
    if (secret) {
      var digest = password.hashSync(secret);
      var options = {
        url: api('/password'),
        method: 'POST',
        form: {
          value: digest
        }
      };
      request(options, request_handler(function(response, result) {
        if (response.statusCode === HttpStatus.OK) {
          res.json({status: "Ok"});
        } else {
          next(error_helper(HttpStatus.INTERNAL_SERVER_ERROR, 'Password could not be set.'));
        }
      }, next));
    } else {
      next(error_helper(HttpStatus.NOT_FOUND, 'No password given.'));
    }
  };

  router.post('/password', auth, function(req, res, next) {
    check_password(req.body.current_password, function(success) {
      if (!success) {
        next(error_helper(HttpStatus.FORBIDDEN, 'Current password is incorrect.'));
        return;
      }
      set_password(req, res, next);
    });
  });

  router.post('/password/initial', function (req, res, next) {
    request(api('/password'), request_handler(function(response, result) {
      if (response.statusCode === HttpStatus.NOT_FOUND) {
        set_password(req, res, next);
      } else {
        next(error_helper(HttpStatus.FORBIDDEN, 'Initial password already set!'));
      }
    }, next));
  });
};
