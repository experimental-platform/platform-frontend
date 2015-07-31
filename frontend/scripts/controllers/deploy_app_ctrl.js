angular.module("protonet.platform").controller("DeployAppCtrl", function($scope, $stateParams, AppTutorial, App) {
  $scope.appType = $stateParams.type;

  $scope.docs = AppTutorial.get($scope.appType).deploy;

  function onAdd(event, app) {
    App.off("add", onAdd);
    $scope.newApp = app;
  }

  App.on("add", onAdd);

  $scope.$on("$destroy", function() {
    App.off("add", onAdd);
  });
});