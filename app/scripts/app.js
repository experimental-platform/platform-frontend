'use strict';

/**
 * @ngdoc overview
 * @name aalApp
 * @description
 * # aalApp
 *
 * Main module of the application.
 */
angular
  .module('aalApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .when('/styleguide', {
        templateUrl: 'views/styleguide.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
