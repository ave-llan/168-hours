'use strict';

/* jasmine specs for controllers go here */
describe('oneSixtyEightApp controllers', function() {

  describe('ScheduleListCtrl', function(){
    var scope, ctrl

    beforeEach(module('oneSixtyEightApp'))

    beforeEach(inject(function($controller) {
      scope = {}
      ctrl = $controller('ScheduleListCtrl', {$scope:scope})
    }))

    it('should create "activities" model with 16 activities', function() {
      expect(scope.activities.length).toBe(16)
    })

    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('-hoursPerWeek')
    })

  })
})
