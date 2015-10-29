'use strict';

angular
	.module('core')
	.directive('wizard', wizard);

function wizard() {
	return {
		restrict: 'A',
		scope: {
			options: '=wizard'
		},
		link: function(scope, element, attrs, fn) {
			if (scope.options) {
	          element.stepy(scope.options);

	          //Make Validation Compability - see docs
	          if (scope.options.validate === true) {
	            element.validate({
	              errorClass: 'help-block',
	              validClass: 'help-block',
	              highlight: function(element) {
	                angular.element(element).closest('.form-group').addClass('has-error');
	              },
	              unhighlight: function(element) {
	                angular.element(element).closest('.form-group').removeClass('has-error');
	              }
	            });
	          }
	        } else {
	          element.stepy();
	        }
	        //Add Wizard Compability - see docs
	        element.find('.stepy-navigator').wrapInner('<div class="pull-right"></div>');
		}
	};
}