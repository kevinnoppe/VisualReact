/**
 * @class draw2d.shape.frp.Input
 * 
 * @extends draw2d.shape.basic.Hexagon
 */
draw2d.shape.frp.BasicInput = draw2d.shape.basic.Trapezoid.extend({

    NAME: "draw2d.shape.frp.BasicInput",

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
            width: 100,
            height: 30
        }, attr), setter, getter);

        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        this.vert = new draw2d.shape.layout.VerticalLayout();

        //this.inputBox = new draw2d.shape.basic.Label();

        //$(document).keyUpAsObservable.map(function(key) {alert(key.keyCode)});

        this.typeLabel = new draw2d.shape.basic.Label({ text: "Activity Name", color: this.darkerBgColor, bgColor: null });
        this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.vert.add(this.typeLabel);

        this.reactiveFunction = Rx.Observable.timer(1000, 1000).
        map(function (x) {
            return Math.ceil(Math.random() * 5);
        });
        
        //this.reactiveFunction.subscribe(
        //    function (x) {
        //        console.log("Input tick " + x);
        //    });
            //$keys = $(document).keyUpAsObservable();
            //$keys.subscribe(function (x) {
            //    alert(x.getKeyCode());
            //});
            //alert("called");
            //Rx.Observable.timer(3000, 1000)
            //.take(2)
            //.map(function(x) {
            //    alert("InputTick");
            //});
        //}

        this.type = new draw2d.shape.basic.Label({ text: "Input type", color: this.darkerBgColor, bgColor: null });
        this.type.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.vert.add(this.type);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
        
    },

    getType: function() {
        return this.type;
    },

    setType: function(type) {
        this.type.setText(type);
        return this;
    },

    /**
      * @method
      * Set the text to show if the state shape
      * 
      * @param {String} text
      */
    setLabel: function (text) {
        this.typeLabel.setText(text);
        return this;
    },

    getOutputPort: function () {
        return this.outputPort;
    },

    getReactiveFunction: function () {
        return this.reactiveFunction;
    },

    removeReactiveInput: function() {
        // No reactive input so do nothing.
    }
       
});
