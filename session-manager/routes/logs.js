var request = require('request').defaults({json: true});
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth');
var error_helper = require('../helper/error').errorHelper;
var request_handler = require('../helper/error').requestHandler;

module.exports = function (router) {
  router.get('/logs/all', auth, function (req, res, next) {
      var options = {
        url: 'http://127.0.0.1:19531/entries?boot',
        method: 'PUT',
        headers: {
          Accept: 'application/json'
          // Range: 'entries=cursor:100'
        }
      };
      request(options, request_handler(function (response, result) {
        response.json(result);
      }, next))
    }
  )
};
