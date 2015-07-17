angular.module("protonet.platform").controller("DeployAppCtrl", function($scope, $stateParams, $timeout, AppTutorial, API) {
  $scope.appType = $stateParams.type;

  $scope.docs = AppTutorial.get($scope.appType).deploy;

  var oldArr;

  function getNewApp(newArr, oldArr) {
    var newApps = _.filter(newArr, function(obj) {
      return !_.findWhere(oldArr, { name: obj.name });
    });
    return _.last(newApps);
  }
  
  function updateApps() {
    return API.get("/admin/api/apps").then(function(newArr) {
      if (oldArr) {
        var newApp = getNewApp(newArr, oldArr);
        if (newApp) {
          $scope.newApp = newApp;
          return;
        }
      }
      oldArr = newArr;
      $timeout(updateApps, 1000);
    });
  }
  
  updateApps();
});