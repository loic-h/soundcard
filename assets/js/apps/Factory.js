define([
	'apps/FactoryImageManager'
], function(FactoryImageManager) {

	return {
		startup: function() {
			debug('Factory::startup');

			FactoryImageManager.startup({
				container: '#container .main'
			});
		}
	}
});