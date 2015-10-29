'use strict';

angular
	.module('core')
	.factory('progressLoader', progressLoader);

function progressLoader() {

	angular.element.skylo({
      flat: true
    });

	var progressLoader = {};

    progressLoader.start = function() {
        angular.element.skylo('start');
    };
    
    progressLoader.set = function(position) {
        angular.element.skylo('set', position);
    };

    progressLoader.end = function() {
        angular.element.skylo('end');
    };

    progressLoader.get = function() {
        return angular.element.skylo('get');
    };

    progressLoader.inch = function(amount) {
        angular.element.skylo('show', function() {
          angular.element(document).skylo('inch', amount);
        });
    };

	return progressLoader;
}