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

        this.subscriberFunction = "(function (x) { console.log(\"Random: \" + x); })";
        this.actionFunction = "(function (x) { return Math.ceil(Math.random() * 5); })";
        // Alternate functions
        // Random number 1 to 5
        //(function (x) { return Math.ceil(Math.random() * 5); })
        // Number larger than ?
        //(function(x) { if (x > 3) {return x;}})
        this.action = ReactiveLanguage.map;

        this.content = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({
            text: this.subscriberFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
            {
                onCommit: function (value) {
                    _this.actionNode.setSubscribeFunction(value);
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
                    _this.actionNode.setActionFunction(value);
                }
            }));
        this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        //this.inputPort.on("connect", function (emitter, connection) {
        //    alert("port connected");
        //});
        this.inputPort.setMaxFanOut(1);

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        // Create a new ActionNode that takes care of the reactive part.
        this.actionNode = new ActionNode(this, this.action, this.actionFunction);
        this.actionNode.setSubscribeFunction(this.subscriberFunction);
    }
});
