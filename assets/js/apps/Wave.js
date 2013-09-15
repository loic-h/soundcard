/*
 *	Wave.js
 *
 *	Wave object. Create wave canvas from soundcloud informations.
 *	Use the waveform.js library (http://waveformjs.org/)
 *
 *	@ Loïc Hamet
 */
 

define([
	'mustache',
	'text!templates/wave.tpl',
	'lib/waveform'
], function(mustache, tpl_wave) {

	var waveform = null;

	Wave = function(options) {
		this.options = options;
		this.$wrap = $(mustache.render(tpl_wave));
		$(this.options.container).append(this.$wrap);
		this.waveform = new Waveform({
			container: this.$wrap[0],
			innerColor: this.options.innerColor
		});
		this.$wave = $(this.waveform.canvas);
		this.waveform.dataFromSoundCloudTrack(this.options.datas);
	};

	Wave.prototype = {

		show: function() {
			this.$wrap.show();
		},

		hide: function() {
			this.$wrap.hide();
		},

		getWidth: function() {
			return this.$wave.width();
		}
	};

	return Wave;
});