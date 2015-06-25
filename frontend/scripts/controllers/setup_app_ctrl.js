angular.module("protonet.platform").controller("SetupAppCtrl", function($scope, $stateParams, AppTutorial) {
  $scope.appType = $stateParams.type;

  $scope.docs = AppTutorial.get($scope.appType).setup;
});