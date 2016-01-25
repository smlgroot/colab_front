'use strict';


angular.module('collab')


// Angular File Upload module does not include this directive
// Only for example


/**
 * The ng-thumb directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
.directive('ngCal', ['$window', function($window) {

  var template = "<div class='input-group date' id='datetimepicker1'>";
  template += "<input class='form-control input-lg' type='text'/>";
  template += "<span class='input-group-addon'>";
  template += "<span class='glyphicon glyphicon-calendar'></span>";
  template += "</span>";
  template += "</div>";

  return {
    restrict: 'A',
    //template: template,
    link: function(scope, element, attributes) {
      $(element).datetimepicker();
    }
  };
}]);
