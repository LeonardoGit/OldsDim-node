(function(){
'use strict';

angular
	.module('files')
	.controller('ReplacefileCtrl', ReplacefileCtrl);

	ReplacefileCtrl.$inject = ['$scope', '$modalInstance', 'Files', 'file'];

	/**
	 * @name ReplacefileCtrl
	 * @desc Displays modal for replacing file.
	 * @memberOf files
	 */
	function ReplacefileCtrl($scope, $modalInstance, Files, file) {
		$scope.message = 'Replace ' + file.file_name;
		$scope.loading = false;
		$scope.oldFile = file;
		$scope.file = null;
		$scope.replaceFile = replaceFile;
		$scope.uploadSuccess = false;
		$scope.uploadError = false;
		$scope.close = close;

		/**
		 * @name replaceFile
		 * @desc Upload new file to AWS, overwritting the existing file.
		 * On success, show number of charts and return them on close.
		 * On failure, show server error message.
		 */
		function replaceFile() {
			if($scope.file) {
				$scope.loading = true;
			
				Files
					.replaceFile($scope.file, $scope.oldFile)
					.then(success, error);

			} else {
				$scope.message = 'No File Selected';
			}

			function success(response) {
				$scope.message = 'Your file was replaced';
				$scope.uploadSuccess = true;
				$scope.loading = false;
			}

			function error(response) {
				$scope.message = 'Server error '+ response.data.code + ': ' + response.message;
				$scope.uploadError = true;
				$scope.loading = false;
			}
		}


		/**
		 * @name close
		 * @desc Close modal.
		 */
		function close() {
			$modalInstance.close();
		}
	}
})();