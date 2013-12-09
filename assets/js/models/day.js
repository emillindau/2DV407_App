define(["backbone"], function(Backbone) {

	var Day = Backbone.Model.extend({

		defaults: function() {
            return {
                descr: "",
                date: new Date()
            };
		},

		validation: {
			descr: [
				{ required: true, msg: "Please enter name for goal" },
				{ rangeLength: [3, 50], msg: "Please choose a name between 3-50 characters"},
				{ pattern: "^[a-zåäöA-ZÅÄÖ]*$", msg: "Please enter valid characters (a-zåäöA-ZÅÄÖ0-9)"}
			]
		},

		initialize: function() {
			console.log("day init");
            // console.log(typeof this.get("date"));
            // console.log(typeof this.date());
		},

        date: function() { return this.get("date") }

	});

	return Day;

});