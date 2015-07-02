/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.frp.Input
 * Implements the basic reactive input elements
 * 
 * @author Kevin Noppe
 * 
 * @extends draw2d.shape.basic.Trapezoid
 */
draw2d.shape.frp.Input = draw2d.shape.basic.Trapezoid.extend({

    NAME: "draw2d.shape.frp.Input",

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

        // The Rx Subject that is created that will send out the reactive 
        // input events.
        //this.subject = new Rx.Subject();

        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        // Change the standard selection policy, it has an annoying tendency to resize
        // the nodes instead of connecting them.
        this.installEditPolicy(
            new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
    },

    getReactiveOutput: function (targetId, target) {
        //return this.inputNode.getReactiveOutput(targetId, target);
    },

    removeReactiveSubscriber: function (subscriber) {
        //this.inputNode.removeReactiveSubscriber(subscriber);
    },

    setDebugger: function (debug) {
        //this.inputNode.setDebugger(debug);
    },

    getCode: function () {
    },

    /**
     * Code that needs to be executed when removing the node.
     * Should be implemented by the necessary nodes.
     */
    remove: function () { },

    /**
     * Get the reactive type of this figure, used to create the model
     * and execute the right reactive functions. Should be defined in 
     * all subclasses.
     */
    getReactiveType: function () {
        return this.reactiveFunction;
    },

    getControlNode: function () {
        return this.controlNode;
    }
       
});
