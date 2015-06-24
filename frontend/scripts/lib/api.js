angular.module("protonet.platform")
  .factory("API", function($http) {
    var apiHost = "";
    var options = {};
    if (location.href.indexOf(":8008") !== -1) {
      apiHost = "http://localhost:3000";
      options.withCredentials = true;
    }
    return {
      post: function(path, params) {
        return $http.post(apiHost + path, params, options).then(function(response) {
          return response.data;
        });
      },
      get: function(path) {
        return $http.get(apiHost + path, options).then(function(response) {
          return response.data;
        });
      }
    }
  });