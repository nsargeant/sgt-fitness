'use strict';

/**
 * @ngdoc function
 * @name workoutApp.controller:WorkoutsCtrl
 * @description
 * # WorkoutsCtrl
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .controller('WorkoutsCtrl', function($scope, api) {
    // generate this list from the db

    $scope.categories = [];
    var queryParams = {
      expand: 'lifts'
    };
    api.categories.all(queryParams)
      .success(function(data) {
        $scope.categories = data;
      });
  })

.controller('WorkoutsCategoryCtrl', function($scope, $routeParams, $log) {
  $log.info($scope.cat);
})

.controller('WorkoutsLiftCtrl', function($scope, $routeParams, api) {
  $scope.cat = $routeParams.cat;
  $scope.lift = $routeParams.lift;
  $scope.active = false;
  $scope.data = null;

  $scope.show = function() {
    $scope.active = true;
  }
  $scope.hide = function() {
    $scope.active = false;
  }
  $scope.save = function(entry) {
    entry.lift = $scope.lift;
    entry.save()
      .success(function(res) {
        alert('saved!');
      });
  }
  var queryParams = {
      expand: 'entries'
    };
  api.lifts.one($routeParams.lift, queryParams)
    .success(function(data) {
      $scope.data = data;
    });
});