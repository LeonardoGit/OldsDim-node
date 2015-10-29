'use strict';

angular
	.module('core')
	.directive('colorpicker', colorpicker);

function colorpicker() {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
			element.colorpicker();
		}
	};
}