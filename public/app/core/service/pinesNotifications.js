'use strict';

angular
	.module('core')
	.factory('pinesNotifications', ['$window', pinesNotifications]);

function pinesNotifications($window) {
	
	var pinesNotifications = {};

	pinesNotifications.notify = function (args) {
		args.styling = 'fontawesome';
		args.mouse_reset = false;
		var notification = new $window.PNotify(args);
		notification.notify = notification.update;
		return notification;
    }

	return pinesNotifications;
}