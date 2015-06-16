angular.module("protonet.platform").controller("LayoutCtrl", function($scope, $state, API) {

  $scope.$on("$stateChangeSuccess", function() {
    $scope.state = $state.current.name;
  });

  function setPTW(data) {
    $scope.nodename = data.nodename;
    $scope.ptwEnabled = data.enabled;
  }

  function updatePTW() {
    API.get("/admin/api/ptw").then(setPTW);
  }

  updatePTW();

  $scope.$on("ptw.change", updatePTW);
});