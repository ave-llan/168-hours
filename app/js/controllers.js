'use strict';

/* Controllers */

var oneSixtyEightControllers = angular.module('oneSixtyEightControllers', [])

oneSixtyEightControllers.controller('ScheduleListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('activities/activities.json').success(function (data) {

      $scope.activities = data.map(function (activity) {
        activity.hoursPerWeek = (activity.minutes / 60 + activity.hours) * activity.daysPerWeek
        return activity
      })

      $scope.sortBy('-hoursPerWeek') // sort by hours per week to start

      $scope.timeRemaining = calculateTimeRemaining()
    })

    function calculateTimeRemaining () {
      var timeUsed = $scope.activities.map(function (activity) {
        return (activity.hours * 60 + activity.minutes) * activity.daysPerWeek
      }).reduce(function (sum, time) {
        return sum + time
      })
      return 60 * 168 - timeUsed // in minutes
    }

    // returns and sets the hours per week for this activity
    $scope.hoursPerWeek = function (activityName) {
      var activity = $scope.activities.filter(function (activity) {
        return activity.name === activityName
      })[0] // take the first item (TODO add unique ID so there can be multipe items with same name)
      activity.hoursPerWeek = (activity.minutes/60 + activity.hours) * activity.daysPerWeek
      return activity.hoursPerWeek
    }

    $scope.updateHoursLeft = function () {
      $scope.timeRemaining = calculateTimeRemaining()
    }

    $scope.addActivity = function () {
      $scope.activities.push({name: '', hours: 0, minutes: 0, daysPerWeek: 1})
    }

    $scope.deleteActivity = function (activityName) {
      $scope.activities = $scope.activities.filter(function (activity) {
        return activity.name !== activityName
      }) // (TODO add unique ID so there can be multipe items with same name)
      $scope.updateHoursLeft()
    }

    $scope.sortBy = function (sortingField) {
      // check for reverse sort
      var reverse = false
      if (sortingField[0] === '-') {
        reverse = true
        sortingField = sortingField.slice(1)
      }
      $scope.activities.sort(function (a, b) {
        if (a[sortingField] < b[sortingField])
          return reverse ? 1 : -1
        if (a[sortingField] > b[sortingField])
          return reverse ? -1 : 1
        return 0
      })
    }
}])
