'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('oneSixtyEightFilters'))


  describe('truncateNumber', function() {

    it('hould truncate a decimal to the given number of places',
        inject(function(truncateNumberFilter) {
      expect(truncateNumberFilter(1.54321, 4)).toBe('1.5432')
      expect(truncateNumberFilter(1.54321, 3)).toBe('1.543')
      expect(truncateNumberFilter(1.54321, 2)).toBe('1.54')
      expect(truncateNumberFilter(1.0005, 2)).toBe('1')
      expect(truncateNumberFilter(1.05, 2)).toBe('1.05')
      expect(truncateNumberFilter(1.5, 2)).toBe('1.5')
      expect(truncateNumberFilter(1.5, 0)).toBe('2')
      expect(truncateNumberFilter(1.5)).toBe('2')
    }))
  })
})
