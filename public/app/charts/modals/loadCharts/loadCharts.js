(function(){
'use strict';

angular
	.module('charts')
	.controller('LoadchartsCtrl', LoadchartsCtrl);

	LoadchartsCtrl.$inject = ['$scope', '$modalInstance', 'Charts'];

	/**
	 * @name LoadchartsCtrl
	 * @desc Displays loading modal for charts.
	 * @memberOf charts
	 */
	function LoadchartsCtrl($scope, $modalInstance, Charts) {
		$scope.message = null;
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.close = close;
		$scope.charts = [];

		init();

		function init() {
			getCharts();
		}
		
		/**
		 * @name getCharts
		 * @desc Call API to get charts.
		 * On success, show number of charts and return them on close.
		 * On failure, show server error message.
		 */
		function getCharts() {
			Charts
				.getCharts()
				.then(success, error);

			function success(charts) {
				$scope.charts = charts;
				$scope.message = 'You have ' + charts.length + ' charts.';
				$scope.loadSuccess = true;
				$scope.loading = false;
			}

			function error(response) {
				$scope.message = 'Server error '+ response.data.code + ': ' + response.data.message;
				$scope.loadError = true;
				$scope.loading = false;
			}
		}

		/**
		 * @name close
		 * @desc Close modal and return charts
		 * @returns {Array.Object} charts - Returns charts.
		 */
		function close() {
			$modalInstance.close($scope.charts);
		}
	}
})();