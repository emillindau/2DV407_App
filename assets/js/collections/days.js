define(["backbone", "day"], function(Backbone, Day) {

	var Days = Backbone.Collection.extend({
		model: Day,

		initialize: function(opt) {
			// this.localStorage = opt.localStorage;
		},

		/**
		 * Checks the last two days
		 * and sees if it's more than 24h between them
		 * @return boolean
		 */
		checkInvalidDay: function() {

			var lastDays = [];

			// Try and get the last two days, if any..
			try {
				lastDays = this.getLastTwoDays();
			} catch(e) {
				return false;
			}

			// If we get here we got two days to check against
			var d1 = new Date(lastDays[0].date());
			var d2 = new Date(lastDays[1].date());
			var diff = d1-d2;
			var hours = (diff / (1000*60*60));

			if(hours > 24) {
				// Aw, it's been more than 24h
				return true;
			}

			// Also, create a new date for today to check against last day
			var d3 = new Date();
			diff = d3-d1;
			hours = (diff / (1000*60*60));

			if(hours > 24) {
				return true;
			}

			return false;
		},

		/**
		 * the last two elements of this collection
		 * @throws TooFewElementsException if length < 2
		 * @returns {Array} Day
		 */
		getLastTwoDays: function() {
			if(this.length > 1) {
				return [this.at(this.length-1), this.at(this.length-2)];
			} else if(this.length > 0) {
				return [new Day(), this.at(0)];
			} else {
				throw new TooFewElementsException("Collection need to have at least one elements");
			}

			function TooFewElementsException(message) {
				this.message = message;
				this.name = "TooFewElementsException";
			}
		}
	});

	return Days;

});