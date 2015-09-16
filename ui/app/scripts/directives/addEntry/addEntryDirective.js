'use strict';

/**
 * @ngdoc function
 * @name workoutApp.directive:addEntry
 * @description
 * # addEntry
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .directive('addEntry', function() {
    return {
      restrict: 'AE',
      require: 'addEntry',
      scope: {
        onSave: '&'
      },
      templateUrl: 'scripts/directives/addEntry/addEntryTemplate.html',
      bindToController: true,
      controllerAs: 'ctrl',
      controller: function($scope, Entry) {
        var ctrl = this;

        this.active = false;
        this.entry = new Entry();

        this.clear = function() {
          ctrl.entry = new Entry();
        };

        this.save = function() {
          ctrl.onSave({
            entry: ctrl.entry
          });
        };
        this.addSet = function() {
          ctrl.entry.sets.push({
            weight: null,
            reps: null
          });
        };
        this.removeSet = function (index) {
          ctrl.entry.sets.splice(index, 1);
        }
      },
      link: function(scope, el, attr, ctrl) {
        scope.active = false;
        scope.show = function() {
          scope.active = true;
        };
        scope.hide = function() {
          ctrl.clear()
          scope.active = false;
        }
        scope.save = function() {
          ctrl.save();
          scope.hide();
        }
      }
    }
  });