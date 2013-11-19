define(["backbone", "backbone-validation"], function(Backbone){

	var Goal = Backbone.Model.extend({

		defaults: {
			name: "",
			days: 0
		},

		// Validation using Backbone.Validation-plugin
		validation: {
			name: [
				{ required: true, msg: "Please enter name for goal" },
				{ rangeLength: [3, 50], msg: "Please choose a name between 3-50 characters"},
				{ pattern: "^[a-zåäöA-ZÅÄÖ]*$", msg: "Please enter valid characters (a-zåäöA-ZÅÄÖ0-9)"}
			],
			days: {
				min: 0,
				msg: "Days must be greater than zero"
			}
		},

		initialize: function() {
		},

		// Helper for adding one to current day
		addDay: function() {
			var currentDays = this.get("days");
			currentDays++;
			this.set("days", currentDays);
		},

		// Setters
		setName: function(newName) {
			this.set("name", newName);
		},

		// Just for convenience
		name: function() { return this.get("name"); },
		days: function() { return this.get("days"); }

	});

	return Goal;

});