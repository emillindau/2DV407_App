define(["backbone", "mustache", "goal", "text!templates/goalFormTemplate.html"], function(Backbone, Mustache, Goal, goalFormTemplate){

	var AddGoalView = Backbone.View.extend({

		tagName: "form",
		className: "form-horizontal",
		template: Mustache.compile(goalFormTemplate),

        // The model will be set from indexView
		initialize: function() {
            // Empty
		},

		events: {
			"submit": "submit"
		},

		render: function() {
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

        dispose: function() {
            Backbone.Validation.unbind(this);
        }
	});

	return AddGoalView;

});