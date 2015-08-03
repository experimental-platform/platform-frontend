angular.module("protonet.platform").controller("SetupAppCtrl", function($scope, $stateParams, AppTutorial) {
  $scope.appType = $stateParams.type;

  $scope.docs = AppTutorial.get($scope.appType).setup;

  var host = location.hostname;
  if (host.indexOf(".protonet.info") !== -1) {
    host = $scope.nodename + ".local";
  }

  $scope.interpolate = function(str) {
    return str.replace("{{host}}", host);
  };
});