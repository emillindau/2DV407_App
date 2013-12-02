define(["backbone", "mustache", "goals", "addgoalview", "goalsview", "goal", "text!templates/indexTemplate.html"], function(Backbone, Mustache, Goals, AddGoalView, GoalsView, Goal, indexTemplate) {

	var IndexView = Backbone.View.extend({

		template: Mustache.compile( indexTemplate ),

		initialize: function() {

			// The collection
			this.goals = new Goals();
			this.goals.on("sync", this.render, this);
			this.goals.on("change", this.render, this);
			this.goals.on("destroy", this.render, this);
            this.goals.fetch();

			// Subcollection
            var that = this;
			this.goals.each(function(goal) {
				goal.days.on("sync", that.render, that);
				goal.days.on("change", that.render, that);
				goal.days.on("destroy", that.render, that);
				goal.days.fetch();
			}, this);
		},

		render: function() {
			this.$el.html(this.template(this));

			// Subviews that are supposed to show in this view
			var addGoalView = new AddGoalView( {collection: this.goals, model: new Goal()} );
			var goalsView = new GoalsView( {collection: this.goals} );

			// Render and append the views element (el)
			this.$(".addGoal").append(addGoalView.render().el);
			this.$(".goals").append(goalsView.render().el);

			return this;
		},

		// View helpers for populating templates
		count: function() {
			return this.goals.length;
		}
	});

	return IndexView;

});