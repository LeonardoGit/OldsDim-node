'use strict';

angular
	.module('core')
	.factory('enquire', ['$window', enquire]);

function enquire($window) {
	return $window.enquire;
}