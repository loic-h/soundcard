define([
	'jquery',
	'mustache',
	'signals',
	'text!templates/resultInstagram.tpl',
	'apps/SearchManager'
], function($, mustache, signals, tpl_resultInstagram, SearchManager) {

	var $container = null,
		$wrap = null,
		wrap = null,
		$loader = null,
		$image = null,

		instagramUrl = 'https://api.instagram.com/v1/tags/{{tag}}/media/recent?callback=?',
		access_parameters = {
			client_id:'e8abec9b1f414900a64ba508441cf7d9'
		},
		searchManager = null,
		results = null,
		events = null;

	return {
		startup: function(options) {
			debug('FactoryImageManager::startup');

			$container = options.container;

			$image = $container.find('.image');

			$wrap = $container.find('.imageContainer');
			wrap = $container.find('.imageContainer')[0];
			enableEvents(wrap);
			wrap.addEvent('dragover', function(e) {
				e.preventDefault();
			});
			wrap.addEventListener('drop', this.onDrop.bind(this));

			this.events = {
				onComplete: new signals.Signal(),
				onDrop: new signals.Signal()
			};
			
			searchManager = new SearchManager({
				tpl_datas : {
					classe: 'instagram',
					label: 'Search on Instagram',
					placeholder: 'hashtag'
				},
				doSearch: this.doInstagramSearch.bind(this),
				onSearchComplete: this.onInstagramSearchComplete.bind(this),
				onResultClick: this.onInstagramResultClick.bind(this)
			});

			searchManager.show();
		},

		doInstagramSearch: function(query) {
			debug('FactoryImageManager::doInstagramSearch');
			var url = mustache.render(instagramUrl, {tag: query});

			$.getJSON(url, access_parameters, searchManager.onSearchComplete.bind(searchManager));
		},

		onInstagramSearchComplete: function(parameters) {
			this.results = parameters.data;
			var nodes = [];
			this.results.forEach(function(result) {
				var src = result.images.thumbnail.url,
					alt = "",
					node = mustache.render(tpl_resultInstagram, {src: src, alt: alt});
				nodes.push(node);
			});
			searchManager.populate(nodes);
		},

		onInstagramResultClick: function(index) {
			var selection = this.results[index];
			$image.append('<img src="'+selection.images.standard_resolution.url+'" />');
			searchManager.hide();
			this.events.onComplete.dispatch();
		},

		onDrop: function(e) {
			if (e.preventDefault) {
				e.preventDefault(); 
			}
			this.events.onDrop.dispatch(e.offsetX, e.offsetY);
			return false;
		}
	}
});