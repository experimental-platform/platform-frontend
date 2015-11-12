angular.module("protonet.platform").controller("InstallUpdateCtrl", function($scope, $state, $timeout, API, Notification) {

  function toggleDetailedUpdateStatus() {
    $scope.showDetailedUpdateStatus = !$scope.showDetailedUpdateStatus;
  }
  $scope.toggleDetailedUpdateStatus = toggleDetailedUpdateStatus;

  function updateDetailedStatus(images) {
    $scope.status = {};
    for (var property in images) {
      if (images.hasOwnProperty(property)) {
        var image = images[property];
        var local = image.local.substr(0, 8);
        var remote = image.remote.substr(0, 8);
        $scope.status[property] = {
          local: local,
          remote: remote,
          upToDate: local === remote
        };
      }
    }
    $scope.statusAvailable = !$.isEmptyObject($scope.status);
  }

  function check() {
    $timeout(function() {
      API.get("/admin/api/system/update").then(function(data) {
        if (data.up_to_date) {
          Notification.success("Update successfully installed");
          $state.go("dashboard.index");
        } else {
          updateDetailedStatus(data.images);
          check();
        }
      }).catch(check);
    }, 10000);
  }

  check();
});