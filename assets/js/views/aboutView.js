/**
 * Created by Emil on 2013-12-02.
 */
define(["backbone", "mustache", "text!templates/aboutTemplate.html"], function(Backbone, Mustache, aboutTemplate) {

    var AboutView = Backbone.View.extend({

        template: Mustache.compile(aboutTemplate),

        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template(this));
            return this;
        }
    });

    return AboutView;

});