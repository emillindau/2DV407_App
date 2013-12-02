define(["backbone", "mustache", "goal", "text!templates/goalFormTemplate.html"], function(Backbone, Mustache, Goal, goalFormTemplate){

	var AddGoalView = Backbone.View.extend({

		tagName: "form",
		className: "form-horizontal",
		template: Mustache.compile(goalFormTemplate),

		initialize: function() {

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

			this.model.setName(this.$("input#name").val());

			if(this.model.isValid(true)) {
                this.collection.create(this.model);
                // this.collection.sync("create", this.model);
                this.model.save();
			}
		}
	});

	return AddGoalView;

});