'use strict';

angular
	.module('charts')
	.directive('morris', morris); 

function morris() {
	return {
		restrict: 'EA',
		scope: {
			options: '=svgChart',
			type: '=',
		},
		link: function(scope, element, attrs, fn) {
			if ($window.Morris) {
				var elementId;
				if (!angular.element(element).attrs('id')) {
					elementId = angular.element(element).attrs('id', scope.type + attrs.svgChart);
				} else {
					elementId = angular.element(element).attrs('id');
				}
				$window.Morris[scope.type](angular.extend(scope.options, {
					element: elementId
				}));
			}
		}
	};
}