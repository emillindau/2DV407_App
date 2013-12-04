define(["backbone", "mustache", "goalview"], function(Backbone, Mustache, GoalView) {

	var GoalsView = Backbone.View.extend({

		initialize: function() {
            // Empty
            var that = this;
            this.collection.each(function(goal) {

                // Setting up localStorage
                goal.setUpStorage();
                // Listen to sync and re-render
                that.listenTo(goal.days, "sync", function() {
                    that.render();
                });
            });
		},

		render: function() {
            this.$el.empty();
            // Render each goal as a subview and appending
			this.collection.each(function(goal) {
                // Well.. You can never be to sure!
				if(goal.isValid(true)) {
					var goalView = new GoalView({model: goal});
					this.$el.append(goalView.render().el);
				}
			}, this);
			return this;
		},

        dispose: function() {
            this.stopListening();
            this.off();
        }
	});

	return GoalsView;

});
