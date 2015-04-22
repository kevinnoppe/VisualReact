/**
 * @class draw2d.shape.frp.Output
 * 
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.frp.Output = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.frp.Output",

    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        this._super($.extend({
            bgColor: this.bgColor,
            stroke: 2,
            radius: 2,
            color: this.darkerBgColor,
            width: 100,
            height: 30
        }, attr), setter, getter);

        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        // Adding label with a output description
        this.typeLabel = new draw2d.shape.basic.Label({ text: "Activity Name", color: this.darkerBgColor, bgColor: null });
        this.typeLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
        this.add(this.typeLabel, new draw2d.layout.locator.CenterLocator(this));

        this.inputPort = this.createPort("input", new draw2d.layout.locator.TopLocator());

    },

    setLabel: function (text) {
        this.typeLabel.setText(text);
        return this;
    },

    getOutputPort: function () {
        return this.outputPort;
    }

});