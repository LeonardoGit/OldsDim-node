'use strict';

angular
	.module('core')
	.directive('daterangepicker', daterangepicker);

function daterangepicker() {
	return {
		restrict: 'A',
		scope: {
			options: '=daterangepicker',
			start: '=dateBegin',
			end: '=dateEnd'
		},
		link: function(scope, element, attrs, fn) {
			element.daterangepicker(scope.options, function(start, end) {
	          if (scope.start) {
	            scope.start = start.format('MMMM D, YYYY');
	          }
	          if (scope.end) {
	            scope.end = end.format('MMMM D, YYYY');
	          }
	          scope.$apply();
	        });
		}
	};
}