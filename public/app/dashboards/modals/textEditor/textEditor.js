(function() {
'use strict';

angular
	.module('dashboards')
	.controller('TexteditorCtrl', TexteditorCtrl);

	TexteditorCtrl.$inject = ['$scope', '$modalInstance', 'tile'];

	function TexteditorCtrl($scope, $modalInstance, tile){
		$scope.tile = tile || {};
		$scope.text = $scope.tile.text || '';
		$scope.close = close;

		/**
		 * @name close
		 * @desc Close modal.
		 */
		function close() {
			$modalInstance.close($scope.text);
		}
	}
})();