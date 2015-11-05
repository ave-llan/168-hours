'use strict';

/* Controllers */

var oneSixtyEightApp = angular.module('oneSixtyEightApp', [])

oneSixtyEightApp.controller('ScheduleListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('activities/activities.json').success(function (data) {

      $scope.activities = data

      $scope.timeRemaining = calculateTimeRemaining()
    })

    $scope.orderProp = '-hoursPerWeek'

    function calculateTimeRemaining () {
      var timeUsed = $scope.activities.map(function (activity) {
        return (activity.hours * 60 + activity.minutes) * activity.daysPerWeek
      }).reduce(function (sum, time) {
        return sum + time
      })
      return 60 * 168 - timeUsed // in minutes
    }
}])
