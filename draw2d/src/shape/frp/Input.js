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
    init: function(attr, setter, getter )
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

        // The Rx Subject that is created that will send out the reactive input events.
        this.subject = new Rx.Subject();

        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        // Create and output port that can be used to connect the element with other reactive elements.
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
        
    },

    getReactiveFunction: function () {
        return this.subject.asObservable();
    },

    removeReactiveFunction: function() {
        // No reactive input so do nothing.
    }
       
});
