define([
	'mustache',
	'text!templates/ResultTrack.tpl',
	'lib/waveform'
], function(mustache, tpl_ResultTrack) {

	var options = null,
		$container = null,
		$wrap = null,
		$wave = null;

	TrackResult = function(options) {
		this.options = options;

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
		}
	};

	return TrackResult;

});