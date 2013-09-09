define([
	'mustache',
	'text!templates/ResultTrack.tpl'
], function(mustache, tpl_ResultTrack) {

	var options = null,
		$container = null;

	TrackResult = function(options) {
		debug('TrackResul::initialize');
		this.options = options;
	};

	TrackResult.prototype = {
		getNode: function() {
			return mustache.render(tpl_ResultTrack);
		}
	};

	return TrackResult;

});