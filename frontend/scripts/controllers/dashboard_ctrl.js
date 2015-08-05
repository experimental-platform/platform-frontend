angular.module("protonet.platform").controller("DashboardCtrl", function($scope, $q, API, Notification, App) {
  App.startFetcher();
  $scope.apps = App.records;

  $scope.loaded = function() {
    return App.loaded;
  };

  $scope.$on("$destroy", function() {
    App.stopFetcher();
  });

  function post(action, app) {
    app.loading = true;
    var deferred = $q.defer();
    API.post("/admin/api/apps/" + action, { name: app.name }).then(function(data) {
      deferred.resolve(data);
    }).catch(function() {
      deferred.reject(1);
      Notification.error("Could not " + action + " app. Please try again.");
    }).finally(function() {
      app.loading = false;
    });
    return deferred.promise;
  }

  $scope.deleteApp = function(app) {
    if (!confirm("Are you sure you want to delete the app '" + app.name + "'?")) {
      return;
    }

    app.loadingState = "destroying …";
    post("destroy", app).then(function() {
      var index = $scope.apps.indexOf(app);
      if (index !== -1) {
        $scope.apps.splice(index, 1);
      }
    });
  };

  $scope.startApp = function(app) {
    app.loadingState = "starting …";
    post("start", app).then(function() {
      app.state = "started";
    });
  };

  $scope.stopApp = function(app) {
    app.loadingState = "stopping …";
    post("stop", app).then(function() {
      app.state = "stopped";
    });
  };

  $scope.getTechIcon = function(app) {
    var appType = app.app_type.toLowerCase();
    var hasIcon = ["node.js", "python", "ruby", "go", "java", "php", "rails", "docker"].indexOf(appType) !== -1;
    if (hasIcon) {
      var normalizedName = appType.replace(/[^a-z0-9]/g, "");
      return "images/technology-logos/" + normalizedName + ".png";
    } else {
      return "images/hexagon.svg";
    }
  };

  $scope.openApp = function(app) {
    var opener = window.open("javascript:'<html></html>'");
    API.chooseBestURL(app.urls).then(function(url) {
      opener.location.href = url;
    });
  };
});