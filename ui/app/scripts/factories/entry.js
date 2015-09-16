'use strict';

/**
 * @ngdoc factory
 * @name workoutApp.entry
 * @description
 * # entry
 * Service in the workoutApp.
 */
angular.module('workoutApp')
  .factory('Entry', function(api) {
    function Entry() {
      this.date = null;
      this.lift = null;
      this.sets = [{
        weight: null,
        reps: null
      }];
    }

    Entry.prototype.save = function() {
      return api.entries.save(this);
    };

    return Entry;
  });