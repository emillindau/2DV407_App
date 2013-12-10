define(["backbone", "mustache", "goals", "addgoalview", "goalsview", "goal", "text!templates/indexTemplate.html", "messageview"],
    function(Backbone, Mustache, Goals, AddGoalView, GoalsView, Goal, indexTemplate, MessageView) {

	var IndexView = Backbone.View.extend({

		template: Mustache.compile( indexTemplate ),
        showMessage: false,
        message: {},

		initialize: function() {

            var that = this;

			// The collection
			this.goals = new Goals();
            this.listenTo(this.goals, "sync", function() {
                that.render();
            });

            this.goals.fetch();

            // For showing messages
            this.listenTo(this.goals, "add", function() {
                that.showMessage = true;
                that.message = {error: false, message: "The goal has been added! Now try and keep it non zero!", header: "Success!"};
            });

            this.listenTo(this.goals, "destroy", this.render);
		},

		render: function() {
			this.$el.html(this.template(this));

			// Subviews that are supposed to show in this view
			var addGoalView = new AddGoalView( {collection: this.goals, model: new Goal()} );

			// Render and append the views element (el)
			this.$(".addGoal").append(addGoalView.render().el);

            var goalsView = new GoalsView( {collection: this.goals} );
			this.$(".goals").append(goalsView.render().el);

            if(this.showMessage) {
                var messageView = new MessageView(this.message);
                this.$(".messages").append(messageView.render().el);
                this.showMessage = false;
            }

			return this;
		},

		// View helpers for populating templates
		count: function() {
			return this.goals.length;
		},

        // Disposing of callbacks
        dispose: function() {
            this.stopListening();
            this.off();
        }

	});

	return IndexView;

});