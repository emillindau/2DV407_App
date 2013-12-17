define(["baseview", "mustache", "dayview", "adddayview", "text!templates/daysTemplate.html"], function(BaseView, Mustache, DayView, AddDayView, daysTemplate) {

	var DaysView = BaseView.extend({

        template: Mustache.compile( daysTemplate ),
		subViews: [],

		initialize: function() {
            this.addDayView = new AddDayView( { collection: this.collection, model: this.model } );
            this.subViews.push(this.addDayView);

            this.listenTo(this.collection, "sync", this.onDaysSync);
		},

        onDaysSync: function() {
            this.render();
        },

		render: function() {
            this.$el.html(this.template(this));
            this.assign(this.addDayView, ".addDay");
            // this.$el.append(this.addDayView.render().el);

			this.collection.each(function(day){
				if(day.isValid(true)) {
					var dayView = new DayView({model: day});
					this.subViews.push(dayView);
					this.$el.append(dayView.render().el);
				}

			}, this);

			return this;
		}
	});

	return DaysView;

});