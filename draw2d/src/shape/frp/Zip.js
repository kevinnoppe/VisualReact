/**
 * @class draw2d.shape.frp.Zip
 *
 * @extends draw2d.shape.frp.Action
 */
draw2d.shape.frp.Zip = draw2d.shape.frp.Action.extend({

	NAME: "draw2d.shape.frp.Zip",
	
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

        this.reactiveType = ReactiveLanguage.zip;

        //this.subscribeFunction = "(function (x) { console.log(\"Zipped : \" + x); })";
        this.actionFunction = function () { return arguments.length; }
        // Alternative zip function
        //this.actionFunction = function () {
        //    for (i = 0; i < arguments.length; i++) {
        //        res += arguments[i];
        //        console.log("Zipped: " + res);
        //        return res;
        //    }
        //};

        this.content = new draw2d.shape.layout.VerticalLayout();

        //this.typeLabel = new draw2d.shape.basic.Label({
        //    text: this.subscribeFunction,
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
                    _this.controlNode.setActionFunction(eval("(" + value + ")"));
                }
            }));
        this.content.add(this.actionLabel, new draw2d.layout.locator.CenterLocator(this));

        this.add(this.content, new draw2d.layout.locator.CenterLocator());

        // Create input and output ports.
        // Notice there is no maxFanOut here, a zip can take multiple inputs.
        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        // Create a new ActionNode that takes care of the reactive part.
        //this.actionNode = new ActionNode(this, this.action, this.actionFunction);
        //this.actionNode.setSubscribeFunction(this.subscribeFunction);

        this.controlNode = new ZipNode(
            this,
            this.actionFunction);
    }
});
