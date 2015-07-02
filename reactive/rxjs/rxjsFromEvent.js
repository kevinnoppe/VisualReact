var rxjsFromEvent = function (controlNode) {
    // Based on the original figure, the model is built.
    // The model represents the actions that are needed to
    // create and recreate rxjsFromEvent functions.
    rxjsFunction.call(this, controlNode);


    this.createFunctionCall = function () {
        // For the function call, the element and the event type are
        // needed. Instead of expecting these of the caller, the view
        // is used to retrieve these values.
        var eventTarget = this._controlNode.getEventTarget();
        var eventName = this._controlNode.getEventName();
        // Make sure the strings are created correctly, using the extra
        // apostrophe where necessary.
        return "Rx.Observable.rxjsFromEvent(jQuery('" +
            eventTarget + "'), '" + eventName + "')";
    };

    // Set the necessary variables to create the internal representation
    // of the reactive function and to recreate the code for generation.
    //this.reactiveFunction = Rx.Observable.prototype.fromEvent;
    this.functionCall = this.createFunctionCall();
};

// Use the rxjsFunction as its "parent", thereby inheriting the necessary
// functions.
rxjsFromEvent.prototype = Object.create(rxjsFunction.prototype);
rxjsFromEvent.prototype.constructor = rxjsFromEvent;

rxjsFromEvent.prototype.getEventTarget = function () {
    return this._controlNode.getEventTarget();
};

rxjsFromEvent.prototype.getEventName = function () {
    return this._controlNode.getEventName();
}

rxjsFromEvent.prototype.getExecution = function (eventTarget, eventName) {
    eventTarget = eventTarget || this.getEventTarget();
    eventName = eventName || this.getEventName();
    return Rx.Observable.fromEvent(
        jQuery(eventTarget.toString()),
        eventName.toString());
};