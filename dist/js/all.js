"use strict";var oneSixtyEightApp=angular.module("oneSixtyEightApp",["ngRoute","oneSixtyEightControllers","oneSixtyEightFilters"]);oneSixtyEightApp.config(["$routeProvider",function(t){t.when("/activities",{templateUrl:"partials/activity-list.html",controller:"ScheduleListCtrl"}).when("/activities/:activityID",{templateUrl:"partials/activity-detail.html",controller:"ActivityDetailCtrl"}).otherwise({redirectTo:"/activities"})}]);var oneSixtyEightControllers=angular.module("oneSixtyEightControllers",[]);oneSixtyEightControllers.controller("ScheduleListCtrl",["$scope","$http",function(t,e){function i(){var e=t.activities.map(function(t){return(60*t.hours+t.minutes)*t.daysPerWeek}).reduce(function(t,e){return t+e});return 10080-e}e.get("activities/activities.json").success(function(e){t.activities=e.map(function(e){return e.hoursPerWeek=(e.minutes/60+e.hours)*e.daysPerWeek,e.name=t.toTitleCase(e.name),e}),t.sortBy("-hoursPerWeek"),t.timeRemaining=i()}),t.hoursPerWeek=function(e){var i=t.activities.filter(function(t){return t.name===e})[0];return i.hoursPerWeek=(i.minutes/60+i.hours)*i.daysPerWeek,i.hoursPerWeek},t.updateHoursLeft=function(){t.timeRemaining=i()},t.addActivity=function(){t.activities.push({name:"",hours:0,minutes:0,daysPerWeek:1})},t.deleteActivity=function(e){t.activities=t.activities.filter(function(t){return t.name!==e}),t.updateHoursLeft()},t.sortBy=function(e){var i=!1;"-"===e[0]&&(i=!0,e=e.slice(1)),t.activities.sort(function(t,r){return t[e]<r[e]?i?1:-1:t[e]>r[e]?i?-1:1:0})},t.toTitleCase=function(t){return t.replace(/\w\S*/g,function(t){return t[0].toUpperCase()+t.slice(1).toLowerCase()})}}]),oneSixtyEightControllers.controller("ActivityDetailCtrl",["$scope","$routeParams",function(t,e){t.activityID=e.activityID}]),angular.module("oneSixtyEightFilters",[]).filter("truncateNumber",function(){return function(t,e){return e=e||0,t.toFixed(e).replace(/\.?0+$/,"")}});