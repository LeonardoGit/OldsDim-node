'use strict';

angular
	.module('core')
	.directive('creditCard', ['$timeout', creditCard]);

function creditCard($timeout) {
	return {
		restrict: 'A',
		scope: {
			options: '=creditCard'
		},
		link: function(scope, element, attrs, fn) {
			$timeout( function () {
				angular.element(element[0]).card({
					container: scope.options.container
				});
			}, 1);
		}
	};
}