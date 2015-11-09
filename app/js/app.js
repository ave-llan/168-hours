'use strict';

/* App Module */

var oneSixtyEightApp = angular.module('oneSixtyEightApp', [
  'ngRoute',
  'oneSixtyEightControllers'
])

oneSixtyEightApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/activities', {
        templateUrl: 'partials/activity-list.html',
        controller: 'ScheduleListCtrl'
      }).
      otherwise({
        redirectTo: '/activities'
      })
  }])
