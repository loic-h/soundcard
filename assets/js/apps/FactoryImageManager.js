define([
	'jquery',
	'mustache',
	'signals',
	'text!templates/FactoryImageManager.tpl',
	'text!templates/ResultInstagram.tpl',
	'apps/ResultManager'
], function($, mustache, tpl_FactoryImageManager, signals, tpl_ResultInstagram, ResultManager) {

	var $container = null,
		$loader = null,
		$image = null,

		instagramUrl = 'https://api.instagram.com/v1/tags/{{tag}}/media/recent?callback=?',
		access_parameters = {
			client_id:'e8abec9b1f414900a64ba508441cf7d9'
		},
		instagramResultManager = null,
		results = null,
		events = null;

	return {
		startup: function(options) {
			debug('FactoryImageManager::startup');

			$container = $(options.container);
			$container.append(mustache.render(tpl_FactoryImageManager));

			$image = $container.find('.image');

			this.events = {
				onComplete: new signals.Signal()
			};
			
			instagramResultManager = new ResultManager({
				classe: 'instagram',
				container: $container.find('.imageContainer'),
				doSearch: this.doInstagramSearch.bind(this),
				onSearchComplete: this.onInstagramSearchComplete.bind(this),
				onResultClick: this.onInstagramResultClick.bind(this)
			});
		},

		doInstagramSearch: function(query) {
			debug('FactoryImageManager::doInstagramSearch');
			var url = mustache.render(instagramUrl, {tag: query});

			$.getJSON(url, access_parameters, instagramResultManager.onSearchComplete.bind(instagramResultManager));
		},

		onInstagramSearchComplete: function(parameters) {
			this.results = parameters.data;
			var nodes = [];
			this.results.forEach(function(result) {
				var src = result.images.thumbnail.url,
					alt = "",
					node = mustache.render(tpl_ResultInstagram, {src: src, alt: alt});
				nodes.push(node);
			});
			instagramResultManager.populate(nodes);
		},

		onInstagramResultClick: function(index) {
			var selection = this.results[index];
			$image.append('<img src="'+selection.images.standard_resolution.url+'" />');
			instagramResultManager.hide();
			this.events.onComplete.dispatch();
		}
	}
});