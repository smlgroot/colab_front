'use strict';


angular.module('collab')


// Angular File Upload module does not include this directive
// Only for example


/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
.directive('ngTags', ['$window', function($window) {


  return {
    restrict: 'A',
    //template: template,
    link: function(scope, element, attributes) {

      $(element).tagsinput({
        //tagClass: 'big'
      });

    }
  };
}]);
