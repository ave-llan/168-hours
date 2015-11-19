/* global angular */
'use strict'

/* Filters */

angular.module('oneSixtyEightFilters', []).filter('truncateNumber', function() {
  return function(inputNumber, digits) {
    digits = digits || 0
    // truncates a number to the specified number of digits and trims zeros
    return inputNumber.toFixed(digits).replace(/\.?0+$/, '')
  }
})
