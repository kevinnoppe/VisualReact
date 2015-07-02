/**
 * @class draw2d.shape.frp.Map
 *
 * @extends draw2d.shape.frp.Action
 */
draw2d.shape.frp.Map = draw2d.shape.frp.Action.extend({

	NAME: "draw2d.shape.frp.Map",
	
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

        this.reactiveType = ReactiveLanguage.map;

        //this.subscriberFunction = "(function (y) { console.log(\"Random: \" + y); })";
        this.actionFunction = function (x) { return Math.ceil(Math.random() * 5); };
        // Alternate functions
        // Random number 1 to 5
        //(function (x) { return Math.ceil(Math.random() * 5); })

        this.content = new draw2d.shape.layout.VerticalLayout();

        //this.typeLabel = new draw2d.shape.basic.Label({
        //    text: this.subscriberFunction,
        //    color: this.darkerBgColor,
        //    bgColor: null
        //});
        //this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
        //    {
        //        onCommit: function (value) {
        //            _this.actionNode.setSubscribeFunction(value);
        //        }
        //    }));
        //this.content.add(this.typeLabel, new draw2d.layout.locator.CenterLocator(this));

        this.actionLabel = new draw2d.shape.basic.Label({
            text: this.actionFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.actionLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function(value) {
                    //_this.actionNode.setActionFunction(value);
                    // When setting the reactive function, we want to make sure
                    // that the javascript has been evaluated, by doing this
                    // functions can be created for use in reactive nodes.
                    _this.controlNode.setActionFunction(eval("(" + value + ")"));
                }
            }));
        this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        // Create input and output ports.
        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.inputPort.setMaxFanOut(1);
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        // Create a new ActionNode that takes care of the reactive part.
        //this.actionNode = new ActionNode(this, this.action, this.actionFunction);
        //this.actionNode.setSubscribeFunction(this.subscriberFunction);

        this.controlNode = new MapNode(
            this,
            this.actionFunction);
    }
});
