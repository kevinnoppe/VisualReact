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

        // The name generated for the button used by code generation
        this.buttonName = guid();

        // The type of event that is being listened to
        this.eventType = "'click'";

        this._super(attr, setter, getter);

        // This function creates the reactive click event.
        this.on('click', function (event) {
            _this.inputNode.output.onNext(event);
        });

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({ text: "Click me for events", color: this.darkerBgColor, bgColor: null });
        this.vert.add(this.typeLabel);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
        
        this.inputNode = new InputNode(this).initFromSubject(this.subject);

        // Create a new button (we listen for clicks on the button)
        createButton();
    },

    createButton: function () {
        var $btnReactiveButton = jQuery('<button/>', {
            id: this.buttonName,
            text: "Input button",
            click: function (event) {
                _this.inputNode.output.onNext(event);
            }
        });
        jQuery('#reactive-html-content').append(this.$btnReactiveButton);
    },

    remove: function () {
        jQuery('#' + this.buttonName).remove();
    },

    getCode: function (body, script) {
        // Prepare the necessary elements for the code generation
        var extraScript = this.inputNode.getCode(this.buttonName, this.eventType);
        var extraBody = "<input type='button' id='" +
            this.buttonName +
            "' value='Test button'></input>";
        body += extraBody;
        script += extraScript;
        return [body, script];
    }
});
