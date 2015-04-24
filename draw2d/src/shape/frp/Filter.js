/**
 * @class draw2d.shape.frp.Filter
 *
 * @extends draw2d.shape.frp.Action
 */
draw2d.shape.frp.Filter = draw2d.shape.frp.Action.extend({

	NAME: "draw2d.shape.frp.Filter",
	
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

        this._super(attr, setter, getter);

        this.subscriberFunction = "(function (x) { console.log(\"ClickEvent \"); })";
        this.actionFunction = "(function (x) { return x; })";
        this.action = Rx.Observable.prototype.filter;

        this.content = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({
            text: this.subscriberFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function (value) {
                    _this.setSubscriberFunction(value);
                }
            }));
        this.content.add(this.typeLabel, new draw2d.layout.locator.CenterLocator(this));

        this.actionLabel = new draw2d.shape.basic.Label({
            text: this.actionFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.actionLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function(value) {
                    _this.setActionFunction(value);
                }
            }));
        this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
    },
    
    ///**
    // * @method Set the new filter for the reactive element
    // * 
    // * @param newFilter The new filter to be used by the reactive element.
    // */
    //setActionFunction: function(newAction) {
    //    this.actionFunction = newAction;
    //    this.filterLabel.setText(newFilter);
    //    // If there already is an observable, dispose the old subscribtion
    //    // and create a new one with the new filter.
    //    if (this.observable !== null) {
    //        this.subscribedFunction.dispose();
    //        // Create the new reactive function with the correct filter
    //        this.reactiveFunction =
    //            this.filter.call(this.observable, eval(this.actionFunction));
    //        // Subscribe to the new reactive function
    //        this.subscribedFunction =
    //            this.reactiveFunction.subscribe(eval(this.subscriberFunction));
    //    }
    //},

    //setReactiveInput: function (observable) {
    //    this.reactiveFunction =
    //        this.action.call(observable, eval(this.actionFunction));
    //    this.subscribedFunction =
    //        this.reactiveFunction.subscribe(eval(this.subscriberFunction));
    //    // Store reference to the observable so it can be recomputed if necessary.
    //    this.observable = observable;
    //}
});
