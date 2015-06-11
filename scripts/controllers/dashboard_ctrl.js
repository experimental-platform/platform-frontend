angular.module("protonet.platform").controller("DashboardCtrl", function($scope, $timeout, $q, API, Notification) {
  function updateApps() {
    API.get("/admin/api/apps").then(function(arr) {
      $scope.apps = arr;
    });
  }

  updateApps();

  function post(action, app, timeout) {
    app.loading = true;
    var deferred = $q.defer();
    API.post("/admin/api/apps/" + action, { name: app.name }).then(function(data) {
      $timeout(function() {
        deferred.resolve(data);
      }, timeout);
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

    var oldState = app.state;
    app.state = "destroying …";
    post("destroy", app).then(function() {
      var index = $scope.apps.indexOf(app);
      if (index !== -1) {
        $scope.apps.splice(index, 1);
      }
    }).catch(function() {
      app.state = oldState;
    });
  };

  $scope.startApp = function(app) {
    var oldState = app.state;
    app.state = "starting …";
    post("start", app, 4000).then(function() {
      app.state = "started";
    }).catch(function() {
      app.state = oldState;
    });
  };

  $scope.stopApp = function(app) {
    var oldState = app.state;
    app.state = "stopping …";
    post("stop", app, 4000).then(function() {
      app.state = "stopped";
    }).catch(function() {
      app.state = oldState;
    });
  };

  $scope.openApp = function(app) {
    window.open(app.urls[0]);
  };
});