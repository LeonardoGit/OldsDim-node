'use strict';

angular
	.module('core')
	.directive('autosize', autosize);

function autosize() {
	return {
		restrict: 'AC',
		link: function(scope, element, attrs, fn) {
			element.autosize({
	        	append: '\n'
	        });
		}
	};
}