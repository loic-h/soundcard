define([
	'mustache',
	'signals',
	'text!templates/resultTrack.tpl',
	'apps/Wave'
], function(mustache, signals, tpl_resultTrack, Wave) {

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
			'select': new signals.Signal()
		}

	};

	TrackResult.prototype = {
		getNode: function() {
			return mustache.render(tpl_resultTrack, {
				title: this.options.datas.title,
				user: this.options.datas.user.username
			});
		},

		init: function(wrap) {
			this.$wrap = $(wrap);
			this.$wave = this.$wrap.find('.wave');
			var waveform = new Wave({
				container: this.$wave[0],
				innerColor: "#fff",
				datas: this.options.datas
			});

			this.$wrap.on({
				'click': function() {
					this.select();
				}.bind(this),
				'mouseover': function() {

				},
				'mouseout': function() {

				}
			});

			this.$wrap.find('button').on({
				'click': function(e) {
					debug('click button')
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
			this.$wrap.removeClass('playing');
			if(this.sound)
				this.sound.stop();
			this.events.stop.dispatch(this.sound);
		},

		select: function() {
			this.events.select.dispatch(this.options.datas);
			this.stop();
		}
	};

	return TrackResult;

});