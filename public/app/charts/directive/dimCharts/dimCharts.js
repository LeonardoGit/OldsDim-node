angular
	.module('charts')
	.directive('dimCharts', dimCharts);

	function dimCharts() {
		var directive = {
			restrict: 'E',
			replace: true,
			scope: {
				chartConfig: '='
			},
			templateUrl: 'app/charts/directive/dimCharts/dimCharts.html',
			link: {
				pre: dimChartsLink
			},
			controller: dimChartsController
		};

		return directive;
	}

	dimChartsController.$inject = ['$scope', '$timeout'];

	function dimChartsController($scope, $timeout) {
	    $timeout(function() {
			$scope.$broadcast('highchartsng.reflow')
		}, 80);
	}

	function dimChartsLink(scope, element, attrs, fn) {

	}


