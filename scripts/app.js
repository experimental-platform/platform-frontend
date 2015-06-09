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
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        templateUrl: 'views/layout.html',
        controller: "LayoutCtrl",
        resolve: {
          ptw: function($state, API) {
            return API.get("/protonet/api/ptw").catch(function() {
              $state.go("login");
            });
          }
        }
      })
      .state('dashboard.index', {
        url: "/dashboard",
        templateUrl: 'views/dashboard.html',
        controller: "DashboardCtrl"
      })
      .state('dashboard.create_app_1', {
        url: "/create-app-1",
        templateUrl: 'views/create-app-1.html'
      })
      .state('dashboard.create_app_2', {
        url: "/create-app-2",
        templateUrl: 'views/create-app-2.html'
      })
      .state('dashboard.create_app_3', {
        url: "/create-app-3",
        templateUrl: 'views/create-app-3.html'
      })
      .state("dashboard.configuration", {
        url: "/configuration",
        templateUrl: 'views/configuration.html'
      })
      .state("login", {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: "LoginCtrl"
      })
      .state('welcome_1', {
        url: "/welcome-1",
        templateUrl: 'views/welcome-1.html',
        controller: "WelcomeCtrl"
      })
      .state('welcome_2', {
        url: "/welcome-2",
        templateUrl: 'views/welcome-2.html',
        controller: "WelcomeCtrl"
      })
      .state('welcome_3', {
        url: "/welcome-3",
        templateUrl: 'views/welcome-3.html',
        controller: "WelcomeCtrl"
      })
      .state('welcome_4', {
        url: "/welcome-4",
        templateUrl: 'views/welcome-4.html',
        controller: "WelcomeCtrl"
      });
      
    $urlRouterProvider.otherwise('/dashboard');
  });
