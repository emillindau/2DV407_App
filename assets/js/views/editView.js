define(["backbone", "mustache", "goals", "goal", "daysview", "text!templates/editTemplate.html"], function(Backbone, Mustache, Goals, Goal, DaysView, editTemplate) {

	var EditView = Backbone.View.extend({

        tagName: "form",
        className: "form-horizontal",
		template: Mustache.compile(editTemplate),

		initialize: function(opt) {
            // Getting the appropiate collections
			this.goals = new Goals();
			this.goals.fetch();
			this.goal = this.goals.getGoalById(opt.goalId);
            this.goal.setUpStorage();
		},

        events: {
            "submit": "submit"
        },

		render: function() {
			this.$el.html(this.template(this));

			// Subviews, in this case daysview
			var daysView = new DaysView( { collection: this.goal.days } );
			this.$(".days").append(daysView.render().el);

			return this;
		},

        submit: function(event) {
            event.preventDefault();

            this.goal.setName(this.$("input#name").val());

            if(this.goal.isValid(true)) {
                this.goal.save();
                // TODO: Should also display a correct message
            }
        },

		// View helpers for populating templates
		name: function() { return this.goal.name(); },
		count: function() { return this.goal.days.length; }
	});

	return EditView;

});