define(["backbone", "indexview", "editview", "specificgoalview", "aboutview"], function(Backbone, IndexView, EditView, SpecificGoalView, AboutView) {

	var Router = Backbone.Router.extend({

        view: {},

        // Thats probably main residing in opt, but could be any element
		initialize: function(opt) {
			this.el = opt.el;
		},

        // The routes
		routes: {
			"": "index",
			"edit/:goalId": "edit",
            "goal/:goalId": "goal",
            "about": "about"
		},

        changeView: function(newView) {

            // Not all views, as of now, has the dispose-function
            if(typeof this.view.dispose === "function") {
                this.view.dispose();
            }
            this.view = newView;
        },

        // Mainpage, shows all goals and add-goal form
		index: function() {
            this.changeView(new IndexView());
			// var view = new IndexView();
			this.el.empty();
			this.el.append(this.view.render().el);
		},

        // Shows a goal + days with edit privileges
		edit: function(goalId) {
            this.changeView(new EditView({ goalId: goalId} ));
			// var view = new EditView( {goalId: goalId} );
			this.el.empty();
			this.el.append(this.view.render().el);
		},

        // Shows a specific goal
        goal: function(goalId) {
            //var view = new SpecificGoalView( {goalId: goalId} );
            this.changeView(new SpecificGoalView( {goalId: goalId} ));
            this.el.empty();
            this.el.append(this.view.render().el);
        },

        // 'static' about-page
        about: function() {
            //var view = new AboutView();
            this.changeView(new AboutView());
            this.el.empty();
            this.el.append(this.view.render().el);
        }

	});

	return Router;

});