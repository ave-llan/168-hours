module.exports = function($scope) {
  $scope.activities = [
  {'name': 'sleep',
   'minutes': 420,
   'daysPerWeek': 7,
   'category': 'sleep'},
  {'name': 'eat breakfast',
   'minutes': 45,
   'daysPerWeek': 7,
   'category': 'food'},
  {'name': 'Rudy AM walk',
   'minutes': 30,
   'daysPerWeek': 7,
   'category': 'pet'},
  {'name': 'eat lunch',
   'minutes': 30,
   'daysPerWeek': 7,
   'category': 'food'},
  {'name': 'Rudy lunch walk',
   'minutes': 60,
   'daysPerWeek': 7,
   'category': 'pet'},
  {'name': 'cook/eat dinner',
   'minutes': 75,
   'daysPerWeek': 7,
   'category': 'food'},
  {'name': 'Rudy PM walk',
   'minutes': 30,
   'daysPerWeek': 7,
   'category': 'pet'},
  {'name': 'exercise',
   'minutes': 45,
   'daysPerWeek': 5,
   'category': 'health'},
  {'name': 'study math',
   'minutes': 60,
   'daysPerWeek': 4,
   'category': 'study'},
  {'name': 'read novel',
   'minutes': 45,
   'daysPerWeek': 7,
   'category': 'leisure'},
  {'name': 'birdwatching',
   'minutes': 150,
   'daysPerWeek': 1,
   'category': 'leisure'},
  {'name': 'grocery shopping',
   'minutes': 90,
   'daysPerWeek': 1,
   'category': 'chores'},
  {'name': 'vacuum',
   'minutes': 45,
   'daysPerWeek': 1,
   'category': 'chores'},
  {'name': 'watch a movie',
   'minutes': 120,
   'daysPerWeek': 1,
   'category': 'leisure'},
  {'name': 'go on a hike',
   'minutes': 180,
   'daysPerWeek': 1,
   'category': 'health'},
  {'name': 'work',
   'minutes': 600,
   'daysPerWeek': 5,
   'category': 'work'}
  ].sort(function (a, b) {
    return b.minutes * b.daysPerWeek - a.minutes * a.daysPerWeek
  })


  $scope.timeRemaining = calculateTimeRemaining()

  function calculateTimeRemaining () {
    var timeUsed = $scope.activities.map(function (activity) {
      return activity.minutes * activity.daysPerWeek
    }).reduce(function (sum, time) {
      return sum + time
    })
    return 60 * 168 - timeUsed // in minutes
  }

}