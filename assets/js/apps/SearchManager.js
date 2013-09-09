define([
	'jquery',
	'mustache',
	'text!templates/SearchManager.tpl',
	'signals'
], function($, mustache, tpl_SearchManager, signals) {

	var $container = null,
		$wrap = null,
		$input = null,
		$search_button = null,
		remotes = null,
		results = null,
		options = null,
		events = null
		offset = 6,
		page = 1;

	SearchManager = function(options) {
		this.options = options;

		this.events = {
			onSearchComplete: new signals.Signal()
		};

		this.events.onSearchComplete.add(this.onSearchComplete.bind(this));

		this.$container = $('.Factory');
		this.$container.append(mustache.render(tpl_SearchManager, this.options.tpl_datas));
		this.$wrap = this.$container.find('.search').last();
		this.$input = this.$wrap.find('input');
		this.$button = this.$wrap.find('button');
		this.$content = this.$wrap.find('.content');
		this.$remote = this.$wrap.find('.remote');
			
		this.$button.on('click', this.doSearch.bind(this));

		this.offset = typeof this.options.offset !== "undefined" ? this.options.offset : offset;

		this.initLoader();

		this.hide();
	};

	SearchManager.prototype = {

		initLoader: function() {
			this.$loader = this.$wrap.find('.loader');
			this.hideLoader();
		},

		hideLoader: function() {
			debug('hideLoader');
			this.$loader.hide();
		},

		showLoader: function() {
			debug('showLoader');
			this.$loader.show();
		},

		populate: function(nodes) {
			var pages_nb = Math.ceil(nodes.length / this.offset);
			for(var index_page = 0; index_page < pages_nb; index_page++) {
				var page = $('<div class="page"></div>'),
					remote_elt = $('<a href="#"></a>');
				for(var index_node = index_page * this.offset; index_node < (index_page + 1) * this.offset; index_node++) {
					var node = $(nodes[index_node]);
					page.append(node);
					node.on('click', (function(index) {
						return function(e) {
							e.preventDefault();
							this.onResultClick.call(this, index);
						}.bind(this)
					}.bind(this))(index_node));
				}
				this.$content.append(page);
				remote_elt.on('click', (function(index) {
					return function(e) {
						e.preventDefault();
						this.goPage.call(this, index);
					}.bind(this)
				}.bind(this))(index_page));
				this.$remote.append(remote_elt);
			}
			this.page_width = this.$content.find('.page').width();
			this.remotes = this.$remote.find('a');
			this.results = this.$content.find('.result');
			this.goPage(0);
		},

		doSearch: function() {
			var query = this.$input.attr('value');
			debug('SearchManager::doSearch w/ query "'+ query+'"');
			this.showLoader();
			this.options.doSearch.call(null, query);
		},

		onSearchComplete: function(parameters) {
			debug('SearchManager::onSearchComplete');
			this.hideLoader();
			this.options.onSearchComplete.call(null, parameters);
		},

		goPage: function(index) {
			this.remotes.removeClass('select');
			$(this.remotes[index]).addClass('select');
			this.$content.animate({'margin-left': - index * this.page_width});
		},

		onResultClick: function(index) {
			this.results.removeClass('select');
			$(this.results[index]).addClass('select');
			this.options.onResultClick.call(null, index);
		},

		hide: function() {
			this.$wrap.hide();
		},

		show: function() {
			this.$wrap.show();
		}

	};

	return SearchManager;

});