define(["backbone", "goal"], function(Backbone, Goal){

	var Goals = Backbone.Collection.extend({
		model: Goal,
		localStorage: new Backbone.LocalStorage("Goals"),

		// Getting a specific goal by id
        // Turns out there is already a get(id) on Collection.. :)
		getGoalById: function(id) {
			return this.find(function(goal){
				return goal.id == id;
			});
		}

	});

	return Goals;

});