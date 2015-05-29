'use strict';

/**
 * @ngdoc function
 * @name aalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aalApp
 */
angular.module('aalApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
