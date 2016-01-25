angular.module('controllers').controller(
  'NewItemCtrl',
  function($scope, Person, Project, $location, $state, $http) {
    console.log("choose!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.user = undefined;
    $scope.users = [];
    $scope.project = {};
    $scope.projects = [];
    $scope.temps = ['ropa', 'comida', 'pantalones', 'zapatos', 'cobertores', 'agua', 'graba', 'arboles', 'plantas'];
    //
    $scope.credentials = {
      "email": "me@domain.com",
      "password": "secret"
    };
    /*******
		FUNCTIONS
     ****/
    $scope.genFakeData = function() {
      var config = {
        params: {
          'rows': 10,
          'fname': '{firstName}',
          'lname': '{lastName}',
          'tel': '{phone|format}',
          'words':'{lorem|20}',
          'address':'{streetAddress}',
          'company':'{business}',
          'callback': "JSON_CALLBACK"
        }
      }
      $http.jsonp("http://www.filltext.com", config, {}).success(function(data) {
        $scope.users = data
      });
    };
    //
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
      $scope.load();
      console.log($state.current.name);
      //
      $scope.genFakeData();
    };
    //
    $scope.init();
  });
