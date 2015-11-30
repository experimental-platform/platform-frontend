var request = require('request').defaults({json: true});
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth');
var api = require('../helper/api').hardwareManagerApiUrl;
var error_helper = require('../helper/error').errorHelper;
var request_handler = require('../helper/error').requestHandler;

module.exports = function (router) {
  router.get('/devices', auth, function(req, res, next) {
    request(api('list'), request_handler(function (response, res_result) {
      if (response.statusCode == HttpStatus.OK) {
        res.json(res_result);
      } else {
        next(error_helper(HttpStatus.BAD_REQUEST));
      }
    }, next));
  });

  router.get('/devices/:identifier', auth, function (req, res, next) {
    var identifier = req.params["identifier"];
    request(api('list?identifier=' + identifier), request_handler(function (response, res_result) {
      if (response.statusCode == HttpStatus.OK) {
        res.json(res_result);
      } else {
        next(error_helper(HttpStatus.BAD_REQUEST));
      }
    }, next));
  });
};
