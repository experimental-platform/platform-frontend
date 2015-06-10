var auth = require('../helper/auth');

module.exports = function(router) {
  // TODO: return system data: IP, hostname, hardware revision, software revision, etc.
  router.get('/system', auth, function(req, res, next) {
    res.json({ status: "okay" });
  });
};
