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
                that.message = {error: false, message: "success!!", header: "hello!"};
            });

            this.listenTo(this.goals, "destroy", this.render);

			// this.goals.on("sync", this.render, this);
			// this.goals.on("change", this.render, this);
			// this.goals.on("destroy", this.render, this);


			// Subcollection for every goal, days

			// this.goals.each(function(goal) {
			//	goal.days.on("sync", that.render, that);
			//	goal.days.on("change", that.render, that);
			//	goal.days.on("destroy", that.render, that);
			//	goal.days.fetch();
//
  //              that.listenTo(goal.days, "add", function() {
    //                that.showMessage = true;
      //              that.message = {error: false, message: "success!!", header: "hello!"};
        //            console.log("We got here!!");
          //          that.render();
            //    });

			//}, this);
		},

		render: function() {
			this.$el.html(this.template(this));

			// Subviews that are supposed to show in this view
			var addGoalView = new AddGoalView( {collection: this.goals, model: new Goal()} );
			var goalsView = new GoalsView( {collection: this.goals} );


			// Render and append the views element (el)
			this.$(".addGoal").append(addGoalView.render().el);
			this.$(".goals").append(goalsView.render().el);

            if(this.showMessage) {
                var messageView = new MessageView(this.message);
                this.$el.append(messageView.render().el);
                console.log("Well, we got here");
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