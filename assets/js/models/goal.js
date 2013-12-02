define(["backbone", "days", "day"], function(Backbone, Days, Day){

	var Goal = Backbone.Model.extend({

		defaults: {
			name: ""
		},

		// Validation using Backbone.Validation-plugin
		validation: {
			name: [
				{ required: true, msg: "Please enter name for goal" },
				{ rangeLength: [3, 50], msg: "Please choose a name between 3-50 characters"},
				{ pattern: "^[a-zåäöA-ZÅÄÖ]*$", msg: "Please enter valid characters (a-zåäöA-ZÅÄÖ0-9)"}
			]
		},

		initialize: function() {
			this.days = new Days();
			this.days.localStorage = new Backbone.LocalStorage("Days" + this.id);
		},

		// Helper for adding one to current day
		addDay: function(day) {
			// Adding to collection
            this.days = new Days();
            this.days.localStorage = new Backbone.LocalStorage("Days" + this.id);
            console.log("THIS LOCALSTORAGE: ", this.days.localStorage);
			this.days.create(day);
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