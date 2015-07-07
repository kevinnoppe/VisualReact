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

        this.reactiveType = ReactiveLanguage.filter;

        //this.subscriberFunction = "(function (x) { console.log(\"FilterEvent \" + x); })";
        //this.actionFunction = function (x) {
        //    return x === 'a' ||
        //        x === 'e' ||
        //        x === 'i' ||
        //        x === 'o' ||
        //        x === 'u';
        //};
        // Alternative filter functions:
        this.actionFunction = function (x) { return x > 3; };

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

        // Create the input and output ports.
        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.inputPort.setMaxFanOut(1);
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        // Create the actionnode coupled with this object.
        //this.actionNode = new ActionNode(this, this.action, this.actionFunction);
        //this.actionNode.setSubscribeFunction(this.subscriberFunction);

        this._controlNode = new FilterNode(
            this,
            this.actionFunction);
    }
});
