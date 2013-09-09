define([
	'jquery',
	'mustache',
	'text!templates/Anchor.tpl'
], function($, mustache, tpl_Anchor) {

	var options = null,
		$anchor = null,
		$container = null;

	FactoryTrack = function(options) {
		debug('FactoryTrack::initialize');
		this.options = options;

		$container = $('.tracksContainer');

		this.createAnchor();
	};

	FactoryTrack.prototype = {

		createAnchor: function() {
			$container.append(tpl_Anchor);
			this.$anchor = $container.find('.anchor').last();
			var width = this.$anchor.width();
			this.$anchor.css({
				left: this.options.position.x - width,
				top: this.options.position.y - width
			});
		}

	};

	return FactoryTrack;

});