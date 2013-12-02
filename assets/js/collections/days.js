define(["backbone", "day"], function(Backbone, Day) {

	var Days = Backbone.Collection.extend({
		model: Day,

        initialize: function(opt) {
            // this.localStorage = opt.localStorage;
        }
	});

	return Days;

});