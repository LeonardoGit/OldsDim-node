(function(){
'use strict';

angular
	.module('dim')
	.service('State', State);

	State.$inject = ['store'];

	/**
	 * @name State
	 * @desc Service to keep state of site.
	 * @memberOf dim
	 */
	function State(store) {
		this.dim = {
			user: function() {
				return store.get('dim.user');
			},
			group: {},
			groups: []
		};
	}

})();