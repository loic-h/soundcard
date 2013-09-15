/*
 *	FactorySoundManager.js
 *
 *	Manage the sounds in the application (search, disposition...)
 *
 *	@ Loïc Hamet
 */

define([
	'mustache',
	'apps/FactoryTrack',
	'apps/SearchManager',
	'apps/TrackResult'
], function(mustache, FactoryTrack, SearchManager) {

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
		playingResult = null,
		playingTrack = null,
		tracks = null,
		currentTrack = null,
		client_id = '77f88e1586bf6138efb00fe095e69a87',
		redirect_uri = 'http://soundcard.lan/request.php?t=soundcloud';

	return {
		startup: function(options) {
			debug('FactorySoundManager::startup');

			$container = options.container;

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
				container: $('.imageContainer'),
				tpl_datas : {
					classe: 'soundcloud',
					label: 'Add a sound',
					placeholder: 'search'
				},
				doSearch: this.doSoundcloudSearch.bind(this),
				onSearchComplete: this.onSoundcloudSearchComplete.bind(this),
				onResultClick: this.onSoundcloudResultClick.bind(this),
				offset: 4
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
			
		},

		onAddDragEnd: function(e) {
			
		},

		createTrack: function(x, y) {
			this.currentTrack = new FactoryTrack({
				position: {
					x: x,
					y: y
				}
			});

			this.currentTrack.events.play.add(function(track) {
				if(this.playingTrack && track != this.playingTrack) {
					this.playingTrack.stop();
					this.playingTrack.out();
				}
				this.playingTrack = track;
			}.bind(this));

			searchManager.show();
		},

		/* SEARCH */

		doSoundcloudSearch: function(query) {
			SC.get('/tracks', { q: query, license: 'cc-by-sa' }, searchManager.onSearchComplete.bind(searchManager));
		},

		onSoundcloudSearchComplete: function(sounds) {
			var nodes = [],
				results = [];
			this.sounds = sounds;
			sounds.forEach(function(sound) {
				var track_result = new TrackResult({
					datas: sound
				}),
				node = track_result.getNode();
				track_result.events.play.add(this.onPlaySound.bind(this, track_result));
				nodes.push(node);
				results.push(track_result);
			}.bind(this));
			searchManager.populate(nodes);
			var $results = searchManager.$wrap.find('.result');
			results.forEach(function(result, index) {
				result.init($results[index]);
			});
		},

		onPlaySound: function(result) {
			debug('FactorySoundManager::onPlaySound');
			if(this.playingResult && this.playingResult != result) {
				this.playingResult.stop();
			}
			this.playingResult = result;
		},

		onSoundcloudResultClick: function(index) {
			var sound = this.sounds[index];
			if(this.playingResult) {
				this.playingResult.stop();
			}
			this.currentTrack.setSound(sound);
			searchManager.reset();
			searchManager.hide();
		},

		hide: function() {
			$remote.hide();
		},

		show: function() {
			$remote.show();
		}
	}

});