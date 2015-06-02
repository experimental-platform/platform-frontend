var urljoin = require('url-join');

var API_URL = "http://skvs"

if (process.env.NODE_ENV == 'development') {
  API_URL = "http://127.0.0.1:8080"
}

module.exports = {
  apiUrl: function(path) {
    return urljoin(API_URL, path);
  }
}
