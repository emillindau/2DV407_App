var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

	paths: {
		"purebackbone": "js/libs/backbone/backbone.dev",
        "jquery": "js/libs/jquery-2.0.3.min",
		"backbone.localStorage": "js/libs/backbone/backbone.localStorage",
		"backbone-validation": "js/libs/backbone/backbone-validation-min",
		"backbone.rel": "js/libs/backbone/backbone.rel",
		"underscore": "js/libs/underscore",
        "goal": "js/models/goal",
        "backbone": "js/libs/backbone/backbone",
        "day": "js/models/day",
        "days": "js/collections/days"
	},

	shim: {
		"underscore": {
			exports: "_"
		},
		"purebackbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"backbone.localStorage": ["purebackbone", "underscore"],
		"backbone-validation": ["purebackbone", "underscore"],
		"backbone.rel": ["purebackbone", "underscore"]
	},

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});