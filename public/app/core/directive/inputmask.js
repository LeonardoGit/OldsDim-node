'use strict';

angular
	.module('core')
	.directive('inputmask', inputmask);

function inputmask() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
			element.inputmask();
		}
	};
}