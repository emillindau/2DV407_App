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
            console.log("Hours: " + hours);
            if(hours > 24) {
                // Aw, it's been more than 24h
                return true;
            }
            return false;


            /*var test1 = new Date("2013-12-05");
            var test2 = new Date("2013-12-07");
            console.log("test1" + test1);
            console.log("test2" + test2);
            var diffTest = test2-test1;
            console.log(diffTest);
            var hoursTest = (diffTest / (1000*60*60));
            console.log("hoursTest: ", hoursTest);*/
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
                throw new TooFewElementsException("Collection need to have at least two elements");
            }

            function TooFewElementsException(message) {
                this.message = message;
                this.name = "TooFewElementsException";
            }
        }
	});

	return Days;

});