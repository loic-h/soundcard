/*
 *	FactoryTrack.js
 *
 *	Manage a track displayed on the picture
 *
 *	@ Loïc Hamet
 */

define([
	'jquery',
	'mustache',
	'text!templates/anchor.tpl',
	'signals',
	'apps/Sound'
], function($, mustache, tpl_anchor, signals, Sound) {

	var options = null,
		$anchor = null,
		$container = null,
		sound = null,
		track = null,
		isPlaying = null,
		wave = null,
		events = null;

	FactoryTrack = function(options) {
		debug('FactoryTrack::initialize');
		this.options = options;

		this.isPlaying = false;

		$container = $('.tracksContainer');

		this.events = {
			play: new signals.Signal()
		}

		this.createAnchor();
	};

	FactoryTrack.prototype = {

		createAnchor: function() {
			$container.append(tpl_anchor);
			this.$anchor = $container.find('.anchor').last();
			var width = this.$anchor.width();
			this.top = this.options.position.y;
			this.$anchor.css({
				left: this.options.position.x - width / 2,
				top: this.top - width / 2
			});

			this.$anchor
				.addClass('select')
				.on({
					'click': function(e) {
						debug('click');
						if(this.isPlaying) {
							this.stop();
						}
						else {
							this.play();
						}
						e.stopPropagation()
					}.bind(this),
					'mouseenter': function() {
						if(!this.isPlaying) {
							this.$anchor.addClass('select');
						}
					}.bind(this),
					'mouseleave': function() {
						if(!this.isPlaying) {
							this.$anchor.removeClass('select');
						}
					}.bind(this)
				})
		},

		setSound: function(track) {
			debug('setSopund');
			debug(track);
			this.sound = new Sound({
				datas: track,
				wave: {
					container: document.getElementById('waveContainer'),
					innerColor: "#333",
					top: this.top
				}
			});
			this.sound.wave.hide();
			this.sound.events.play.add(function() {
				this.wave.show();
			}.bind(this.sound));
			this.sound.events.stop.add(function() {
				this.wave.hide();
			}.bind(this.sound));
			this.out();
		},

		out: function() {
			this.$anchor.removeClass('select');
		},

		play: function() {
			this.sound.play(function() {
				this.isPlaying = true;
				this.events.play.dispatch(this);
			}.bind(this));
			this.$anchor.addClass('playing');
		},

		stop: function() {
			debug('FactoryTrack::stop');
			if(this.sound){
				this.sound.stop();
				this.$anchor.removeClass('playing');
				this.isPlaying = false;
			}
		}

	};

	return FactoryTrack;

});