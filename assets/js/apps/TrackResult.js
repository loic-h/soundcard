define([
	'mustache',
	'signals',
	'text!templates/ResultTrack.tpl',
	'lib/waveform'
], function(mustache, signals, tpl_ResultTrack) {

	var options = null,
		$container = null,
		$wrap = null,
		$wave = null,
		sound = null;

	TrackResult = function(options) {
		this.options = options;

		this.events = {
			'play': new signals.Signal(),
			'stop': new signals.Signal(),
		}

	};

	TrackResult.prototype = {
		getNode: function() {
			return mustache.render(tpl_ResultTrack, {
				title: this.options.datas.title,
				user: this.options.datas.user.username
			});
		},

		init: function(wrap) {
			this.$wrap = $(wrap);
			this.$wave = this.$wrap.find('.wave');
			var waveform = new Waveform({
				container: this.$wave[0],
				innerColor: "#fff"
			});
			waveform.dataFromSoundCloudTrack(this.options.datas);

			this.$wrap.on({
				'click': function() {
					
				},
				'mouseover': function() {

				},
				'mouseout': function() {

				}
			});

			this.$wrap.find('button').on({
				'click': function(e) {
					if(!this.$wrap.hasClass('playing')) {
						this.play();
					}
					else {
						this.stop();
					}
					e.stopPropagation();
				}.bind(this)
			});
		},

		play: function() {
			this.$wrap.addClass('playing');
			SC.stream('/tracks/'+this.options.datas.id, function(sound) {
				this.sound = sound;
				this.sound.play();
				this.events.play.dispatch();
			}.bind(this));
		},

		stop: function() {
			debug('stop');
			this.$wrap.removeClass('playing');
			this.sound.stop();
			this.events.stop.dispatch(this.sound);
		}
	};

	return TrackResult;

});