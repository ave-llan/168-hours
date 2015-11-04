'use strict';

/* Controllers */

var oneSixtyEightApp = angular.module('oneSixtyEightApp', [])

oneSixtyEightApp.controller('ScheduleListCtrl', function($scope, $http) {
  $http.get('activities/activities.json').success(function (data) {

    $scope.activities = data.map(function (activity) {
      activity.hoursPerWeek = activity.minutes / 60 * activity.daysPerWeek
      return activity
    })

    $scope.timeRemaining = calculateTimeRemaining()
  })

  $scope.orderProp = '-hoursPerWeek'

  function calculateTimeRemaining () {
    var timeUsed = $scope.activities.map(function (activity) {
      return activity.minutes * activity.daysPerWeek
    }).reduce(function (sum, time) {
      return sum + time
    })
    return 60 * 168 - timeUsed // in minutes
  }

})
