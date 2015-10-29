angular.module('login').controller('LoginCtrl',function($scope, $theme){
	'use strict';
    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });
});