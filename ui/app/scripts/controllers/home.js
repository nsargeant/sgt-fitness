'use strict';

/**
 * @ngdoc function
 * @name workoutApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .controller('HomeCtrl', function ($scope, $log) {
    $scope.weightEntry = null;
    $scope.weightUnitTypes = [{
      type: 'lbs',
      label: 'Pounds'
    }, {
      type: 'kg',
      label: 'Kilograms'
    }];
    $scope.weightType = $scope.weightUnitTypes[0].type;
    $scope.setUnitType = function (type) {
      $scope.weightType = type;
    };
    $scope.addWeightEntry = function () {
      if ($scope.weightEntry) {
        $log.info('saving:', $scope.weightEntry, $scope.weightType, $scope.dt);
      }
    };

    //Datepicker
    $scope.dt = new Date();
    var month = $scope.dt.getMonth() + 1;
    if (month.toString().length < 2) {
      month = '0' + month;
    }
    $scope.maxDate = $scope.dt.getFullYear() + '-' + month + '-' + ($scope.dt.getDate() + 1);
    $scope.format = 'shortDate';
    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
  });
