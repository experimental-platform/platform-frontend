angular.module("protonet.platform").controller("WelcomeCtrl", function($scope, API, $location, Notification) {
  $scope.setPassword = function() {
    if (!$scope.password) {
      return;
    }

    if ($scope.password !== $scope.passwordConfirmation) {
      Notification.error("The passwords you entered are not the same.");
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/password/initial", {
      password: $scope.password
    }).then(function() {
      return API.post("/admin/api/login", {
        password: $scope.password
      });
    }).then(function() {
      $location.path("/welcome-3");
    }).catch(function() {
      Notification.error("An error occured while setting the password. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };
  
  
  $scope.setPublicKey = function() {
    if (!$scope.publicKey) {
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/ssh/add", {
      key: $.trim($scope.publicKey)
    }).then(function() {
      $location.path("/welcome-4");
    }).catch(function() {
      Notification.error("An error occured while setting the public key. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.setPublishToWeb = function() {
    if (!$scope.nodename) {
      return;
    }

    if (!$scope.nodename.match(/^[a-z0-9\-]+$/i)) {
      Notification.error("The address cannot contain special characters or white spaces.");
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/ptw/nodename", {
      nodename: $scope.nodename
    }).then(function() {
      return API.post("/admin/api/ptw/enabled", {
        enabled: true
      });
    }).then(function() {
      window.location = "http://" + $scope.nodename + ".local/dashboard";
    }).catch(function() {
      Notification.error("An error occured while setting the internet address. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };
});
