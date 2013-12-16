/**
 * Created by Emil on 2013-12-02.
 */
define(["baseview", "mustache", "text!templates/aboutTemplate.html"], function(BaseView, Mustache, aboutTemplate) {

    var AboutView = BaseView.extend({

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