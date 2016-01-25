angular.module('controllers').controller(
  'SearchUsersCtrl',
  function($scope, Person, Item, Project, $location, $state, $http) {
    console.log("search users!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.items = [];
    /*******
		FUNCTIONS
     ****/
    $scope.init = function() {
      $scope.loadItems();
      $scope.loadProjects();
    };
    //
    $scope.loadItems = function() {
      $scope.items = Item.find({}, function() {});
      console.log($scope.items);
    };
    //
    $scope.loadProjects = function() {
      $scope.projects = Person.projects({
        id: Person.getCurrentId()
      });
      console.log($scope.projects);
    };
    //
    $scope.init();
  });
