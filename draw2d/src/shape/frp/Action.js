/**
 * @class draw2d.shape.frp.Action
 *
 * @extends draw2d.shape.basic.Diamond
 */
draw2d.shape.frp.Action = draw2d.shape.basic.Hexagon.extend({

	NAME: "draw2d.shape.frp.Action",
	
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

        this._super($.extend({
            bgColor: this.bgColor,
            stroke: 2,
            radius: 2,
            color: this.darkerBgColor,
            width: 150,
            height: 100
        }, attr), setter, getter);

        this.reactiveFunction = null;
        //this.observable = null;
        //this.outputObservable = new Rx.BehaviorSubject(new Rx.Observable.empty());
        //this.eventSources = {};

        this.bgColor = new draw2d.util.Color("#f3f3f3"); 
        this.lighterBgColor= this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();

        // Change the standard selection policy, it has an annoying tendency to resize
        // the nodes instead of connecting them.
        this.installEditPolicy(
            new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
    },

    setSubscriberFunction: function (text) {
        this.actionNode.setSubscriberFunction(text);
        //this.subscriberFunction = text;
        //return this;
    },

    /**
     * @method Set the new filter for the reactive element
     * 
     * @param newFilter The new filter to be used by the reactive element.
     */
    setActionFunction: function (newAction) {
        this.actionNode.setActionFunction(newAction);
        //this.actionFunction = newAction;
        //this.actionLabel.setText(newAction);
        //// If there already is an observable, dispose the old subscribtion
        //// and create a new one with the new filter.
        //if (this.observable !== null) {
        //    this.subscribedFunction.dispose();
        //    // Create the new reactive function with the correct filter
        //    this.reactiveFunction =
        //        this.action.call(this.observable, eval(this.actionFunction)).share();
        //    // Subscribe to the new reactive function
        //    this.subscribedFunction =
        //        this.reactiveFunction.subscribe(eval(this.subscriberFunction));
        //}
    },

    setReactiveInput: function (observableId, observable) {
        this.actionNode.setReactiveInput(observableId, observable);
        //// Again we use share to defer Rx from creating multiple instances
        //// of the subscription. This way all subscribers use the same
        //// events as if all they were all executed in one action.
        //this.reactiveFunction =
        //    this.action.call(observable, eval(this.actionFunction)).share();
        //this.subscribedFunction =
        //    this.reactiveFunction.subscribe(eval(this.subscriberFunction));
        //// Store reference to the observable so it can be recomputed if necessary.
        //this.observable = observable;
        //// Notify all nodes that use output that the source has changed.
        ////this.outputObservable.onNext(reactiveFunction);
    },

    setInput: function (observable) {
        this.actionNode.setInput(observable)
        //this.inputObservable = observable;
        //observable.subscribe(
        //    function (newReactiveInput) {
        //        // Every time the input source changes the old
        //        // input source is dropped and renewed. Since this
        //        // also might change the output, the dependant 
        //        // nodes are also notified with of the new source stream.
        //        setReactiveInput(newReactiveInput);
        //    });
    },


    // Add a new eventSource, this is done when a new connection is made between
    // this and another element. Depending on the number of input ports, there
    // can be one or more input sources.
    // Try to create a system that uses reactive language to update the source
    // of each element by propagating the new source to all listeners.
    //updateSource: function(updatedSource) {

    //},

    removeReactiveInput: function (inputId) {
        this.actionNode.removeReactiveInput(inputId);
        //this.subscribedFunction.dispose();
    },

    getReactiveOutput: function (targetId, target) {
        var o = this.reactiveFunction;
        return this.actionNode.getReactiveOutput(targetId, target);
        //return this.reactiveFunction;
    },

    removeReactiveSubscriber: function (subscriberId) {
        this.actionNode.removeReactiveSubscriber(subscriberId);
    },

    getCode: function (varName) {
        return this.actionNode.getCode(varName);
    }
});
