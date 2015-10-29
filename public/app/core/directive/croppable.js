'use strict';

angular
	.module('core')
	.directive('croppable', ['$timeout', croppable]);

function croppable($timeout) {
	return {
		restrict: 'A',
		replace: true,
		scope: {
			src: '@',
			imgSelected: '&',
			cropInit: '&'
		},
		link: function(scope, element, attrs, fn) {
			var myImg;
	        $timeout(function() {
	          if (scope.src) {
	            myImg = element;
	            element.width(element.width()); // stupid width bug
	            angular.element(myImg).Jcrop({
	              trackDocument: true,
	              onSelect: function(x) {
	                $t(function() {
	                  scope.imgSelected({
	                    coords: x
	                  });
	                });
	              },
	              // aspectRatio: 1
	            }, function() {
	              // Use the API to get the real image size 
	              scope.bounds = this.getBounds();
	            });
	          }
	        });
	        scope.$watch('bounds', function() {
	          scope.cropInit({
	            bounds: scope.bounds
	          });
	        });
		}
	};
}