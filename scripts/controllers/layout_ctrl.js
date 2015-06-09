angular.module("protonet.platform").controller("LayoutCtrl", function($scope, $state) {
  $scope.$on("$stateChangeSuccess", function() {
    $scope.state = $state.current.name;
  })
});