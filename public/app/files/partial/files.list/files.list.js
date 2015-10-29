(function(){
'use strict';

angular
	.module('files')
	.controller('FilesListCtrl', FilesListCtrl);

	FilesListCtrl.$inject = ['$scope', 'SweetAlert', '$modal', 'Files'];

	/**
	 * @name FilesListCtrl
	 * @desc List files in list and grid views.
	 * @memberOf files
	 */
	function FilesListCtrl($scope, SweetAlert, $modal, Files) {
		$scope.loading = true;
		$scope.view = 'list';
		$scope.displayView = displayView;
		$scope.files = [];
		$scope.predicate = 'file_name';
		$scope.reverse = true;
		$scope.order = order;
		$scope.selectedFiles = [];
		$scope.selected = selected;
		$scope.selectFile = selectFile;
		$scope.selectAllFiles = selectAllFiles;
		$scope.deleteAllFiles = deleteAllFiles;
		$scope.deleteFile = deleteFile;
		$scope.uploadFiles = uploadFiles;
		$scope.replaceFile = replaceFile;

		init();

		function init() {
			loadFiles();
		}

		/** 
		 * @name displayView
		 * @desc Open loadingFiles modal and load files.
		 */
		function displayView(type) {
			return !$scope.loading && ($scope.view === type);
		}

		/** 
		 * @name loadFiles
		 * @desc Open loadingFiles modal and load files.
		 */
		function loadFiles() {
			$modal.open({
			  templateUrl: 'app/files/modals/loadFiles/loadFiles.html',
      		  controller: 'LoadfilesCtrl'
			}).result.then(function(files){
			  $scope.files = files;
			  $scope.loading = false;
			});	
		}

		/** 
		 * @name order
		 * @desc Change descending and ascending order of predicate.
		 */
		function order(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		}

		/** 
		 * @name selectAllFiles
		 * @desc Add or Remove all files from $scope.selectedFiles.
		 * @params {{Boolean}} selectAll, are we adding or removing files.
		 */
		function selectAllFiles(selectAll) {
			if(selectAll) {
				$scope.selectedFiles = angular.copy($scope.files);
			} else {
				$scope.selectedFiles = [];
			}
		}

		/** 
		 * @name selectFile
		 * @desc Check if file is in $scope.selectedFiles.
		 * @params {{Object}} file, a file object.
		 */
		function selectFile(file) {
			if(selected(file)) {
				$scope.selectedFiles = _.reject($scope.selectedFiles, function(item) {
					return item.id === file.id;
				});
			} else {
				$scope.selectedFiles.push(file);
			}
		}

		/** 
		 * @name selected
		 * @desc Check if file is selected, in $scope.selectedFiles.
		 * @params {{Object}} file, a file object.
		 * @return {{Boolean}} returns undefined if file is not found.
		 */
		function selected(file) {
			return _.findWhere($scope.selectedFiles, {
				id: file.id
			});
		}

		/** 
		 * @name deleteAllFiles
		 * @desc Display a sweetalert to confirm files deletion.
		 * On cancel deletion, display a message that the files
		 * are safe and have not been deleted.
		 * On delete, display a message that the files have been deleted.
		 */
		function deleteAllFiles() {
			var numberOfSelectedFiles = $scope.selectedFiles.length;

			if(numberOfSelectedFiles > 0) {
				SweetAlert.swal({
				   title: 'Are you sure?',
				   text: 'You will not be able to recover these ' + numberOfSelectedFiles + ' files!',
				   type: "warning",
				   showCancelButton: true,
				   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete them!",
				   cancelButtonText: "No, cancel please!",
				   closeOnConfirm: false,
				   closeOnCancel: false }, 
				function(isConfirm){ 
				   if (isConfirm) {
				   		Files
			   				.deleteFiles(getIdArray($scope.selectedFiles))
			   				.then(success, error);
				   } else {
				      SweetAlert.swal("Cancelled", "Your files are safe :)", "error");
				   }
				});
			}

			function getIdArray(files) {
				var idArray = [];
				angular.forEach(files, function(file) { 
					idArray.push(parseInt(file.id, 10));
		   		});

				return idArray;
			}

			function success(response) {
				// remove files from files array.
		   		angular.forEach($scope.selectedFiles, function(file) { 
		   			$scope.files = _.reject($scope.files, function(item) {
						return item.id === file.id;
					});
		   		});
		   		// empty selected files array.
		   		$scope.selectedFiles = [];
				SweetAlert.swal("Deleted!", "Your files have been deleted.", "success");
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name deleteFile
		 * @desc Display a sweetalert to confirm file deletion.
		 * On cancel deletion, display a message that the file
		 * is safe and has not been deleted.
		 * On delete, display a message that the file has been deleted.
		 * @params {{Object}} file, a file object.
		 */
		function deleteFile(file) {
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "You will not be able to recover this file!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
			   cancelButtonText: "No, cancel please!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   		Files
		   				.deleteFiles(file.id)
		   				.then(success, error);
			   } else {
			      SweetAlert.swal("Cancelled", "Your file is safe :)", "error");
			   }
			});

			function success(response) {
				// remove chart from files array.
		   		$scope.files = _.reject($scope.files, function(item) {
					return item.id === file.id;
				});
				$scope.selectedFiles = _.reject($scope.selectedFiles, function(item) {
					return item.id === file.id;
				});
				SweetAlert.swal("Deleted!", "Your file has been deleted.", "success");
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name uploadFiles
		 * @desc Display a modal to upload new files.
		 */
		function uploadFiles() {
			$modal.open({
			  templateUrl: 'app/files/modals/uploadFiles/uploadFiles.html',
			  controller: 'UploadfilesCtrl'
			}).result.then(function(result){
			  //do something with the result
			});
		}

		/** 
		 * @name replaceFile
		 * @desc Display a modal to replace file.
		 * @params {{Object}} file, a file object.
		 */
		function replaceFile(file) {
			$modal.open({
			  templateUrl: 'app/files/modals/replaceFile/replaceFile.html',
			  controller: 'ReplacefileCtrl',
			  resolve: {
		        file: function () {
		          return file;
		        }
		      }
			}).result.then(function(result){
			  //do something with the result
			});
		}
	}
})();