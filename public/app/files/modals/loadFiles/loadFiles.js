(function(){
'use strict';

angular
	.module('files')
	.controller('LoadfilesCtrl', LoadfilesCtrl);

	LoadfilesCtrl.$inject = ['$scope', '$modalInstance', 'Files'];

	/**
	 * @name LoadfilesCtrl
	 * @desc Displays loading modal for files.
	 * @memberOf files
	 */
	function LoadfilesCtrl($scope, $modalInstance, Files) {
		$scope.message = null;
		$scope.loading = true;
		$scope.loadSuccess = false;
		$scope.loadError = false;
		$scope.close = close;
		$scope.files = [];

		init();

		function init() {
			getFiles();
		}

		/**
		 * @name getFiles
		 * @desc Call API to get files.
		 * On success, show number of charts and return them on close.
		 * On failure, show server error message.
		 */
		function getFiles() {
			Files
				.getFiles()
				.then(success, error);

			function success(files) {
				$scope.files = files;
				$scope.message = 'You have ' + files.length + ' files.';
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
		 * @desc Close modal and return files
		 * @returns {Array.Object} files - Returns files.
		 */
		function close() {
			$modalInstance.close($scope.files);
		}
	}
})();