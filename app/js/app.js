'use strict'

/* App Module */

var oneSixtyEightApp = angular.module('oneSixtyEightApp', [
  'ngRoute',
  'oneSixtyEightControllers',
  'oneSixtyEightFilters'
])

oneSixtyEightApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/activities', {
        templateUrl: 'partials/activity-list.html',
        controller: 'ScheduleListCtrl'
      }).
      when('/activities/:activityID', {
        templateUrl: 'partials/activity-detail.html',
        controller: 'ActivityDetailCtrl'
      }).
      otherwise({
        redirectTo: '/activities'
      })
  }])
