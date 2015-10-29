angular
	.module('files')
	.directive('fileUpload', function() {
	return {
	    restrict: 'AE',
	    scope: {
	      file: '@'
	    },
	    link: function(scope, el, attrs){

	    	$(document).on('change', '.btn-file :file', function() {
			  var input = $(this),
			      numFiles = input.get(0).files ? input.get(0).files.length : 1,
			      label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			  input.trigger('fileselect', [numFiles, label]);
			});		

			$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
			    var input = $(this).parents('.input-group').find(':text'),
			        log = numFiles > 1 ? numFiles + ' files selected' : label;
			    
			    if( input.length ) {
			        input.val(log);
			    } else {
			        if( log ) alert(log);
			    }
			    
			});

			el.bind('change', function(event){
				var files = event.target.files;
				var file = files[0];
				scope.file = file;
				scope.$parent.file = file;
				scope.$parent.files = files;
				scope.$apply();
			});
	    }
	};
});