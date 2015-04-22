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

        this.bgColor = new draw2d.util.Color("#f3f3f3"); 
        this.lighterBgColor= this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        this.subscriber = "(function (x) { console.log(\"ClickEvent \"); })";
        this.filterFunction = "(function (x) { return x; })";
        this.filter = Rx.Observable.prototype.filter;
        this.observable = null;

        this.content = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({ text: this.subscriber, color: this.darkerBgColor, bgColor: null });
        this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function (value) {
                    _this.setSubscriberFunction(value);
                }
            }));
        this.content.add(this.typeLabel, new draw2d.layout.locator.CenterLocator(this));

        this.filterLabel = new draw2d.shape.basic.Label({ text: this.filterFunction, color: this.darkerBgColor, bgColor: null });
        this.filterLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function(value) {
                    _this.setFilterFunction(value);
                }
            }));
        this.content.add(this.filterLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
    },

    setSubscriberFunction: function (text) {
        this.subscriber = text;
        return this;
    },

    getInputPort: function () {
        return this.inputPort;
    },

    getOutputPort: function () {
        return this.outputPort;
    },
    
    setFilterFunction: function(filter) {
        this.filterFunction = filter;
        this.filterLabel.setText(filter);
        if (this.observable !== null) {
            this.subscribedFunction.dispose();
            this.reactiveFunction =
                this.filter.call(this.observable, eval(this.filterFunction));
            this.subscribedFunction = this.reactiveFunction
            .subscribe(eval(this.subscriber));
        }
    },

    setReactiveInput: function (observable) {
        //this.reactiveFunction =
        //    observable.filter(function(x) {
        //        if (x >= 3) {
        //            return x;
        //        }
        //    }).
        //subscribe(this.selector);
            //this.selector
        //);
        //this.filterFunction = function (x) {
        //    //console.log("FilterFunction executes with " + x);
        //    if (x > 3) {
        //        return x;
        //    }
        //};
        this.reactiveFunction =
            this.filter.call(observable, eval(this.filterFunction));
        this.subscribedFunction = this.reactiveFunction
        .subscribe(eval(this.subscriber));
        this.observable = observable;
        //this.reactiveFunction.subscribe(this.selector);
    },

    removeReactiveInput: function () {
        this.subscribedFunction.dispose();
    },

    getReactiveFunction: function () {
        return this.reactiveFunction;
    }
});
