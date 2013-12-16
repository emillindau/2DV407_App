define(["baseview", "mustache", "dayview"], function(BaseView, Mustache, DayView) {

	var DaysView = BaseView.extend({

        dayViews: [],

		initialize: function() {

		},

		render: function() {
			this.collection.each(function(day){
				if(day.isValid(true)) {
					var dayView = new DayView({model: day});
                    this.dayViews.push(dayView);
					this.$el.append(dayView.render().el);
				}

			}, this);

			return this;
		},

        dispose: function() {
            _.each(this.dayViews, function(view) {
                view.dispose();
            });
        }
	});

	return DaysView;

});