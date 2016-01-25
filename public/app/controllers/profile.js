angular.module('controllers').controller(
  'ProfileCtrl',
  function($scope, Person, Project, $location, $state) {
    console.log("profile!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.user = undefined;
    $scope.project = {};
    $scope.projects = [];
    //
    $scope.credentials = {
      "email": "me@domain.com",
      "password": "secret"
    };
    /*******
		FUNCTIONS
     ****/
    $scope.create = function() {
      //$scope.project.userId = Person.getCurrentId();
      var temp = Person.projects.create({
        id: Person.getCurrentId()
      }, $scope.project);
      $scope.projects.push(temp);
    };
    //
    $scope.load = function() {
      $scope.projects = Person.projects({
        id: Person.getCurrentId()
      });
      /*$scope.pen = Project.findOne({
        filter: {
          where: {
            userId: Person.getCurrentId()
          }
        }
      });*/
    };
    //
    $scope.logout = function() {
      $scope.loginResult = Person.logout($scope.credentials, function(a,
        b, c, d) {
        // success
        console.log("success", a);
      }, function(res) {
        // error
        console.error(res);
      });
    };
    $scope.init = function() {
      console.log('$scope.user:', $scope.user, Person.isAuthenticated(), Person.getCurrentId());
      $scope.user = Person.findById({
        id: Person.getCurrentId()
      });
      console.log('$scope.user:', $scope.user, Person.isAuthenticated(), Person.getCurrentId());

    };
    //
    $scope.init();
  });
