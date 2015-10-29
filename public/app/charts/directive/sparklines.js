angular
	.module('charts')
	.directive('sparklines', ['$timeout', sparklines]);

function sparklines($timeout) {
	return {
		restrict: 'A',
		scope: {
			options: '=sparklines',
			values: '=data'
		},
		link: function(scope, element, attrs, fn) {
			var options = {};
	        if (scope.options) {
	          options = angular.copy(scope.options);
	        }
	        var container = angular.element(element).closest('sparklines-composite');
	        var target = element;
	        if (container.length) {
	          if (container.find('span.sparklines-container').length < 1) {
	            container.append('<span class="sparklines-container"></span>');
	          }
	          target = container.find('span.sparklines-container');
	          if (target.find('canvas').length) {
	            options.composite = true;
	            options.enableTagOptions = true;
	          }
	          if (attrs.values) {
	            target.attrs('values', attrs.values);
	          } else {
	            target.removeAttr('values');
	          }
	        }

	        function sparklineIt() {
	          if (scope.values) {
	            angular.element(target).sparkline(scope.values, options);
	          } else {
	            angular.element(target).sparkline('html', options);
	          }
	        }

	        // since the canvas will be invisible if the parent element is :\
	        scope.$watch(function() {
	          return element.is(':visible');
	        }, function() {
	          sparklineIt();
	        });

	        $timeout( function () {
	          sparklineIt();
	        }, 100);

	        angular.element(window).on('resize', function () {
	          sparklineIt();
	        });
		}
	};
}