/**
 * @class draw2d.shape.frp.Action
 *
 * @extends draw2d.shape.basic.Diamond
 */
draw2d.shape.frp.Action = draw2d.shape.basic.Hexagon.extend({

	NAME: "draw2d.shape.frp.Action",
	
    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter)
    {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        this._super($.extend({
            bgColor: this.bgColor,
            stroke: 2,
            radius: 2,
            color: this.darkerBgColor,
            width: 150,
            height: 100
        }, attr), setter, getter);

        this.reactiveFunction = null;

        this.bgColor = new draw2d.util.Color("#f3f3f3"); 
        this.lighterBgColor= this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        // Change the standard selection policy, it has an annoying tendency to resize
        // the nodes instead of connecting them.
        this.installEditPolicy(
            new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
    },

    setSubscriberFunction: function (text) {
        this.actionNode.setSubscriberFunction(text);
    },

    /**
     * @method Set the new filter for the reactive element
     * 
     * @param newFilter The new filter to be used by the reactive element.
     */
    setActionFunction: function (newAction) {
        this.actionNode.setActionFunction(newAction);
    },

    setReactiveInput: function (observableId, observable, pauser) {
        this.actionNode.setReactiveInput(observableId, observable, pauser);
    },

    setInput: function (observable) {
        this.actionNode.setInput(observable);
    },

    removeReactiveInput: function (inputId) {
        this.actionNode.removeReactiveInput(inputId);
    },

    getReactiveOutput: function (targetId, target) {
        var o = this.reactiveFunction;
        return this.actionNode.getReactiveOutput(targetId, target);
    },

    removeReactiveSubscriber: function (subscriberId) {
        this.actionNode.removeReactiveSubscriber(subscriberId);
    },

    getCode: function (varName) {
        return this.actionNode.getCode(varName);
    },

    /**
     * Code that needs to be executed when removing the node.
     * Should be implemented by the necessary nodes.
     */
    remove: function () {}
});
