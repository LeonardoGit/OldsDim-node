
(function(){
'use strict';

angular
	.module('dashboards')
	.controller('LoaddashboardsCtrl', LoaddashboardsCtrl);

	LoaddashboardsCtrl.$inject = ['$scope', '$modalInstance', 'Dashboards'];

	/**
	 * @name LoaddashboardsCtrl
	 * @desc Displays loading modal for dashboards.
	 * @memberOf dashboards
	 */
	function LoaddashboardsCtrl($scope, $modalInstance, Dashboards) {
		$scope.message = null;
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.close = close;
		$scope.dashboards = [];

		init();

		function init() {
			getDashboards();
		}
		
		/**
		 * @name getDashboards
		 * @desc Call API to get dashboards.
		 * On success, show number of dashboards and return them on close.
		 * On failure, show server error message.
		 */
		function getDashboards() {
			Dashboards
				.getDashboards()
				.then(success, error);

			function success(dashboards) {
				$scope.dashboards = dashboards;
				$scope.message = 'You have ' + dashboards.length + ' dashboards.';
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
		 * @desc Close modal and return dashboards
		 * @returns {Array.Object} dashboards - Returns dashboards.
		 */
		function close() {
			$modalInstance.close($scope.dashboards);
		}
	}
})();