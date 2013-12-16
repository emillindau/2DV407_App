define(["baseview", "mustache", "goalview", "text!templates/goalsTemplate.html"], function(BaseView, Mustache, GoalView, goalsTemplate) {

	var GoalsView = BaseView.extend({

        template: Mustache.compile( goalsTemplate ),
        goalViews: [],

		initialize: function() {
            // Empty
            var that = this;
            this.collection.each(function(goal) {
                // Setting up localStorage
                goal.setUpStorage();
            });

            this.listenTo(this.collection, "sync", function() {
                that.render();
            });

            this.listenTo(this.collection, "destroy", function() {
                that.showMessage = true;
                that.message = {error: false, message: "The goal has been deleted! Great work!", header: "Deleted!"};
                that.render();
            });
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
                    this.goalViews.push(goalView);
					this.$el.append(goalView.render().el);
				}
			}, this);

            if(this.showMessage) {
                this.displayMessage(this.message);
            }

			return this;
		},

        dispose: function() {

            _.each(this.goalViews, function(view) {
                view.dispose();
            });

            this.stopListening();
            this.off();
        }
	});

	return GoalsView;

});
