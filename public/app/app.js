angular.module('services', []);
angular.module('controllers', ['services']);
angular.module('collab', ['controllers', 'ui.router', 'lbServices', 'angularFileUpload']);
//
angular.module('collab').run(function($rootScope, $state) {
  $rootScope.$state = $state;
});
angular.module('collab').config(
  function(LoopBackResourceProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');

    // Change the URL where to access the LoopBack REST API server
    //LoopBackResourceProvider.setUrlBase('http://localhost:3001/api');
    LoopBackResourceProvider.setUrlBase('http://192.168.1.64:3001/api');
    //LoopBackResourceProvider.setUrlBase('http://1eaedffa.ngrok.io/api');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //
    $urlRouterProvider.otherwise("/logins");
    //
    // Now set up the states
    $stateProvider.state('login', {
      url: "/login",
      templateUrl: "app/views/login.html",
      controller: 'LoginCtrl'
    }).state('search', {
      url: "/search",
      abstract: true,
      templateUrl: "app/views/search.html",
      controller: 'SearchCtrl'
    }).state('search.users', {
      url: "/users",
      views: {
        'right': {
          templateUrl: 'app/views/search/users.html',
          controller: 'SearchUsersCtrl'
        }
      }
    }).state('search.projects', {
      url: "/projects",
      views: {
        'right': {
          templateUrl: 'app/views/search/projects.html'
        }
      }
    }).state('choose', {
      url: "/choose",
      abstract: true,
      templateUrl: "app/views/choose.html",
      controller: 'ChooseCtrl'
    }).state('choose.main', {
      url: "/main",
      views: {
        '': {
          templateUrl: "app/views/choose/main.html"
        },
        'right': {
          template: '<div class="row">main right</div>'
        }
      }
    }).state('choose.newproject', {
      url: "/newproject",
      views: {
        '': {
          templateUrl: "app/views/choose/newProject.html"
        },
        'right': {
          templateUrl: "app/views/choose/newProjectRight.html"
        }
      }
    }).state('choose.newproject.comp', {
      url: "/comp",
      views: {
        '@choose': {
          templateUrl: "app/views/choose/newProjectComp.html"
        }
      }
    }).state('choose.newitem', {
      url: "/newitem",
      views: {
        '': {
          templateUrl: "app/views/choose/newItem.html"
        },
        'right': {
          templateUrl: "app/views/choose/newItemRight.html"
        }
      }
    }).state('choose.newitem.one', {
      url: "/newitemone",
      views: {
        '@choose': {
          templateUrl: "app/views/choose/newItem1.html"
        }
      }
    }).state('profile', {
      url: "/profile",
      templateUrl: "app/views/profile.html",
      controller: 'ProfileCtrl'
    }).state('projects', {
      url: "/projects",
      templateUrl: "app/views/projects.html",
      controller: 'ProjectsCtrl'
    }).state('projects.new', {
      url: "/projects_new",
      templateUrl: "app/views/projects/new.html",
    });
    //
    /*$mdThemingProvider.theme('default')
      .primaryPalette('pink', {
        //'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      }).accentPalette('orange');*/
  });
//
