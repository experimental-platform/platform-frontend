angular.module("protonet.platform").controller("DeployAppCtrl", function($scope, $stateParams, AppTutorial, App) {
  $scope.appType = $stateParams.type;

  $scope.docs = AppTutorial.get($scope.appType).deploy;

  function onAdd(event, app) {
    // Ignore this until the initial set has been loaded
    if (!App.loaded) {
      return;
    }
    App.off("add", onAdd);
    $scope.newApp = app;
  }

  App.on("add", onAdd);

  $scope.$on("$destroy", function() {
    App.off("add", onAdd);
  });
});