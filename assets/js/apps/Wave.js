define([
	'lib/waveform'
], function() {

	var waveform = null;

	Wave = function(options) {
		this.options = options;
		this.waveform = new Waveform({
			container: this.options.container,
			innerColor: this.options.innerColor
		});
		this.waveform.dataFromSoundCloudTrack(this.options.datas);
	};

	Wave.prototype = {

		show: function() {
			$(this.waveform.canvas).show();
		},

		hide: function() {
			$(this.waveform.canvas).hide();
		}
	};

	return Wave;
});