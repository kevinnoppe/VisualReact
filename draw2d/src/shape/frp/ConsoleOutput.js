/**
 * @class draw2d.shape.frp.ConsoleOutput
 *
 * @extends draw2d.shape.frp.Output
 */
draw2d.shape.frp.ConsoleOutput = draw2d.shape.frp.Output.extend({

	NAME: "draw2d.shape.frp.ConsoleOutput",
	
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

        //this.subscriberFunction = "(function (x) { console.log(\"FilterEvent \" + x); })";
        //this.actionFunction = "(function (x) { return x === 'a' || \n x === 'e' || \n x === 'i' || \n x === 'o' || \n x === 'u'; })";
        //    //"(function (x) { return x; })";
        //this.action = ReactiveLanguage.filter;

        //this.content = new draw2d.shape.layout.VerticalLayout();

        //this.typeLabel = new draw2d.shape.basic.Label({
        //    text: this.subscriberFunction,
        //    color: this.darkerBgColor,
        //    bgColor: null
        //});
        //this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
        //    {
        //        onCommit: function (value) {
        //            _this.setSubscriberFunction(value);
        //        }
        //    }));
        //this.content.add(this.typeLabel, new draw2d.layout.locator.CenterLocator(this));

        //this.actionLabel = new draw2d.shape.basic.Label({
        //    text: this.actionFunction,
        //    color: this.darkerBgColor,
        //    bgColor: null
        //});
        //this.actionLabel.installEditor(new draw2d.ui.LabelInplaceEditor(
        //    {
        //        onCommit: function(value) {
        //            _this.setActionFunction(value);
        //        }
        //    }));
        //this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));
        //this.add(this.content, new draw2d.layout.locator.CenterLocator());

        // Create the input and output ports.
        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        //this.inputPort.setMaxFanOut(1);
        //this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        // Create the actionnode coupled with this object.
        //this.actionNode = new ActionNode(this, this.action, this.actionFunction);
        //this.actionNode.setSubscribeFunction(this.subscriberFunction);

        this.controlNode = new ConsoleOutputNode(
            this);
    }
});
