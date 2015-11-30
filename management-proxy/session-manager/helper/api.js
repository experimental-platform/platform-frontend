var urljoin = require('url-join');

var SKVS_API_URL = "http://skvs";
var APPS_API_URL = "http://app-manager";
var MONITORING_API_URL = "http://monitoring";
var HARDWARE_API_URL = "http://unix:/hardware/hardware.sock:/v1/hardware";
var DOCKERHUB_API_URL = "https://index.docker.io/v1/repositories/experimentalplatform";

if (process.env.NODE_ENV == 'development') {
  SKVS_API_URL = "http://127.0.0.1:8080";
  APPS_API_URL = "http://127.0.0.1:8081/apps";
  MONITORING_API_URL = "http://127.0.0.1:8081/monitoring";
  HARDWARE_API_URL = "http://127.0.0.1:8082";
}

module.exports = {
  skvsApiUrl: function(path) {
    return urljoin(SKVS_API_URL, path);
  },

  appsApiUrl: function(path) {
    return urljoin(APPS_API_URL, path);
  },

  monitoringApiUrl: function(path) {
    return urljoin(MONITORING_API_URL, path);
  },

  dockerHubApiUrl: function(path) {
    return urljoin(DOCKERHUB_API_URL, path);
  },

  hardwareManagerApiUrl: function(path) {
    // ATTN: urljoin fucks up invalid urls like those needed by request to connect to unix sockets
    return HARDWARE_API_URL + '/' + path;
  }
};
