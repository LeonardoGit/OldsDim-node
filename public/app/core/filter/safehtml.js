'use strict';

angular
	.module('core')
	.filter('safe_html', ['$sce', safe_html]);

function safe_html($sce) {
	return function(val) {
      return $sce.trustAsHtml(val);
    };
}