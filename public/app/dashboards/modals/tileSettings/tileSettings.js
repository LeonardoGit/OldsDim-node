(function() {
'use strict';

angular
	.module('dashboards')
	.controller('TilesettingsCtrl', TilesettingsCtrl);

	TilesettingsCtrl.$inject = ['$scope', '$modalInstance', 'tile', 'Files'];

	function TilesettingsCtrl($scope, $modalInstance, tile, Files){
		$scope.tile = tile;
		$scope.file = null;
		$scope.loading = false;
		$scope.uploadFile = uploadFile;
		$scope.uploadSuccess = false;
		$scope.uploadError = false;
		$scope.message = '';
		$scope.close = close;

		/**
		 * @name uploadFile
		 * @desc Upload new file to AWS for a background image.
		 * On success, return image path.
		 * On failure, show server error message.
		 */
		function uploadFile() {
			if($scope.file) {
				$scope.loading = true;
			
				Files
					.uploadFile($scope.file, 'backgrounds')
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
			$modalInstance.close($scope.tile);
		}

		$scope.schema = [
			{ label: 'Text Color', property: 'style.color', type: 'text', attr: { colorpicker: 'rgba' } },
			{ label: 'Background Color', property: 'style.backgroundColor', type: 'text', attr: { colorpicker: 'rgba' } },
			{ label: 'Background Image', property: 'style.backgroundImage', type: 'file', attr: { name: 'file', fileUpload: '' } }
		];

		$scope.options = {
			validation: {
				enabled: false,
				showMessages: false
			},
			layout: {
				type: 'basic',
				labelSize: 3,
				inputSize: 9
			}
		};
	}
})();