'use strict';

/**
 * @ngdoc overview
 * @name workoutApp
 * @description
 * # workoutApp
 *
 * Main module of the application.
 */
angular
  .module('workoutApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/workouts', {
        templateUrl: 'views/workouts.html',
        controller: 'WorkoutsCtrl'
      })
      .when('/workouts/:cat', {
        templateUrl: 'views/workouts.cat.html',
        controller: 'WorkoutsCategoryCtrl'
      })
      .when('/workouts/:cat/:lift', {
        templateUrl: 'views/workouts.lift.html',
        controller: 'WorkoutsLiftCtrl'
      })
      .when('/progress', {
        templateUrl: 'views/progress.html',
        controller: 'ProgressCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
