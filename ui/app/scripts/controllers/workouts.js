'use strict';

/**
 * @ngdoc function
 * @name workoutApp.controller:WorkoutsCtrl
 * @description
 * # WorkoutsCtrl
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .controller('WorkoutsCtrl', function ($scope, $log, api) {
    // generate this list from the db

    $scope.categories = [];
    $scope.rows = [];

    api.categories.all()
      .success(function (data) {
        $scope.categories = data;
        //Divide for view have ui take care of this later
        var group = [];
        async.each($scope.categories, function (cat, cb) {
          api.lifts.all({
            category: cat._id
          })
            .success(function (lifts) {
              cat.lifts = lifts;
              group.push(cat);
              if (group.length > 3) {
                var c = group.pop();
                $scope.rows.push(group);
                group = [c];
              }
              cb();
            });

        }, function (err) {
          if (err) {
            throw err;
          }
          if (group.length > 0) {
            $scope.rows.push(group);
          }
        });
      });
  })
  .controller('WorkoutsCategoryCtrl', function ($scope, $routeParams, $log) {
    $log.info($scope.cat);
  })
  .controller('WorkoutsLiftCtrl', function ($scope, $routeParams, $log) {
    $scope.cat = $routeParams.cat;
    $scope.lift = $routeParams.lift;
    $log.info($scope.cat, $scope.lift);
  });
