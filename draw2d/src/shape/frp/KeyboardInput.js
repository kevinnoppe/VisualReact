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
    init: function(attr, setter, getter)
    {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        // The name generated for the input box used by the code generation
        this.textInputName = guid();
        // The type of event that is being listened to
        this.eventType = "'keyup'";

        this._super(attr, setter, getter);

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({
            text: "Double click to enter \n keyboard events",
            color: this.darkerBgColor,
            bgColor: null
        });

        //this.observable = this.subject.asObservable();

        this.vert.add(this.typeLabel);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.textInput = new draw2d.ui.TextBox();

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        this.inputNode = new InputNode(this).initFromSubject(this.subject);
        //this.inputNode.setSubscribeFunction(function (x) {
        //    console.log("KeyboardInput");
        //});

        //this.inputNode.

        // Alternative input box
        this.$txtReactiveTextInput = jQuery('<input/>', {
            keyup: function (event) {
                _this.inputNode.output.onNext(event);
            }
        });
        jQuery('#reactive-html-content').append(this.$txtReactiveTextInput);
    },
    
    getCode: function (body, script) {
        // Prepare the necessary elements for the code generation
        var extraScript = this.inputNode.getCode(this.textInputName, this.eventType);
        var extraBody = "<input type='text' id='" +
            this.textInputName +
            "' value='Default'></input>";
        body += extraBody;
        script += extraScript;
        return [body, script];
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
     * @param {Event} e The event triggered byt the click
     */
    keyUp: function (e) {
        // This makes sure that the event-based click is translated to a reactive click event.
        this.subject.onNext(e.key);
    },

    getReactiveOutput: function (target) {
        return this.inputNode.getReactiveOutput(target);
        //return this.observable.share();
    }
});
