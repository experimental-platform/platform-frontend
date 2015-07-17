angular.module("protonet.platform").controller("InstallUpdateCtrl", function($scope, $state, $timeout, API, Notification) {
  function check() {
    $timeout(function() {
      API.get("/admin/api/system/update").then(function(data) {
        if (data.up_to_date) {
          Notification.notice("Update successfully installed");
          $state.go("dashboard.index");
        } else {
          check();
        }
      }).catch(check);
    }, 10000);
  }

  check();
});