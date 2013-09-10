define([
	'jquery',
	'mustache',
	'text!templates/anchor.tpl',
	'signals'
], function($, mustache, tpl_anchor, signals) {

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
			this.$anchor.css({
				left: this.options.position.x - width / 2,
				top: this.options.position.y - width / 2
			});

			this.$anchor
				.addClass('select')
				.on({
					'click': function() {
						if(this.isPlaying) {
							this.stop();
						}
						else {
							this.play();
						}
					}.bind(this),
					'mouseover': function() {
						if(!this.isPlaying) {
							this.$anchor.addClass('select');
						}
					}.bind(this),
					'mouseout': function() {
						if(!this.isPlaying) {
							this.$anchor.removeClass('select');
						}
					}.bind(this)
				})
		},

		setSound: function(track) {
			this.track = track;
			this.out();
		},

		out: function() {
			this.$anchor.removeClass('select');
		},

		play: function() {
			SC.stream('/tracks/'+this.track.id, function(sound) {
				this.sound = sound;
				sound.play();
				this.isPlaying = true;
				if(!this.wave) {
					this.wave = new Wave({
						container: document.getElementById('mainWave'),
						innerColor: "#333",
						datas: this.track
					});
				}
				else {
					this.wave.show();
				}
				this.events.play.dispatch(this);
			}.bind(this));
			this.$anchor.addClass('playing');
		},

		stop: function() {
			if(this.sound){
				this.sound.stop();
				this.sound = null;
				this.$anchor.removeClass('playing');
				this.isPlaying = false;
				this.wave.hide();
			}
		}

	};

	return FactoryTrack;

});