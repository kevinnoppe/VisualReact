﻿var rxjsFromEvent = function (controlNode) {
    // Based on the original figure, the model is built.
    // The model represents the actions that are needed to
    // create and recreate rxjsFromEvent functions.
    rxjsFunction.call(this, controlNode);

    // Set the necessary variables to create the internal representation
    // of the reactive function and to recreate the code for generation.
    //this.reactiveFunction = Rx.Observable.prototype.fromEvent;
    //this.functionCall = this.createFunctionCall();
};

// Use the rxjsFunction as its "parent", thereby inheriting the necessary
// functions.
rxjsFromEvent.prototype = Object.create(rxjsFunction.prototype);
rxjsFromEvent.prototype.constructor = rxjsFromEvent;

rxjsFromEvent.prototype.getEventTarget = function () {
    return this.getControlNode().getEventTarget();
};

rxjsFromEvent.prototype.getEventName = function () {
    return this.getControlNode().getEventName();
}

rxjsFromEvent.prototype.getExecution = function (eventTarget, eventName) {
    var eventTarget = eventTarget || this.getEventTarget();
    var eventName = eventName || this.getEventName();
    return Rx.Observable.fromEvent(
        jQuery("#" + eventTarget.toString()),
        eventName.toString());
};

rxjsFromEvent.prototype.getFunctionCall = function () {
    // For the function call, the element and the event type are
    // needed. Instead of expecting these of the caller, the view
    // is used to retrieve these values.
    var eventTarget = this.getEventTarget();
    var eventName = this.getEventName();
    // Make sure the strings are created correctly, using the extra
    // apostrophe where necessary.
    var htmlCode = "<input type='button' id='" + eventTarget +
        "' value='Test button'></input>";
    
    var scriptCode = "var " + this.variableName +
        " = Rx.Observable.rxjsFromEvent(jQuery('#" +
        eventTarget + "'), '" + eventName + "');";

    return [htmlCode, scriptCode];
};