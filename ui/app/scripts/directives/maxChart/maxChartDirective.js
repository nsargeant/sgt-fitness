'use strict';

/**
 * @ngdoc function
 * @name workoutApp.directive:maxChart
 * @description
 * # maxChart
 * Controller of the workoutApp
 */
angular.module('workoutApp')
  .directive('maxChart', function() {
    var MIL_PER_DAY = 86400000;
    var MIL_PER_WEEK = 604800000;

    function getMaxReps(entries) {
      var maxReps = 0;
      entries.forEach(function(entry) {
        entry.sets.forEach(function(set) {
          if (set.reps > maxReps) {
            maxReps = set.reps;
          }
        });
      });
      return maxReps;
    };

    function getWeek(date) {
      var day = new Date(date);
      day.setHours(0);
      day.setMinutes(0);
      day.setSeconds(0);
      day.setMilliseconds(0);

      return day - (day.getDay() * MIL_PER_DAY);
    }

    // returns [ ]
    function getWeeks(entries) {
      var weeks = [];
      var start = null;
      if (entries.length) {
        start = getWeek(entries[0].date);
        weeks.push([entries[0].sets]);
      }
      for (var i = 1; i < entries.length; i++) {
        var weekNumber = (start - getWeek(entries[i].date)) / MIL_PER_WEEK;
        if (!weeks[weekNumber]) {
          weeks[weekNumber] = [];
        }
        weeks[weekNumber].push(entries[i].sets);
      }
      //fill in any empty weeks
      for (var i = weeks.length - 1; i >= 0; i--) {
        if (!weeks[i]) {
          weeks[i] = [];
        }
      }
      return weeks;
    }

    function determineReps(weeks, maxReps) {
      var chart = [];
      weeks.forEach(function(week) {
        var reps = [];
        for (var i = maxReps - 1; i >= 0; i--) {
          reps.push(null);
        }
        week.forEach(function(workout) {
          workout.forEach(function(set) {
            if (!reps[set.reps - 1] || set.weight > reps[set.reps - 1]) {
              reps[set.reps - 1] = set.weight;
            }
          });
        });

        // fill in blanks
        // for (var i = reps.length - 1; i >= 0; i--) {
        //   if (!reps[i] && reps[i + 1]) {
        //     reps[i] = reps[i + 1];
        //   }
        // }
        chart.push(reps.reverse());
      });
      return chart;
    }

    return {
      restrict: 'AE',
      require: ['ngModel', 'maxChart'],
      scope: {
        entries: '=ngModel'
      },
      templateUrl: 'scripts/directives/maxChart/maxChartTemplate.html',
      bindToController: true,
      controllerAs: 'ctrl',
      controller: function($scope) {
        var ctrl = this;
        this.maxReps = getMaxReps(this.entries);
        this.weeks = getWeeks(this.entries);
        this.chart = determineReps(this.weeks, this.maxReps);
      },
      link: function(scope, el, attrs, ctrls) {
        // body...
      }
    }
  });