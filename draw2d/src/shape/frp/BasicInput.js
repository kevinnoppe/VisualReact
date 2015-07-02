/**
 * @class draw2d.shape.frp.BasicInput
 * 
 * @extends draw2d.shape.frp.Input
 */
draw2d.shape.frp.BasicInput = draw2d.shape.frp.Input.extend({

    NAME: "draw2d.shape.frp.BasicInput",

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
                _this.setDueTime(value);
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
                _this.setIntervalTime(value);
            }
        }));
        this.vert.add(this.lblIntervalTime);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        //this.inputNode = new InputNode(this).initFromFunction(this.executableReactiveFunction);
        this.controlNode = new TimerNode(
            this,
            this.dueTime,
            this.intervalTime);

    },

    getCode: function(body, script) {
        var extraScript = this.inputNode.getCode(this.buttonName, this.eventType);
        script += extraScript;
        return [body, script];
    },

    setDueTime: function (dueTime) {
        if (this.dueTime !== dueTime) {
            this.dueTime = dueTime;
            this.controlNode.setDueTime(this.dueTime);
        }
    },

    setIntervalTime: function (intervalTime) {
        if (this.intervalTime !== intervalTime) {
            this.intervalTime = intervalTime;
            this.controlNode.setIntervalTime(this.intervalTime);
        }
    }
       
});
