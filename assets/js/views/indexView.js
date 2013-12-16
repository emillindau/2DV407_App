define(["mustache", "goals", "addgoalview", "goalsview", "goal", "text!templates/indexTemplate.html", "baseview"],
    function(Mustache, Goals, AddGoalView, GoalsView, Goal, indexTemplate, BaseView) {

	var IndexView = BaseView.extend({

		template: Mustache.compile( indexTemplate ),

		initialize: function() {

			// The collection
			this.goals = new Goals();
            this.goals.fetch();

            this.addGoalView = new AddGoalView( {collection: this.goals, model: new Goal()} );
            this.goalsView = new GoalsView( {collection: this.goals} );
		},

		render: function() {
			this.$el.html(this.template(this));

            this.assign(this.addGoalView, ".addGoal");
            this.assign(this.goalsView, ".goals");

			return this;
		},

		// View helpers for populating templates
		count: function() {
			return this.goals.length;
		},

        // Disposing of callbacks
        dispose: function() {
            this.addGoalView.dispose();
            this.goalsView.dispose();
            this.stopListening();
            this.off();
        }

	});

	return IndexView;

});