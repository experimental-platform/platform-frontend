'use strict';

/**
 * @ngdoc overview
 * @name protonet.platform
 * @description
 *
 * Main module of the application.
 */
angular
  .module('protonet.platform', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html'
      })
      .when('/styleguide', {
        templateUrl: 'views/styleguide.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/welcome-1', {
        templateUrl: 'views/welcome-1.html',
        controller: "WelcomeCtrl"
      })
      .when('/welcome-2', {
        templateUrl: 'views/welcome-2.html',
        controller: "WelcomeCtrl"
      })
      .when('/welcome-3', {
        templateUrl: 'views/welcome-3.html',
        controller: "WelcomeCtrl"
      })
      .when('/welcome-4', {
        templateUrl: 'views/welcome-4.html',
        controller: "WelcomeCtrl"
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html'
      })
      .when('/create-app-1', {
        templateUrl: 'views/create-app-1.html'
      })
      .when('/create-app-2', {
        templateUrl: 'views/create-app-2.html'
      })
      .when('/create-app-3', {
        templateUrl: 'views/create-app-3.html'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
  });
