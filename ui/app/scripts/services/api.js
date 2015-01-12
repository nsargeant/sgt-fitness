'use strict';

/**
 * @ngdoc service
 * @name workoutApp.api
 * @description
 * # api
 * Service in the workoutApp.
 */
angular.module('workoutApp')
  .service('api', ['$http',
    function api($http) {

      var base = 'http://localhost:5000';

      function getQueryParams(params) {
        var query = '';
        for (var i in params) {
          query += i + '=' + params[i] + '&';
        }
        if (query.length > 0) {
          query = '?' + query.slice(0, -1);
        }
        return query;
      }

      this.lifts = {
        one: function (id) {
          return $http.get(base + '/lifts/' + id);
        },
        all: function (params) {
          var query = getQueryParams(params);
          return $http.get(base + '/lifts' + query);
        }
      };

      this.categories = {
        one: function (id) {
          return $http.get(base + '/categories/' + id);
        },
        all: function (params) {
          var query = getQueryParams(params);
          return $http.get(base + '/categories' + query);
        }
      };
    }
  ]);
