/**
 * @class draw2d.shape.frp.Scan
 *
 * @extends draw2d.shape.frp.Action
 */
draw2d.shape.frp.Scan = draw2d.shape.frp.Action.extend({

	NAME: "draw2d.shape.frp.Scan",
	
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

        this.reactiveType = ReactiveLanguage.scan;

        this.actionFunction = function (acc, x) { return acc + x; };
        this.accumulator = "";

        this.content = new draw2d.shape.layout.VerticalLayout();
        this.accumulatorLabel = new draw2d.shape.basic.Label({
            text: this.accumulator,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.accumulatorLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function (value) {
                    _this._controlNode.setAccumulator(eval("(" + value + ")"));
                }
            }));
        this.content.add(this.accumulatorLabel, new draw2d.layout.locator.CenterLocator(this));

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
                    _this._controlNode.setActionFunction(eval("(" + value + ")"));
                }
            }));
        this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        // Create input and output ports.
        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.inputPort.setMaxFanOut(1);
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        this._controlNode = new ScanNode(
            this,
            this.accumulator,
            this.actionFunction);
    }
});