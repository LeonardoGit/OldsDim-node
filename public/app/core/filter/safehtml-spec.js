describe('safe_html', function() {

	beforeEach(module('core'));

	it('should ...', inject(function($filter) {

        var filter = $filter('safeHtml');

		expect(filter('input')).toEqual('output');

	}));

});