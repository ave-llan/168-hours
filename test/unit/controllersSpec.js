'use strict';

/* jasmine specs for controllers go here */
describe('oneSixtyEightApp controllers', function() {

  describe('ScheduleListCtrl', function(){

    beforeEach(module('oneSixtyEightApp'))

    it('should create "activities" model with 16 activities', inject(function($controller) {
      var scope = {},
          ctrl = $controller('ScheduleListCtrl', {$scope:scope})

      expect(scope.activities.length).toBe(16)
    }))

  })
})
