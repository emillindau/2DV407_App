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

		displayMessage: function(message, selector) {
			this.messageView.setMessage(message);
			this.assign(this.messageView, selector);
			this.showMessage = false;
		},

		dispose: function() {

			console.log("-- DISPOSING --", this);

			if(this.subViews) {
				_.each(this.subViews, function(v) {
					v.dispose();
				});
			}

			this.stopListening();
			this.off();
			this.undelegateEvents();
			this.remove();

			if(typeof this.disposeSpecial === "function") {
				this.disposeSpecial();
			}
		}

	});

	return BaseView;

});