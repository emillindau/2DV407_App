define(["baseview", "mustache", "text!templates/dayTemplate.html"], function(BaseView, Mustache, dayTemplate) {

	var DayView = BaseView.extend({

		template: Mustache.compile(dayTemplate),

		initialize: function() {

		},

		events: {

		},

		render: function() {
			this.$el.html(this.template(this));
			return this;
		},

		// Callbacks

		// Populate view
		descr: function() { return this.model.get("descr"); },
		date: function() {
            var formatedDate = new Date(this.model.get("date")).toLocaleString();
            return formatedDate;
        },

        dispose: function() {

        }
	});

	return DayView;

});