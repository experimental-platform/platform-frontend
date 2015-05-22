'use strict';

/**
 * @ngdoc function
 * @name aalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the aalApp
 */
angular.module('aalApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
