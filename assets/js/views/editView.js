define(["backbone", "mustache", "goals", "goal", "daysview", "text!templates/editTemplate.html", "messageview"], function(Backbone, Mustache, Goals, Goal, DaysView, editTemplate, MessageView) {

	var EditView = Backbone.View.extend({

        tagName: "form",
        className: "form-horizontal",
		template: Mustache.compile(editTemplate),
        showMessage: false,
        message: {},

		initialize: function(opt) {
            // Getting the appropiate collections
			this.goals = new Goals();
			this.goals.fetch();
			this.goal = this.goals.getGoalById(opt.goalId);
            this.goal.setUpStorage();

            var that = this;
            this.listenTo(this.goal, "change", function() {
                that.showMessage = true;
                that.message = {error: false, message: "The goal has been edited and saved! Keep working!", header: "Success!"};
                that.render();
            })
		},

        events: {
            "submit": "submit"
        },

		render: function() {
			this.$el.html(this.template(this));

			// Subviews, in this case daysview
			var daysView = new DaysView( { collection: this.goal.days } );
			this.$(".days").append(daysView.render().el);

            if(this.showMessage) {
                var messageView = new MessageView(this.message);
                this.$(".messages").append(messageView.render().el);
                this.showMessage = false;
            }

			return this;
		},

        submit: function(event) {
            event.preventDefault();

            this.goal.setName(this.$("input#name").val());

            if(this.goal.isValid(true)) {
                this.goal.save();
            }
        },

		// View helpers for populating templates
		name: function() { return this.goal.name(); },
		count: function() { return this.goal.days.length; }
	});

	return EditView;

});