angular.module("protonet.platform").controller("LayoutCtrl", function($scope, $state, API) {
  App.startFetcher();
  $scope.apps = App.records;

  $scope.$on("$destroy", function() {
    App.stopFetcher();
  });

  $scope.$on("$stateChangeSuccess", function() {
    $scope.state = $state.current.name;
  });

  $scope.isDashboard = function() {
    return $scope.state === "dashboard.index" || $scope.state.match(/create_app/);
  };

  function setPTW(data) {
    $scope.nodename = data.nodename;
    $scope.ptwEnabled = data.enabled;
  }

  function updatePTW() {
    API.get("/admin/api/ptw").then(setPTW);
  }

  updatePTW();

  $scope.logout = function() {
    API.post("/admin/api/logout").then(function() {
      $state.go("login");
    });
  };

  $scope.$on("ptw.change", updatePTW);
});