define([

],
function() {

	var options = null,
		interval = null,
		sound = null,
		callbackPlay = null,
		callbackStop = null,
		isPlaying = null;

	
	Sound = function(options) {
		this.options = options;

		this.sound = null;
		this.isPlaying = false;
		this.bind_onPlaying = this.onPlaying.bind(this);
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
		},

		onPlay: function(sound) {
			if(typeof sound !== "undefined") {
				this.sound = sound;
			}
			debug(this.sound);
			this.sound.play();
			debug('!!!');
			debug(this.callbackPlay);
			if(this.callbackPlay)
				this.callbackPlay.call(null);
			// this.interval = setInterval(this.bind_onPlaying, 500);
		},

		onPlaying: function() {
			debug('onPlaying');
			console.log(this.sound);
		}
	};

	return Sound;
})