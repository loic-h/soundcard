/*
 *	Factory.js
 *
 *	Main object for the image creation (in opposition of an eventual Gallery)
 *
 *	@ Loïc Hamet
 */

define([
	'apps/FactoryImageManager',
	'apps/FactorySoundManager',
	'text!templates/factory.tpl',
	'mustache'
], function(FactoryImageManager, FactorySoundManager, tpl_factory, mustache) {

	var $container = null,
		$wrap = null;

	return {
		startup: function(options) {
			debug('Factory::startup');

			$container = options.container;
			$container.append(mustache.render(tpl_factory));
			$wrap = $container.find('.Factory');

			FactoryImageManager.startup({
				container: $wrap
			});

			FactorySoundManager.startup({
				container: $wrap
			});

			FactorySoundManager.hide();

			FactoryImageManager.events.onComplete.add(this.onImageSelect.bind(this));
			FactoryImageManager.events.onClick.add(this.onImageClick.bind(this));
			FactoryImageManager.events.onDrop.add(this.onImageDrop.bind(this));
		},

		onImageSelect: function() {
			
		},

		onImageClick: function(e) {
			debug(e);
			FactorySoundManager.createTrack(e.offsetX, e.offsetY);
		},

		onImageDrop: function(x, y) {
			FactorySoundManager.createTrack(x, y);
		},

		onSoundSelect: function() {

		}
	}
});