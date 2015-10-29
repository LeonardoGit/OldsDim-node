'use strict';

angular
	.module('core')
	.directive('fullscreen', fullscreen);

function fullscreen() {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
			element.fseditor({
	         	maxHeight: 500
	        });
		}
	};
}