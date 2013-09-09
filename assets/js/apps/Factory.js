define([
	'apps/FactoryImageManager',
	'apps/FactorySoundManager',
	'text!templates/Factory.tpl',
	'mustache'
], function(FactoryImageManager, FactorySoundManager, tpl_Factory, mustache) {

	var $container = null,
		$wrap = null;

	return {
		startup: function(options) {
			debug('Factory::startup');

			$container = options.container;
			$container.append(mustache.render(tpl_Factory));
			$wrap = $container.find('.Factory');

			FactoryImageManager.startup({
				container: $wrap
			});

			FactorySoundManager.startup({
				container: $wrap
			});

			FactoryImageManager.events.onComplete.add(this.onImageComplete.bind(this));
			FactoryImageManager.events.onDrop.add(this.onImageDrop.bind(this));
		},

		onImageComplete: function() {
			debug('onImageComplete');
		},

		onImageDrop: function(x, y) {
			FactorySoundManager.createTrack(x, y);
		}
	}
});