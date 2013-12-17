define(["backbone", "baseview", "mustache", "goals", "goal", "daysview", "text!templates/editTemplate.html", "messageview"], function(Backbone, BaseView, Mustache, Goals, Goal, DaysView, editTemplate, MessageView) {

	var EditView = BaseView.extend({

		template: Mustache.compile(editTemplate),
		showMessage: false,
		message: {},

		initialize: function(opt) {
			// Getting the appropiate collections
			this.goals = new Goals();
			this.goals.fetch();
			this.goal = this.goals.getGoalById(opt.goalId);
			this.goal.setUpStorage();

			this.listenTo(this.goal, "sync", this.onGoalSync);

			this.daysView = new DaysView( { collection: this.goal.days, model: this.goal } );
		},

		onGoalSync: function() {
			this.showMessage = true;
			this.message = {error: false, message: "The goal has been edited and saved! Keep working!", header: "Success!"};
			this.render();
		},

		events: {
			"submit": "submit"
		},

		render: function() {

			this.$el.html(this.template(this));

			// Subviews, in this case daysview
			this.assign(this.daysView, ".days");

			if(this.showMessage) {
				this.displayMessage(this.message, ".messages");
			}

			// Binding the validation to this view
			var that = this;
			Backbone.Validation.bind(this, {
				model: that.goal,
				valid: function(view, attr) {
					var $el = view.$("[name=" + attr + "]"),
						$group = $el.closest(".form-group");

					$group.removeClass("has-error");
					$group.find(".help-block").html("").addClass("hidden");
				},
				invalid: function(view, attr, error) {
					var $el = view.$("[name=" + attr + "]"),
						$group = $el.closest(".form-group");

					$group.addClass("has-error");
					$group.find(".help-block").html(error).removeClass("hidden");
				}
			});

			return this;
		},

		submit: function(event) {
			event.preventDefault();

			this.goal.setName(this.$("input#name").val());

			if(this.goal.isValid(true)) {
				this.goal.save();
			}
		},

		// View helpers for populating templates
		name: function() { return this.goal.name(); },
		count: function() { return this.goal.days.length; }
	});

	return EditView;

});