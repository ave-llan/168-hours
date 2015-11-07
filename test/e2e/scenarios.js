'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('168 Hours App', function () {

  describe('Activity list view', function () {

    beforeEach(function() {
      browser.get('app/index.html')
    });

    var activityList = element.all(by.repeater('activity in activities'))
    var query = element(by.model('query'))

    it('should filter the activty list as a user types into the search box', function () {

      expect(activityList.count()).toBe(16)

      query.sendKeys('rudy');
      expect(activityList.count()).toBe(3)

      query.clear();
      query.sendKeys('bird');
      expect(activityList.count()).toBe(1)
    })

    it('should be possible to control activity order via the order buttons', function () {
      query.clear()
      query.sendKeys('leisure') // narrow data set

      // var activityNameColumn = element.all(by.repeater('activity in activities').column('activity.name'))

      expect(activityList.count()).toBe(3)
      function getNames () {
        return element.all(by.css('#name-input')).map(function (elm) {
          return elm.getAttribute('value') // get current value of select field
        })
      }

      expect(getNames()).toEqual([
        'read novel',
        'birdwatching',
        'watch a movie'
        ])
       /*
      element(by.model('orderProp')).element(by.css('option[value="name"]')).click()

      expect(getNames()).toEqual([
        'birdwatching',
        'read novel',
        'watch a movie'
        ])
      */
    })

  })
})
