
(function(){
'use strict';

angular
	.module('settings')
	.controller('SettingsCreateRoleModalCtrl', SettingsCreateRoleModalCtrl);

	SettingsCreateRoleModalCtrl.$inject = ['State', '$scope', '$modalInstance', 'Setting'];

	/**
	 * @name LoaddashboardsCtrl
	 * @desc Displays loading modal for dashboards.
	 * @memberOf dashboards
	 */
	function SettingsCreateRoleModalCtrl(State, $scope, $modalInstance, Setting) {
		$scope.message = 'Delete group and group related, charts, dashboards, files and relationships.';
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.saving = false;
		$scope.close = close;
		$scope.setting = [];
		$scope.roleName = '';
		$scope.coreRole = false;
		
		/**
		 * @name getDashboards
		 * @desc Call API to get dashboards.
		 * On success, show number of dashboards and return them on close.
		 * On failure, show server error message.
		 */
		$scope.createRole = function() {
			$scope.saving = true;

			var permissions = [
				{name: 'Dashboard', value:[]},
				{name: 'Charts', value:[]},
				{name: 'Files', value:[]},
				{name: 'Themes', value:[]},
				{name: 'Members', value:[]},
				{name: 'Settings', value:[]},
			]

            Setting.createRole(State.dim.group['_id'], $scope.roleName, $scope.coreRole, permissions).then(successCreateRole, error);

			function successCreateRole(setting) {
				$scope.saving = false;
                $scope.setting = setting;
				$scope.message = 'Role created successfully.';
				$scope.loadSuccess = true;
				$scope.loading = false;
			}

			function error(response) {
				$scope.saving = false;
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