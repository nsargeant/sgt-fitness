'use strict';

/**
 * @ngdoc function
 * @name workoutApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, $location) {
    $scope.activeTab = $location.path();
    $rootScope.$on('$locationChangeStart', function () {
      $scope.activeTab = $location.path();
      // $log.debug('Setting activeTab to:', $scope.activeTab);
    });
    $scope.isActive = function (page) {
      return $scope.activeTab.indexOf(page) > -1;
    };

  });
