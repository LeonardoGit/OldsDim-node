(function(){
'use strict';

angular
	.module('files')
	.controller('UploadfilesCtrl', UploadfilesCtrl);

	UploadfilesCtrl.$inject = ['$scope', '$modalInstance', 'Files'];

	/**
	 * @name UploadfilesCtrl
	 * @desc Display modal for uploading files.
	 * @memberOf files
	 */
	function UploadfilesCtrl($scope, $modalInstance, Files) {
		$scope.message = 'Upload Files';
		$scope.loading = false;
		$scope.files = null;
		$scope.upload = upload;
		$scope.uploadSuccess = false;
		$scope.uploadError = false;
		$scope.close = close;

		/**
		 * @name getFiles
		 * @desc Upload new file to AWS, overwritting the existing file.
		 * On success, show number of charts and return them on close.
		 * On failure, show server error message.
		 */
		function upload() {		 
			if($scope.files) {
				$scope.loading = true;

				Files
					.uploadFile($scope.files, 'files')
					.then(success, error);

			} else {
				$scope.message = 'No File Selected';
			}

			function success(response) {
				$scope.message = 'Your files were uploaded';
				$scope.uploadSuccess = true;
				$scope.loading = false;
			}

			function error(response) {
				$scope.message = 'Server error '+ response.data.code + ': ' + response.data.message;
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