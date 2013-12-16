/**
 * Created by Emil on 2013-12-16.
 */
define(["backbone", "mustache", "messageview"], function(Backbone, Mustache, MessageView) {

    var BaseView = Backbone.View.extend({

        messageView: new MessageView(),
        showMessage: false,
        message: {},

        assign: function(view, selector) {
            view.setElement(this.$(selector)).render();
        },

        displayMessage: function(message) {
            this.messageView.setMessage(message);
            this.assign(this.messageView, ".messages");
            this.showMessage = false;
        }

    });

    return BaseView;

});