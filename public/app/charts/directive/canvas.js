'use strict';

angular
	.module('charts')
	.directive('canvas', ['$window', canvas]);

function canvas($window) {
	return {
		restrict: 'EA',
		scope: {
			data: '=canvasChart',
			options: '=options',
			type: '=',
		},
		link: function(scope, element, attrs, fn) {
			if ($window.Chart) {
	        	(new $window.Chart(angular.element(element)[0].getContext('2d')))[scope.type](scope.data, scope.options);
	        }
		}
	};
}