define([
	'apps/Wave',
	'signals'
],
function(Wave, signals) {

	var options = null,
		interval = null,
		sound = null,
		callbackPlay = null,
		callbackStop = null,
		isPlaying = null,
		wave = null,
		$cursor = null;

	
	Sound = function(options) {
		this.options = options;

		this.sound = null;
		this.isPlaying = false;
		this.bind_onPlaying = this.onPlaying.bind(this);

		this.events = {
			play: new signals.Signal(),
			stop: new signals.Signal()
		};

		this.initWave();
	};

	Sound.prototype = {
		play: function(callback) {
			this.callbackPlay = callback;
			if(this.sound) {
				this.onPlay.call(this);
			}
			else {
				SC.stream('/tracks/'+this.options.datas.id, this.onPlay.bind(this));
			}
			this.isPlaying = true;
			this.events.play.dispatch();
		},

		stop: function(callback) {
			if(this.sound)
				this.sound.stop();
			if(callback) {
				this.callbackStop = callback;
				this.callbackStop.call(null);
			}
			this.isPlaying = false;
			clearInterval(this.interval);
			this.events.stop.dispatch();
			this.$cursor.hide();
		},

		onPlay: function(sound) {
			if(typeof sound !== "undefined") {
				this.sound = sound;
			}
			this.sound.play();
			if(this.callbackPlay)
				this.callbackPlay.call(null);
			this.$cursor.show();
			this.moveCursor(0);
			this.interval = setInterval(this.bind_onPlaying, 500);

		},

		onPlaying: function() {
			this.moveCursor(this.sound.position);
		},

		initWave: function() {
			this.options.wave.datas = this.options.datas;
			this.wave = new Wave(this.options.wave);
			this.waveWidth = this.wave.getWidth();
			this.$cursor = this.wave.$wrap.find('.cursor');
		},

		moveCursor: function(value) {
			var left = value * this.waveWidth / this.sound.duration;
			this.$cursor.css('left', left);
		}
	};

	return Sound;
})