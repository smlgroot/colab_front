angular.module('controllers').controller(
  'ChooseCtrl',
  function($scope, Person, Project, Item, $location, $state, $http, FileUploader) {
    console.log("choose!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.user = undefined;
    $scope.users = [];
    $scope.item = {};
    $scope.items = [];
    //
    $scope.projects = [];
    $scope.project = {};
    //
    $scope.minDate = new Date();
    //
    $scope.uploader = new FileUploader({
      url: 'http://localhost:3001/api/files/upload',
      filters: [{
        name: 'filterImages',
        fn: function(item) {
          return item.type == 'image/jpeg' || item.type == 'image/png';
        }
      }]
    });
    $scope.uploader.onWhenAddingFileFailed = function() {
      console.log('onWhenAddingFileFailed');
    };
    $scope.uploader.onAfterAddingFile = function(item) {
      console.log(item);
    };
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
          'words': '{lorem|20}',
          'address': '{streetAddress}',
          'company': '{business}',
          'callback': "JSON_CALLBACK"
        }
      }
      $http.jsonp("http://www.filltext.com", config, {}).success(function(data) {
        $scope.users = data
      });
    };
    //
    $scope.createItem = function() {
      //$scope.project.userId = Person.getCurrentId();
      var temp = Item.create($scope.item);
      $scope.items.push(temp);
      $state.go('.one');
    };
    //
    $scope.createProject = function() {
      //$scope.project.userId = Person.getCurrentId();
      $scope.project.duration = 0;
      $scope.project.durationType = 0;
      var temp = Person.projects.create({
        id: Person.getCurrentId()
      }, $scope.project);
      $scope.projects.push(temp);
      $state.go('.comp');
    };
    //
    $scope.loadProjects = function() {
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
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events = [{
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }];
    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var projectIni = new Date($scope.project.ini).setHours(0, 0, 0, 0);
          var projectFin = new Date($scope.project.fin).setHours(0, 0, 0, 0);

          if (dayToCheck > projectIni && dayToCheck < projectFin) {
            return 'full';
          }
        }
      }

      return '';
    };
    //
    $scope.load = function() {
      $scope.items = Item.find({}, function() {});
      console.log($scope.items);
      /*$scope.pen = Project.findOne({
        filter: {
          where: {
            userId: Person.getCurrentId()
          }
        }
      });*/
    };
    //
    $scope.init = function() {
      console.log('$scope.user:', $scope.user, Person.isAuthenticated(), Person.getCurrentId());
      $scope.load();
      $scope.loadProjects();
      console.log($state.current.name);
      //
      $scope.genFakeData();
    };
    //
    $scope.init();
  });
