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
			this.$addButton = this.$wrap.find('.add');
			// var waveform = new Wave({
			// 	container: this.$wave[0],
			// 	innerColor: "#fff",
			// 	datas: this.options.datas
			// });

			this.sound = new Sound({
				datas: this.options.datas,
				wave: {
					container: this.$wave[0],
					innerColor: "#fff"
				}
			});

			this.$addButton.on({
				'click': function() {
					this.select();
				}.bind(this)
				// 'mouseover': function() {
				// 	this.$addButton.addClass('over');
				// }.bind(this),
				// 'mouseout': function() {
				// 	this.$addButton.removeClass('over');
				// }.bind(this)
			});

			this.$wrap.find('button.play').on({
				'click': function(e) {
					debug('click button')
					if(!this.$wrap.hasClass('playing')) {
						debug(1);
						this.play();
					}
					else {
						debug(2);
						this.stop();
					}
					e.stopPropagation();
				}.bind(this)
			});
		},

		play: function() {
			debug('TrackResult::plzy');
			this.$wrap.addClass('playing');
			this.sound.play(function() {
				this.events.play.dispatch();
			}.bind(this));
			this.playingSound = this.sound;
		},

		stop: function() {
			debug('TrackResult::stop');
			this.$wrap.removeClass('playing');
			if(this.sound)
				this.sound.stop();
			this.events.stop.dispatch(this.sound);
		},

		select: function() {
			debug('trackResult::select')
			this.events.select.dispatch(this.options.datas);
			this.stop();
		},

		getSound: function() {
			return this.sound;
		}
	};

	return TrackResult;

});