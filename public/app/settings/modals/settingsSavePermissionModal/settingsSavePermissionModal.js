
(function(){
'use strict';

angular
	.module('settings')
	.controller('SettinsSavePermissionModalCtrl', SettinsSavePermissionModalCtrl);

	SettinsSavePermissionModalCtrl.$inject = ['$scope', '$modalInstance', 'Setting'];

	/**
	 * @name LoaddashboardsCtrl
	 * @desc Displays loading modal for dashboards.
	 * @memberOf dashboards
	 */
	function SettinsSavePermissionModalCtrl($scope, $modalInstance, Setting) {
		$scope.message = null;
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.close = close;
		$scope.setting = [];

		init();

		function init() {
			updateRoles();
		}
		
		/**
		 * @name getDashboards
		 * @desc Call API to get dashboards.
		 * On success, show number of dashboards and return them on close.
		 * On failure, show server error message.
		 */
		function updateRoles() {
            var settingInfo = Setting.getSettingInfo();

            Setting.updateRoles(settingInfo.roleIds, settingInfo.permissionIds).then(successUpdateRoles, error);

			function successUpdateRoles(setting) {
                $scope.setting = setting;
				$scope.message = 'Permissions updated successfully';
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
			$modalInstance.close($scope.setting);
		}
	}
})();