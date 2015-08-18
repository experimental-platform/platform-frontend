angular.module("protonet.platform")
  .factory("API", function($http, $q, $timeout) {
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
      },

      loadDetectionImage: function(url) {
        var defer = $q.defer();
        var img = new Image();
        img.onload = function() {
          defer.resolve();
          $timeout.cancel(timeout);
        };
        img.onerror = function() {
          defer.reject();
          $timeout.cancel(timeout);
        };
        var timeout = $timeout(function() {
          img.onload = img.onerror = null;
          defer.reject();
        }, 1000);

        img.src = this.getProtocolAndHost(url) + "/admin/experimental-platform-detection.png";

        return defer.promise;
      },

      chooseBestURL: function(urls) {
        var defer = $q.defer();
        var ptwURL, localURL;

        _.each(urls, function(url) {
          if (url.match(/\.protonet\.info/)) {
            ptwURL = url;
          } else {
            localURL = url;
          }
        });

        this.loadDetectionImage(localURL).then(function() {
          defer.resolve(ptwURL);
        }).catch(function() {
          defer.resolve(ptwURL);
        });

        return defer.promise;
      },

      getProtocolAndHost: function(url) {
        var anchor = document.createElement("a");
        anchor.href = url;
        return anchor.protocol + "//" + anchor.host;
      }
    };
  });