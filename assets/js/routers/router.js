define(["backbone", "indexview", "editview", "specificgoalview", "aboutview"], function(Backbone, IndexView, EditView, SpecificGoalView, AboutView) {

	var Router = Backbone.Router.extend({

		// This is probably not that good of solution
        // so we'll leave it commented out
		/*
		views: (function() {
			var indexView = new IndexView();
			var editView = new EditView();

			return {
				index: function() {
					return indexView;
				},

				edit: function() {
					return editView;
				}
			};

		})(),
		*/

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

        // Mainpage, shows all goals and add-goal form
		index: function() {
			var view = new IndexView();
			this.el.empty();
			this.el.append(view.render().el);
		},

        // Shows a goal + days with edit privileges
		edit: function(goalId) {
			var view = new EditView( {goalId: goalId} );
			this.el.empty();
			this.el.append(view.render().el);
		},

        // Shows a specific goal
        goal: function(goalId) {
            var view = new SpecificGoalView( {goalId: goalId} );
            this.el.empty();
            this.el.append(view.render().el);
        },

        // 'static' about-page
        about: function() {
            var view = new AboutView();
            this.el.empty();
            this.el.append(view.render().el);
        }

	});

	return Router;

});