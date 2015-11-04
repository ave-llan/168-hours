'use strict';

/* jasmine specs for controllers go here */
describe('oneSixtyEightApp controllers', function() {

  describe('ScheduleListCtrl', function(){
    var scope, ctrl, $httpBackend

    beforeEach(module('oneSixtyEightApp'))
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_
      $httpBackend.expectGET('activities/activities.json').
        respond([
          {
            "name": "sleep",
            "minutes": 420,
            "daysPerWeek": 7,
            "category": "sleep"
          },
          {
            "name": "eat breakfast",
            "minutes": 45,
            "daysPerWeek": 7,
            "category": "food"
          },
          {
            "name": "Rudy AM walk",
            "minutes": 30,
            "daysPerWeek": 7,
            "category": "pet"
          }
        ])

      scope = $rootScope.$new()
      ctrl = $controller('ScheduleListCtrl', { $scope:scope })
    }))

    it('should create "activities" model with 3 activities', function() {
      expect(scope.activities).toBeUndefined()
      $httpBackend.flush()

      expect(scope.activities.length).toBe(3)
      expect(scope.activities.map(function (activity) { return activity.category })).toEqual([
        'sleep', 'food', 'pet'])
    })

    it('should set the default value of orderProp model', function() {
      $httpBackend.flush()
      expect(scope.orderProp).toBe('-hoursPerWeek')
    })

  })
})
