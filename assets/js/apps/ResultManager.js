define([
	'jquery',
	'mustache',
	'text!templates/ResultManager.tpl',
	'signals'
], function($, mustache, tpl_ResultManager, signals) {

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

	ResultManager = function(options) {
		this.options = options;

		this.events = {
			onSearchComplete: new signals.Signal()
		};

		this.events.onSearchComplete.add(this.onSearchComplete.bind(this));

		this.$container = $(this.options.container);
		this.$container.append(mustache.render(tpl_ResultManager, {classe: this.options.classe}));
		this.$wrap = this.$container.find('.search');
		this.$input = this.$container.find('input');
		this.$button = this.$container.find('button');
		this.$content = this.$container.find('.content');
		this.$remote = this.$container.find('.remote');
			
		this.$button.on('click', this.doSearch.bind(this));

		this.initLoader();
	};

	ResultManager.prototype = {

		initLoader: function() {
			this.$loader = this.$container.find('.loader');
			this.hideLoader();
		},

		hideLoader: function() {
			this.$loader.hide();
		},

		showLoader: function() {
			debug('loader');
			this.$loader.show();
		},

		populate: function(nodes) {
			var pages_nb = Math.ceil(nodes.length / offset);
			for(var index_page = 0; index_page < pages_nb; index_page++) {
				var page = $('<div class="page"></div>'),
					remote_elt = $('<a href="#"></a>');
				for(var index_node = index_page * offset; index_node < (index_page + 1) * offset; index_node++) {
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
			debug('ResultManager::doSearch w/ query "'+ query+'"');
			this.showLoader();
			this.options.doSearch.call(null, query);
		},

		onSearchComplete: function(parameters) {
			debug('ResultManager::onSearchComplete');
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

	return ResultManager;

});