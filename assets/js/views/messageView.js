/**
 * Created by Emil on 2013-12-03.
 */
define(["backbone", "mustache", "text!templates/messagesTemplate.html"], function(Backbone, Mustache, messagesTemplate) {

	var MessageView = Backbone.View.extend({

		template: Mustache.compile( messagesTemplate ),
		header: "",
		error: true,
		message: "",

		events: {
			"click button.close": "dismiss"
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html(this.template(this));
			return this;
		},

		setMessage: function(opt) {
			this.header = opt.header;
			this.error = opt.error;
			this.message = opt.message;

			var that = this;
			setTimeout( function() {
				that.dismiss();
			}, 3000);
		},

		// Callbacks
		dismiss: function() {
			this.$(".alert").hide("slow", function() {

			});
		},

		// Populate view
		error: function() {
			return this.error;
		},

		header: function() {
			return this.header;
		},

		message: function() {
			return this.message;
		}

	});

	return MessageView;

});