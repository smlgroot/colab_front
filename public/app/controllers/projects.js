angular.module('controllers').controller(
  'ProjectsCtrl',
  function($scope, Person, Project, $location, $state, $http) {
    console.log("projects!!!");
    /*******
		FIELDS
     ****/
    //
    $scope.user = undefined;
    $scope.users = [];
    $scope.project = {};
    $scope.projects = [];
    $scope.globalMsg = '';
    $scope.temps = ['ropa', 'comida', 'pantalones', 'zapatos', 'cobertores', 'agua', 'graba', 'arboles', 'plantas'];
    $scope.tempMessages = [{
      user: {
        id: 1,
        name: 'Paulina',
        color: 'red'
      },
      msg: 'quiero ayudar'
    }, {
      user: {
        id: 2,
        name: 'Sergio',
        color: 'purple'
      },
      msg: 'si , vamos a ayudar'
    }, {
      user: {
        id: 3,
        name: 'Aurora',
        color: 'rgb(17, 172, 56)'
      },
      msg: 'donde es el proyecto?'
    }];
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
      //console.log($scope.projects.$promise);
      $scope.projects.$promise.then(function(projects) {
        projects.forEach(function(p) {
          p.messages = $scope.tempMessages;
          console.log(p, 1);
        });
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
    $scope.showInputmsg = function(project) {
      project.showinputmsg = true;
    };
    //
    $scope.sendmsg = function(project) {
      //project.showinputmsg = false;
      project.messages.push({
        user: {
          id: 1,
          name: 'Paulina',
          color: 'red'
        },
        msg: project.msg
      });
      project.msg='';
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
