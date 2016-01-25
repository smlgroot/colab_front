angular.module('controllers').controller(
  'SearchCtrl',
  function($scope, Person, Project, $location, $state, $http, socketio) {
    console.log("search!!!");
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
      $scope.projects = Project.find();
      /*$scope.projects = Person.projects({
        id: Person.getCurrentId()
      });*/
      //console.log($scope.projects.$promise);
      $scope.projects.$promise.then(function(projects) {
        /*projects.forEach(function(p) {
          p.messages = $scope.tempMessages;
          console.log(p, 1);
        });*/
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
      Person.greet({
        msg: project.msg,
        room: project.id
      });
      project.msg = '';
    };
    //
    //
    $scope.sendCoord = function(room, coord) {
      Person.sendCoord({
        coord: coord,
        room: room
      });
    };
    //
    $scope.logout = function() {
      $scope.loginResult = Person.logout($scope.credentials, function(a, b, c, d) {
        // success
        console.log("success", a);
      }, function(res) {
        // error
        console.error(res);
      });
    };
    //
    $scope.isMousedown = false;
    $scope.canvas = undefined;
    $scope.ctx = undefined;
    $scope.canvasMousedown = function(event) {
      console.log('event:', event.layerX, event.layerY);
      $scope.isMousedown = true;
      $scope.canvas = event.target;
      //
      $scope.canvas.width = $scope.canvas.offsetWidth;
      $scope.canvas.height = $scope.canvas.offsetHeight;
      $scope.canvas.style.width = $scope.canvas.width + 'px';
      $scope.canvas.style.height = $scope.canvas.height + 'px';
      //
      $scope.ctx = $scope.canvas.getContext("2d");
      $scope.ctx.moveTo(event.layerX, event.layerY);
    };
    //
    $scope.canvasMouseup = function(event) {
      console.log('event:', event.layerX, event.layerY);
      $scope.isMousedown = false;
    };
    //
    $scope.canvasMousemove = function(room, event) {
      //console.log('event:', event.layerX, event.layerY);
      console.log('event:', event);
      if ($scope.isMousedown) {
        $scope.ctx.lineTo(event.offsetX, event.offsetY);
        $scope.ctx.stroke();
        //
        $scope.sendCoord(room, {
          x: event.offsetX,
          y: event.offsetY
        });
      }
    };
    //
    $scope.loadChats = function() {
      $scope.projects.$promise.then(function(projects) {
        projects.forEach(function(p) {
          socketio.emit('subscribe', p.id, function(dataAck) {
            //
            console.log(dataAck);
            Person.getLastRoomMsgs({
              room: p.id,
              limit: 3
            }, function(data, cb) {
              console.log(data.msgs.msgs);
              if (data.msgs && data.msgs.msgs) {
                if (!p.messages) {
                  p.messages = [];
                }
                for (var i = 0; i < data.msgs.msgs.length; i++) {
                  var json = angular.fromJson(data.msgs.msgs[i]);
                  console.log(json);
                  p.messages.unshift({
                    user: {
                      id: 1,
                      name: json.username,
                      color: '#000000'
                    },
                    msg: json.msg
                  });
                }
                //p.messages.reverse();
              }
            });
            //
          });
        });
      });
      //
      socketio.on('message', function(data, args) {
        console.log(data, args);
        console.log($scope.projects);
        $scope.projects.forEach(function(p) {
          console.log(p.id, data.room);
          if (p.id == data.room) {
            if (!p.messages) {
              p.messages = [];
            }
            p.messages.push({
              user: {
                id: 1,
                name: data.username,
                color: 'red'
              },
              msg: data.msg
            });
          }
        });
        //
      });
      //
      socketio.on('coord', function(data, args) {
        console.log(data, args);
        //
        var canvas = document.getElementById('canvas' + data.room);
        console.log('#canvas' + data.room, canvas);
        var canvas = document.getElementById('canvas' + data.room);
        var ctx = canvas.getContext("2d");
        ctx.lineTo(data.coord.x, data.coord.y);
        ctx.stroke();
        //
      });
      //
    };
    $scope.init = function() {
      console.log('$scope.user:', $scope.user, Person.isAuthenticated(), Person.getCurrentId());
      $scope.load();
      console.log($state.current.name);
      //
      $scope.genFakeData();
      //
      $scope.loadChats();
    };
    //
    $scope.init();
  });
