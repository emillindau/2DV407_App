define(["baseview", "mustache", "goalview", "text!templates/goalsTemplate.html"], function(BaseView, Mustache, GoalView, goalsTemplate) {

	var GoalsView = BaseView.extend({

		template: Mustache.compile( goalsTemplate ),
		subViews: [],

		initialize: function() {
			this.collection.each(function(goal) {
				// Setting up localStorage
				goal.setUpStorage();
			});

			this.listenTo(this.collection, "sync", this.render);
			this.listenTo(this.collection, "destroy", this.onDeleteGoal);
		},

		onDeleteGoal: function() {
			this.showMessage = true;
			this.message = {error: false, message: "The goal has been deleted! Great work!", header: "Deleted!"};
			this.render();
		},

		render: function() {

			this.$el.html(this.template(this));
			// Render each goal as a subview and appending
			this.collection.each(function(goal) {
				// Well.. You can never be to sure!
				goal.setUpStorage();
				if(goal.isValid(true)) {
					var goalView = new GoalView({model: goal});
					// Just for reference later
					this.subViews.push(goalView);
					this.$el.append(goalView.render().el);
				}
			}, this);

			if(this.showMessage) {
				this.displayMessage(this.message, ".deletemessage");
			}

			return this;
		}

	});

	return GoalsView;

});
