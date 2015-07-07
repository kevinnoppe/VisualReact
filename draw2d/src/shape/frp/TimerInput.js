/**
 * @class draw2d.shape.frp.TimerInput
 * 
 * @extends draw2d.shape.frp.Input
 */
draw2d.shape.frp.TimerInput = draw2d.shape.frp.Input.extend({

    NAME: "draw2d.shape.frp.TimerInput",

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

        // Store the identifier of the reactive function, used to create
        // the correct controller and model nodes.
        this.reactiveFunction = ReactiveLanguage.timer;

        this.dueTime = 2000;
        this.intervalTime = 1000;

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.lblDueTime = new draw2d.shape.basic.Label({
            text: this.dueTime,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.lblDueTime.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: function (value) {
                _this._controlNode.setDueTime(value);
            }
        }));
        this.vert.add(this.lblDueTime);

        this.lblIntervalTime = new draw2d.shape.basic.Label({
            text: this.intervalTime,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.lblIntervalTime.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: function (value) {
                _this._controlNode.setIntervalTime(value);
            }
        }));
        this.vert.add(this.lblIntervalTime);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        this._controlNode = new TimerNode(
            this,
            this.dueTime,
            this.intervalTime);

    }
       
});
