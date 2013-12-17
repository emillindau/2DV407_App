/**
 * Created by Emil on 2013-12-17.
 */
define(["backbone", "baseview", "mustache", "day", "text!templates/dayFormTemplate.html"], function(Backbone, BaseView, Mustache, Day, dayFormTemplate){

    var AddDayView = BaseView.extend({

        template: Mustache.compile(dayFormTemplate),

        // The model will be set from indexView
        initialize: function() {
            this.day = new Day();
            this.listenTo(this.collection, "add", this.onAddDay);
        },

        onAddDay: function() {
            this.showMessage = true;
            this.message = {error: false, message: "The goal has been added! Now try and keep it non zero!", header: "Success!"};
        },

        events: {
            "submit": "submit"
        },

        render: function() {

            // Binding the validation to this view
            var that = this;
            Backbone.Validation.bind(this, {
                model: that.day,
                valid: function(view, attr) {
                    var $el = view.$("[name=" + attr + "]"),
                        $group = $el.closest(".form-group");

                    $group.removeClass("has-error");
                    $group.find(".day-help-block").html("").addClass("hidden");
                },

                invalid: function(view, attr, error) {
                    var $el = view.$("[name=" + attr + "]"),
                        $group = $el.closest(".form-group");

                    $group.addClass("has-error");
                    $group.find(".day-help-block").html(error).removeClass("hidden");

                }
            });

            this.$el.html(this.template(this));

            if(this.showMessage) {
                this.displayMessage(this.message, ".messages");
            }

            return this;
        },

        // Callbacks from events
        submit: function(event) {
            console.log("Submitting!!!");
            event.preventDefault();

            console.log("Submitting!!!");
            this.day = new Day();
            this.day.set("descr", this.$("input#descr").val());

            if(this.day.isValid(true)) {
                // Add day, with descr to this goal
                this.model.addDay(this.day);
            }
        },

        disposeSpecial: function() {
            Backbone.Validation.unbind(this);
        }
    });

    return AddDayView;

});