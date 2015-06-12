var request = require('request').defaults({json: true});
var HttpStatus = require('http-status-codes');
var auth = require('../helper/auth');
var error_helper = require('../helper/error').errorHelper;
var request_handler = require('../helper/error').requestHandler;

var exec = require('child_process').exec();

module.exports = function (router) {
  router.get('/logs', auth, function (req, res, next) {
      // 'journalctl --output=json --boot --utc --no-pager --unit=sshd.socket'
      child = exec('journalctl --output=json --boot --utc --no-pager',
        request_handler(function (error, stdout, stderr) {
          if (error == null && stderr == '') {
            res.json(stdout);
          } else {
            console.log('exec error: ' + error);
            console.log('stderr: ' + stderr);
            next(error_helper(HttpStatus.BAD_REQUEST));
          }
        }, next));
    }
  )
};
