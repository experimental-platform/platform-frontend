var request = require('request').defaults({json: true});

var auth = require('../helper/auth');
var error_helper = require('../helper/error').errorHelper;
var run_cmd = require('../helper/cli').run_cmd;
var exec = require('child_process').exec;

// TODO: Remove this to reenable authentication!
auth = function (req, res, next) {
  next();
};

module.exports = function (router) {
  router.get('/logs', auth, function (req, res, next) {
      // 'journalctl --output=json --boot --utc --no-pager --unit=sshd.socket'
      run_cmd('journalctl --output=json --boot --utc --no-pager', res, next);
    }
  );

  router.get('/logs/:container', auth, function (req, res, next) {
      // 'journalctl --output=json --boot --utc --no-pager --unit=sshd.socket'
      var container = req.params["container"];
      run_cmd('docker logs ' + container, res, next);
    }
  );

};
