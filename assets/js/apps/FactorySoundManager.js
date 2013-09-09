define([
	'mustache',
	'text!templates/FactorySoundManager.tpl',
	'apps/FactoryTrack',
	'apps/SearchManager',
	'apps/TrackResult'
], function(mustache, tpl_FactorySoundManager, FactoryTrack, SearchManager) {

	var $container = null,
		$remote = null,
		// $connect = null,
		$remote = null,
		$add = null,
		add = null,
		$manual = null,
		bind_addDown = null,
		bind_addUp = null,
		bind_addOver = null,
		bind_addOut = null,
		bind_addDragStart = null,
		bind_addDragEnd = null,
		searchManager = null,
		client_id = '77f88e1586bf6138efb00fe095e69a87',
		redirect_uri = 'http://soundcard.lan/request.php?t=soundcloud';

	return {
		startup: function(options) {
			debug('FactorySoundManager::startup');

			$container = options.container;
			$container.append(mustache.render(tpl_FactorySoundManager));

			$remote = $container.find('.remote');

			$add = $remote.find('button');
			add = $add[0];
			bind_addUp = this.onAddUp.bind(this);
			bind_addDown = this.onAddDown.bind(this);
			bind_addOver = this.onAddOver.bind(this);
			bind_addOut = this.onAddOut.bind(this);
			bind_addDragStart = this.onAddDragStart.bind(this);
			bind_addDragEnd = this.onAddDragEnd.bind(this);

			add.addEventListener('mousedown', bind_addDown);
			add.addEventListener('mouseup', bind_addUp);
			add.addEventListener('mouseover', bind_addOver);
			add.addEventListener('mouseout', bind_addOut);
			add.addEventListener('dragstart', bind_addDragStart);
			add.addEventListener('dragend', bind_addDragEnd);

			$manual = $remote.find('.manual');
			$manual.hide();

			searchManager = new SearchManager({
				tpl_datas : {
					classe: 'soundcloud',
					label: 'Search on Soundcloud',
					placeholder: 'search'
				},
				doSearch: this.doSoundcloudSearch.bind(this),
				onSearchComplete: this.onSoundcloudSearchComplete.bind(this),
				onResultClick: this.onSoundcloudResultClick.bind(this)
			});

			this.initSoundcloud();
		},

		initSoundcloud: function() {
			SC.initialize({
				client_id: client_id,
				redirect_uri: redirect_uri
			});
		},

		onConnected: function(e) {
			$connect.hide();
		},

		onAddDown: function(e) {
			$manual.hide();
		},

		onAddUp: function(e) {
			
		},

		onAddOver: function(e) {
			$manual.show();
		},

		onAddOut: function(e) {
			$manual.hide();
		},

		onAddDragStart: function(e) {
			// debug(e.dataTransfer);
		},

		onAddDragEnd: function(e) {
			// debug(e);
		},

		createTrack: function(x, y) {
			var track = new FactoryTrack({
				position: {
					x: x,
					y: y
				}
			});

			searchManager.show();
		},

		doSoundcloudSearch: function(query) {
			// SC.get('/tracks', { q: query, license: 'cc-by-sa' }, function(tracks) {`
			//   SC.stream("/tracks/"+tracks[0].id, function(sound){
			// 	  sound.play();
			// 	});
			// });
			SC.get('/tracks', { q: query, license: 'cc-by-sa' }, searchManager.onSearchComplete.bind(searchManager));
		},

		onSoundcloudSearchComplete: function(tracks) {
			var nodes = [];
			tracks.forEach(function(track) {
				var track_result = new TrackResult({
					
				}),
					node = track_result.getNode();
				nodes.push(node);
			});
			searchManager.populate(nodes);
		},

		onSoundcloudResultClick: function() {

		},
	}

});