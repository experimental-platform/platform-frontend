var request = require('request').defaults({ json: true });
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth')
var api = require('../helper/api').apiUrl
var fingerprint = require('ssh-fingerprint');
var error_helper = require('../helper/error').errorHelper
var request_handler = require('../helper/error').requestHandler

module.exports = function(router) {

  router.post('/ssh/add', auth, function(req, res, next) {
    var key = req.body['key'];
    if (key != undefined && key != "") {
      var description = key.split(' ')[2];
      if (description == undefined) {
        description = '';
      }
      var key_name = new Buffer(fingerprint(key) + ' (' + description + ')').toString('hex');

      var options = {
        url: api('/ssh/' + key_name),
        method: 'PUT',
        form: {
          value: key
        }
      }
      request(options, request_handler(function(response, res_result) {
        if (response.statusCode == HttpStatus.OK) {
          res.json({
            success: true
          });
        } else {
          next(error_helper(HttpStatus.BAD_REQUEST));
        }
      }, next));
    }
  });

  router.post('/ssh/delete', auth, function(req, res, next) {
    var key_name = req.body['id'];
    var options = {
      url: api('/ssh/' + key_name),
      method: 'DELETE'
    }
    request(options, request_handler(function(response, res_result) {
      if (response.statusCode == HttpStatus.OK) {
        res.json({
          success: true
        });
      } else if(response.statusCode == HttpStatus.NOT_FOUND) {
        next(error_helper(HttpStatus.NOT_FOUND, 'Key with id ' + key_name + ' does not exists!'));
      } else {
        next(error_helper(HttpStatus.BAD_REQUEST));
      }
    }, next));
  });

  router.get('/ssh', auth, function(req, res, next) {
    request(api('/ssh'), request_handler(function(response, res_result) {
      var result = { keys: [] }
      if (response.statusCode == HttpStatus.OK && res_result.namespace) {
        for(var index in res_result.keys) {
          try {
            var key_name = res_result.keys[index];
            result.keys.push({
              id: key_name,
              description: new Buffer(key_name, 'hex').toString('utf8')
            });
          } catch(err) {
            // do nothing, looks like there are dirty entries in skvs
            console.log("Error", err);
          }
        }
      }
      res.json(result);
    }, next));
  });
}
