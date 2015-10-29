
(function(){
'use strict';

angular
	.module('settings')
	.controller('SettingsDeleteGroupModalCtrl', SettingsDeleteGroupModalCtrl);

	SettingsDeleteGroupModalCtrl.$inject = ['State', '$scope', '$modalInstance', 'Setting'];

	/**
	 * @name LoaddashboardsCtrl
	 * @desc Displays loading modal for dashboards.
	 * @memberOf dashboards
	 */
	function SettingsDeleteGroupModalCtrl(State, $scope, $modalInstance, Setting) {
		$scope.message = 'Delete group and group related, charts, dashboards, files and relationships.';
		$scope.title = 'Are you sure?';
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.deleting = false;
		$scope.close = close;
		$scope.setting = [];
		
		/**
		 * @name getDashboards
		 * @desc Call API to get dashboards.
		 * On success, show number of dashboards and return them on close.
		 * On failure, show server error message.
		 */
		$scope.deleteGroup = function() {
			$scope.deleting = true;
            var settingInfo = Setting.getSettingInfo();

            Setting.deleteGroup(State.dim.group['_id']).then(successDeleteGroup, error);

			function successDeleteGroup(setting) {
				$scope.deleting = false;
                $scope.setting = setting;
				$scope.title = 'Group deleted successfully!';
				$scope.message = 'Successfully deleted group and group related, charts, dashboards, files and relationships.';
				$scope.loadSuccess = true;
				$scope.loading = false;
			}

			function error(response) {
				$scope.deleting = false;
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
			$modalInstance.close($scope.setting);
		}
	}
})();