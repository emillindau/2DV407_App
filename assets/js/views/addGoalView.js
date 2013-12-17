define(["backbone", "baseview", "mustache", "goal", "text!templates/goalFormTemplate.html"], function(Backbone, BaseView, Mustache, Goal, goalFormTemplate){

	var AddGoalView = BaseView.extend({

		template: Mustache.compile(goalFormTemplate),

		// The model will be set from indexView
		initialize: function() {
			this.listenTo(this.collection, "add", this.onAddGoal);
		},

		onAddGoal: function() {
			this.showMessage = true;
			this.message = {error: false, message: "The goal has been added! Now try and keep it non zero!", header: "Success!"};
			this.render();
		},

		events: {
			"submit": "submit"
		},

		render: function() {
			this.model = new Goal();

			// Binding the validation to this view
			Backbone.Validation.bind(this, {
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

			this.$el.html(this.template(this));

			if(this.showMessage) {
				this.displayMessage(this.message, ".messages");
			}

			return this;
		},

		// Callbacks from events
		submit: function(event) {
			event.preventDefault();

			// Set name to this model
			this.model.setName(this.$("input#name").val());

			// And if it's valid, add it to collection.
			if(this.model.isValid(true)) {
				this.collection.create(this.model);
			}
		},

		disposeSpecial: function() {
			Backbone.Validation.unbind(this);
		}
	});

	return AddGoalView;

});