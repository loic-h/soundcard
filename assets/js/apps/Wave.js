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
		// if(this.options.top)
		// 	this.$wrap.css('top', this.options.top - 30);
	};

	Wave.prototype = {

		show: function() {
			this.$wave.show();
		},

		hide: function() {
			this.$wave.hide();
		},

		getWidth: function() {
			return this.$wave.width();
		}
	};

	return Wave;
});