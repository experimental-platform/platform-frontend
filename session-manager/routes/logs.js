var auth = require('../helper/auth');
var run_cmd = require('../helper/cli').run_cmd;

module.exports = function (router) {
  router.get('/logs', auth, function (req, res, next) {
      run_cmd('bin/journalctl.sh', res, next);
    }
  );

  router.get('/logs/:container', auth, function (req, res, next) {
      var container = req.params["container"];
      run_cmd('./bin/docker.sh ' + container, res, next);
    }
  );
};
