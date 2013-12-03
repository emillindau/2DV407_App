define(["backbone", "mustache", "goalview", "days"], function(Backbone, Mustache, GoalView, Days) {

	var GoalsView = Backbone.View.extend({

		initialize: function() {
            // Empty
            var that = this;
            this.collection.each(function(goal) {

                //goal.days = new Days();
                //goal.days.localStorage = new Backbone.LocalStorage("Days" + goal.id);
                //goal.days.fetch();
                goal.setUpStorage();
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
		}
	});

	return GoalsView;

});
