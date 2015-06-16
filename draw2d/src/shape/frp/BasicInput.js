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

        this.vert = new draw2d.shape.layout.VerticalLayout();

        this.typeLabel = new draw2d.shape.basic.Label({
            text: "Rx observable function",
            color: this.darkerBgColor,
            bgColor: null
        });
        this.vert.add(this.typeLabel);

        this.reactiveFunction = null;
        this.setRxFunction("Rx.Observable.timer(1000, 1000)");

        this.RxFunction = new draw2d.shape.basic.Label({
            text: this.reactiveFunction,
            color: this.darkerBgColor,
            bgColor: null
        });
        this.RxFunction.installEditor(new draw2d.ui.LabelInplaceEditor({
            onCommit: function (value) {
                _this.setRxFunction(value);
            }
        }));
        this.vert.add(this.RxFunction);

        this.add(this.vert, new draw2d.layout.locator.CenterLocator());

        this.outputPort = this.createPort("output", new draw2d.layout.locator.BottomLocator());

        this.inputNode = new InputNode(this).initFromFunction(this.reactiveFunction);
        
    },

    /**
      * @method
      * Set the text to show if the state shape
      * 
      * @param {String} text
      */
    setRxFunction: function (rxfunction) {
        this.reactiveFunction = rxfunction;
        this.subject = (eval(this.reactiveFunction)).asObservable().share();
        return this.reactiveFunction;
    },

    /**
     * @method
     *
     * Overwrite the getReactiveFunction of Input because now the function needs
     * to be evaluated before returning.
     */
    getReactiveOutput: function (target) {
        return this.inputNode.getReactiveOutput(target);
    }
       
});
