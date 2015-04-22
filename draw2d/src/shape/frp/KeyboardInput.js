/**
 * @class draw2d.shape.frp.Input
 * 
 * @extends draw2d.shape.basic.Hexagon
 */
draw2d.shape.frp.KeyboardInput = draw2d.shape.frp.Input.extend({

    NAME: "draw2d.shape.frp.KeyboardInput",

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

        this._super();

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({
            text: "Double click to enter keyboard events",
            color: this.darkerBgColor,
            bgColor: null
        });

        this.vert.add(this.typeLabel);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.textInput = new draw2d.ui.TextInput();

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());
    },

    onDoubleClick: function () {
        // Start the TextInput when the user double clicks the element.
        this.textInput.start(this);
    },

    /**
     * @method
     * Function called when the keyUp event has been received by the TextInput
     * object linked to this input element.
     * 
     * @param {
     */
    keyUp: function(e) {
        this.subject.onNext(e.key);
    },

    /**
      * @method
      * Set the text to show if the state shape
      * 
      * @param {String} text
      */
    setLabel: function (text) {
        this.typeLabel.setText(text);
        return this;
    },

    getOutputPort: function () {
        return this.outputPort;
    },

    getReactiveFunction: function () {
        return this.subject.asObservable();
    },

    removeReactiveInput: function() {
        // No reactive input so do nothing.
    }
       
});
