var auth = require('../helper/auth');

module.exports = function(router) {
  router.get('/system', auth, function(req, res, next) {
    res.json({});
  });
}
