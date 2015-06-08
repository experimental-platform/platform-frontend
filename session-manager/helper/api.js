var urljoin = require('url-join');

var SKVS_API_URL = "http://skvs"

if (process.env.NODE_ENV == 'development') {
  SKVS_API_URL = "http://127.0.0.1:8080"
}

module.exports = {
  skvsApiUrl: function(path) {
    return urljoin(SKVS_API_URL, path);
  }
}
