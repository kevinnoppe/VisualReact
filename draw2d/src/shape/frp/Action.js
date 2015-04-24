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

        this.reactiveFunction = null;
        this.observable = null;

        this.bgColor = new draw2d.util.Color("#f3f3f3"); 
        this.lighterBgColor= this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();
    },

    setSubscriberFunction: function (text) {
        this.subscriberFunction = text;
        return this;
    },

    getInputPort: function () {
        return this.inputPort;
    },

    getOutputPort: function () {
        return this.outputPort;
    },

    /**
     * @method Set the new filter for the reactive element
     * 
     * @param newFilter The new filter to be used by the reactive element.
     */
    setActionFunction: function (newAction) {
        this.actionFunction = newAction;
        this.actionLabel.setText(newAction);
        // If there already is an observable, dispose the old subscribtion
        // and create a new one with the new filter.
        if (this.observable !== null) {
            this.subscribedFunction.dispose();
            // Create the new reactive function with the correct filter
            this.reactiveFunction =
                this.filter.call(this.observable, eval(this.actionFunction));
            // Subscribe to the new reactive function
            this.subscribedFunction =
                this.reactiveFunction.subscribe(eval(this.subscriberFunction));
        }
    },

    setReactiveInput: function (observable) {
        this.reactiveFunction =
            this.action.call(observable, eval(this.actionFunction));
        this.subscribedFunction =
            this.reactiveFunction.subscribe(eval(this.subscriberFunction));
        // Store reference to the observable so it can be recomputed if necessary.
        this.observable = observable;
    },

    //setReactiveInput: function (observable) {
    //    //this.reactiveFunction =
    //    //    observable.filter(function(x) {
    //    //        if (x >= 3) {
    //    //            return x;
    //    //        }
    //    //    }).
    //    //subscribe(this.selector);
    //        //this.selector
    //    //);
    //    //this.filterFunction = function (x) {
    //    //    //console.log("FilterFunction executes with " + x);
    //    //    if (x > 3) {
    //    //        return x;
    //    //    }
    //    //};
    //    this.reactiveFunction =
    //        this.action.call(observable, eval(this.filterFunction));
    //    this.subscribedFunction = this.reactiveFunction
    //    .subscribe(eval(this.subscriber));
    //    this.observable = observable;
    //    //this.reactiveFunction.subscribe(this.selector);
    //},

    removeReactiveInput: function () {
        this.subscribedFunction.dispose();
    },

    getReactiveFunction: function () {
        return this.reactiveFunction;
    }
});
