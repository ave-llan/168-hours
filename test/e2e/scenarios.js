'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('168 Hours App', function() {

  describe('Activity list view', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });


    it('should filter the activty list as a user types into the search box', function() {

      var activityList = element.all(by.repeater('activity in activities'));
      var query = element(by.model('query'));

      expect(activityList.count()).toBe(16);

      query.sendKeys('rudy');
      expect(activityList.count()).toBe(3);

      query.clear();
      query.sendKeys('bird');
      expect(activityList.count()).toBe(1);
    });
  });
});
