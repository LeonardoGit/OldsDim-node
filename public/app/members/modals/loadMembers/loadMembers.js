
(function(){
'use strict';

angular
	.module('members')
	.controller('LoadMembersCtrl', LoadMembersCtrl);

    LoadMembersCtrl.$inject = ['$scope', '$modalInstance', 'State'];

	/**
	 * @name LoadmembersCtrl
	 * @desc Displays loading modal for members.
	 * @memberOf members
	 */
	function LoadMembersCtrl($scope, $modalInstance, State) {
		$scope.message = null;
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.close = close;
		$scope.group = State.dim.group;

		init();

		function init() {
			getGroup();
		}
		
		/**
		 * @name getGroup
		 * @desc Get group from State service.
		 */
		function getGroup() {
            $scope.message = 'You have ' + $scope.group.members.length + ' members.';
            $scope.loadSuccess = true;
            $scope.loading = false;
		}

		/**
		 * @name close
		 * @desc Close modal and return members
		 * @returns {Array.Object} members - Returns members.
		 */
		function close() {
			$modalInstance.close($scope.group);
		}
	}
})();