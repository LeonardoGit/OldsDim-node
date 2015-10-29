(function(){
'use strict';

angular
	.module('files')
	.factory('Files', Files);

	Files.$inject = ['HearstAPI', 'CONFIG', '$q'];

	/**
	 * @name Files
	 * @desc API for files
	 * @memberOf files
	 */
	function Files(HearstAPI, CONFIG, $q) {
		var Files = {};

		/** 
		 * @name getFiles
		 * @desc Get all files stored in the hearst API. (csv, images, pdf .etc)
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		Files.getFiles = function() {
			return HearstAPI.getFiles();
		};

		/** 
		 * @name deleteFiles
		 * @desc Delete file entity. // TODO Batch file deletion.
		 * @params {{Number}} id, file id to be deleted.
		 */
		Files.deleteFiles = function(id) {
			return HearstAPI.deleteFiles(id);
		};

		/** 
		 * @name uploadFile
		 * @desc Upload file to hearst API.
		 * @params {{file}} file, file object to be uploaded.
		 */
		Files.uploadFile = function(files, type) {
			// If multiple files
			if(files.length > 1) {	
		        var defer = $q.defer();
		        var promises = [];
		        angular.forEach(files, function(file) {
		            promises.push(HearstAPI.uploadFile(file, type));
		        });
		        return $q.all(promises);
			} else {
				// If single file
				return HearstAPI.uploadFile(files, type);
			}
      	};

      	/** 
		 * @name replaceFile
		 * @desc Replace file on AWS.
		 * @params {{file}} file, file object to be uploaded.
		 */
      	Files.replaceFile = function(newFile, oldFile) {
			AWS.config.update(CONFIG.aws.account);
			var bucket = new AWS.S3({ params: { Bucket: CONFIG.aws.files.bucket } });
		    var params = { 
		    	Key: oldFile.file_path,
		    	ContentType: newFile.type,
		    	Body: newFile,
		    	ServerSideEncryption: 'AES256' 
		    };

		    var defer = $q.defer();

		    bucket.upload(params, function(err, data) {
		    	if(err) {
		    		defer.reject(err);
		    	} else {
			    	defer.resolve(data);
			    }
		    });

		    return defer.promise;
      	};

        /**
         * Get content of the CSV file.
         * @param params
         * @param callback
         */

        Files.getFileData = function (csv, callback) {
            AWS.config.update(CONFIG.aws.account);

            var s3 = new AWS.S3();
            var params = {
                Bucket: csv.bucket,
                Key: csv.file_path,
                ResponseContentType: 'text/csv'
            };
            s3.getObject(params, callback);
        };

		return Files;
	}
})();