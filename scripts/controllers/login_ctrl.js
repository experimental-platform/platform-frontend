angular.module("protonet.platform").controller("LoginCtrl", function($scope, API, $location, Notification) {
  $scope.login = function() {
    if (!$scope.password || $scope.loading) {
      return;
    }

    $scope.loading = true;
    API.post("/admin/api/login", {
      password: $scope.password
    }).then(function() {
      $location.path("/dashboard");
    }).catch(function() {
      Notification.error("The password is not correct.");
    }).finally(function() {
      $scope.loading = false;
    });
  };
});