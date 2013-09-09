require.config({
	paths: {
		"domReady": "lib/require/plugins/domReady",
		"text": "lib/require/lib/text",
		"json": "lib/require/plugins/json",
		"async": "lib/require/plugins/async",
		"propertyParser" : 'lib/require/plugins/propertyParser',
		"signals": "lib/signals",
		"crossroads": "lib/crossroads",
		"hasher": "lib/hasher",
		"jquery": "lib/jquery/js/jquery-1.8.3",
		"root": "../..",
		"mustache": "lib/mustache",
		"templates": "../templates"
		// "soundcloud": "http://connect.soundcloud.com/sdk"
	},
	deps: [
		"lib/augment",
		"lib/utils"
	]
});

require([
	'domReady', 
	'App'
	// 'apps/Resize'
], function (domReady, App, Resize) {
	domReady(function() {
		App.startup();
		// Resize.trigger();
	});
});