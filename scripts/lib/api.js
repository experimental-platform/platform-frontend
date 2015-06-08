angular.module("protonet.platform")
  .factory("API", function($http) {
    var apiHost = "";
    if (location.href.indexOf("http://localhost") !== -1) {
      apiHost = "http://localhost:3000";
    }
    return {
      post: function(path, params) {
        return $http.post(apiHost + path, params);
      }
    }
  });