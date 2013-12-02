/**
 * Created by Emil on 2013-12-02.
 */
define(["backbone", "mustache", "goals", "goal", "text!templates/specificGoalTemplate.html"], function(Backbone, Mustache, Goals, Goal, specificGoalTemplate) {

    var SpecificGoalView = Backbone.View.extend({

        template: Mustache.compile(specificGoalTemplate),

        initialize: function(opt) {
            this.goals = new Goals();
            this.goals.fetch();
            this.goal = this.goals.getGoalById(opt.goalId);
            this.goal.days.fetch();
        },

        render: function() {
            this.$el.html(this.template(this));
            return this;
        },

        // Populate view
        name: function() { return this.goal.name(); },
        count: function() { return this.goal.days.length; }

    });

    return SpecificGoalView;

});