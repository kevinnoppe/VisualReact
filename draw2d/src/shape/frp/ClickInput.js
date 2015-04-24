/**
 * @class draw2d.shape.frp.Input
 * 
 * @extends draw2d.shape.basic.Hexagon
 */
draw2d.shape.frp.ClickInput = draw2d.shape.frp.Input.extend({

    NAME: "draw2d.shape.frp.ClickInput",

    /**
     * @constructor
     * Create a new instance
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function(attr, setter, getter )
    {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        this._super(attr, setter, getter);

        // This function creates the reactive click event.
        this.on('click', function (event) {
            _this.subject.onNext(event);
        });

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({ text: "Click me for events", color: this.darkerBgColor, bgColor: null });
        this.vert.add(this.typeLabel);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
        
    }
});
