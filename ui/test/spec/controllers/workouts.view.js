'use strict';

describe('Controller: WorkoutsViewCtrl', function () {

  // load the controller's module
  beforeEach(module('workoutApp'));

  var WorkoutsViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkoutsViewCtrl = $controller('WorkoutsViewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
