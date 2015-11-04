'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('168 Hours App', function() {

  describe('Activity list view', function() {

    beforeEach(function() {
      browser.get('app/index.html')
    });

    var activityList = element.all(by.repeater('activity in activities'))
    var query = element(by.model('query'))

    it('should filter the activty list as a user types into the search box', function() {

      expect(activityList.count()).toBe(16)

      query.sendKeys('rudy');
      expect(activityList.count()).toBe(3)

      query.clear();
      query.sendKeys('bird');
      expect(activityList.count()).toBe(1)
    })

  })
})
