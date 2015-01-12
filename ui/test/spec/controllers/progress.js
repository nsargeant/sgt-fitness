'use strict';

describe('Controller: ProgressCtrl', function () {

  // load the controller's module
  beforeEach(module('workoutApp'));

  var ProgressCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgressCtrl = $controller('ProgressCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
