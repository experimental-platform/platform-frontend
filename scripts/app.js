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
      .when('/welcome-1', {
        templateUrl: 'views/welcome-1.html'
      })
      .when('/welcome-2', {
        templateUrl: 'views/welcome-2.html'
      })
      .when('/welcome-3', {
        templateUrl: 'views/welcome-3.html'
      })
      .when('/welcome-4', {
        templateUrl: 'views/welcome-4.html'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html'
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
        redirectTo: '/'
      });
  });
