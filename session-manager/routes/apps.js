var request = require('request').defaults({ json: true });
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth')
var api = require('../helper/api').appsApiUrl
var error_helper = require('../helper/error').errorHelper
var request_handler = require('../helper/error').requestHandler

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

  router.post('/apps/start', auth, function(req, res, next) {

  });
}
