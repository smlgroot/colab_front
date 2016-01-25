angular.module('controllers').controller(
  'LoginCtrl',
  function($scope, Person, $location, $state) {
    console.log("login!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.user = undefined;
    //
    $scope.credentials = {
      "email": "me@domain.com",
      "password": "secret",
      "firstname": "mario",
      "lastname": "lopez"
    };
    /*******
		FUNCTIONS
     ****/
    $scope.init = function() {
      console.log('$scope.user:', $scope.user, Person.isAuthenticated(), 'x');
    };
    //
    $scope.login = function() {
        $scope.loginResult = Person.login($scope.credentials, function(a,
          b, c, d) {
          // success
          console.log("success", a);
          $state.go('profile');
        }, function(res) {
          // error
          console.error(res);
        });
      }
      //
    $scope.init();
  });
