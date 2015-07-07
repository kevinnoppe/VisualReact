/**
 * @class draw2d.shape.frp.FlatMap
 *
 * @extends draw2d.shape.frp.Action
 */
draw2d.shape.frp.FlatMap = draw2d.shape.frp.Action.extend({

	NAME: "draw2d.shape.frp.FlatMap",
	
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

        this.reactiveType = ReactiveLanguage.flatMap;

        this.actionFunction = function (x, i) { return Math.ceil(Math.random() * 5); };

        this.content = new draw2d.shape.layout.VerticalLayout();

        this.actionLabel = new draw2d.shape.basic.Label({
            text: this.actionFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.actionLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function(value) {
                    _this._controlNode.setActionFunction(eval("(" + value + ")"));
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

        this._controlNode = new MapNode(
            this,
            this.actionFunction);
    }
});