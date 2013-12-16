/**
 * Created by Emil on 2013-12-02.
 */
define(["baseview", "mustache", "goals", "goal", "daysview", "text!templates/specificGoalTemplate.html"], function(BaseView, Mustache, Goals, Goal, DaysView, specificGoalTemplate) {

    var SpecificGoalView = BaseView.extend({

        template: Mustache.compile(specificGoalTemplate),

        initialize: function(opt) {
            this.goals = new Goals();
            this.goals.fetch();
            this.goal = this.goals.getGoalById(opt.goalId);
            this.goal.setUpStorage();
        },

        render: function() {
            this.$el.html(this.template(this));

            // Subviews, same as editView here
            var daysView = new DaysView( { collection: this.goal.days } );
            this.$(".days").append(daysView.render().el);

            return this;
        },

        // Populate view
        name: function() { return this.goal.name(); },
        count: function() { return this.goal.days.length; },
        rank: function() {
            var r = this.goal.getLevel().alias;
            return r + ".png";
        }

    });

    return SpecificGoalView;

});