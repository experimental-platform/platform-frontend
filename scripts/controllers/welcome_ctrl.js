angular.module("protonet.platform").controller("WelcomeCtrl", function($scope, API, $location) {
  $scope.setPassword = function() {
    if (!$scope.password) {
      return;
    }

    if ($scope.password !== $scope.passwordConfirmation) {
      alert("The passwords you entered are not the same.");
      return;
    }

    $scope.loading = true;
    API.post("/protonet/api/password/initial", {
      password: $scope.password
    }).then(function() {
      return API.post("/protonet/api/login", {
        password: $scope.password
      });
    }).then(function() {
      $location.path("/welcome-3");
    }).catch(function() {
      alert("An error occured while setting the password. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };
  
  
  $scope.setPublicKey = function() {
    if (!$scope.publicKey) {
      return;
    }

    $scope.loading = true;
    API.post("/protonet/api/ssh/add", {
      key: $scope.publicKey
    }).then(function() {
      $location.path("/welcome-4");
    }).catch(function() {
      alert("An error occured while setting the public key. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.setPublishToWeb = function() {
    if (!$scope.nodename) {
      return;
    }

    if (!$scope.nodename.match(/^[a-z0-9\-]+$/i)) {
      alert("The address cannot contain special characters or white spaces.");
      return;
    }

    $scope.loading = true;
    API.post("/protonet/api/ptw/nodename", {
      nodename: $scope.nodename
    }).then(function() {
      $location.path("/dashboard");
    }).catch(function() {
      alert("An error occured while setting the internet address. Please try again.");
    }).finally(function() {
      $scope.loading = false;
    });
  };
});