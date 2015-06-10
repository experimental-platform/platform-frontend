var request = require('request').defaults({ json: true });
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth')
var api = require('../helper/api').appsApiUrl
var error_helper = require('../helper/error').errorHelper
var request_handler = require('../helper/error').requestHandler

function ensureAppNameGiven(cb) {
  return function(req, res, next) {
    var name = req.body['name'];
    if(name != undefined && name != "") {
      cb(name, req, res, next);
    } else {
      next(error_helper(HttpStatus.BAD_REQUEST));
    }
  }
}

module.exports = function(router) {
  router.get('/apps', auth, function(req, res, next) {
    request(api('/list'), request_handler(function(response, res_result) {
      if (response.statusCode == HttpStatus.OK) {
        res.json(res_result);
      } else {
        next(error_helper(HttpStatus.BAD_REQUEST));
      }
    }, next));
  });

  var valid_post_actions = ['start', 'stop', 'restart', 'destroy', 'rebuild'];
  router.post('/apps/:action', auth, function(req, res, next) {
    var name = req.body['name'];
    if(name != undefined && name != "") {
      var action = req.params["action"];
      if(valid_post_actions.indexOf(action) != -1) {
        var options = {
          url: api('/' + action),
          method: 'POST',
          form: {
            name: name
          }
        }
        request(options, request_handler(function(response, res_result) {
          if(response.statusCode == HttpStatus.OK) {
            res.json(res_result);
          } else {
            next(error_helper(HttpStatus.NOT_FOUND));
          }
        }, next));
      } else {
        next(error_helper(HttpStatus.BAD_REQUEST));
      }
    } else {
      next(error_helper(HttpStatus.BAD_REQUEST));
    }
  });

  var valid_get_actions = ['urls', 'logs'];
  router.get('/apps/:action/:appname', auth, function(req, res, next) {
    var action = req.params["action"];
    var appname = req.params["appname"];
    if(valid_get_actions.indexOf(action) != -1) {
      request(api('/' + action + '/' + appname), request_handler(function(response, res_result) {
        if(response.statusCode == HttpStatus.OK) {
          res.json(res_result);
        } else {
          next(error_helper(HttpStatus.NOT_FOUND));
        }
      }, next));
    } else {
      next(error_helper(HttpStatus.BAD_REQUEST));
    }
  });
}
