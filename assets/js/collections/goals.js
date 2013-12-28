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
		},

        // Just a simple check if the goalname is already existing
        isPresent: function(name) {
            var found = this.find(function(goal) {
                return goal.get("name") == name;
            });

            if(found)
                return true;
            return false;
        }

	});

	return Goals;

});