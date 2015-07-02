var rxjsTimer = function (controlNode) {
    // Based on the original figure, the model is built.
    // The model represents the actions that are needed to
    // create and recreate rxjsTimer functions.
    rxjsFunction.call(this, controlNode);

    // Set the necessary variables to create the internal representation
    // of the reactive function and to recreate the code for generation.
    this.functionCall = this.createFunctionCall();

};

// Use the rxjsFunction as its "parent", thereby inheriting some necessary
// functions.
rxjsTimer.prototype = Object.create(rxjsFunction.prototype);
rxjsTimer.prototype.constructor = rxjsTimer;

rxjsTimer.prototype.getTimerDue = function () {
    return this._controlNode.getTimerDue();
};

rxjsTimer.prototype.getTimerInterval = function () {
    return this._controlNode.getTimerInterval();
}

rxjsTimer.prototype.getExecution = function (delay, interval) {
    var timerDue = delay || this.getTimerDue();
    var timerInterval = interval || this.getTimerInterval();
    return Rx.Observable.timer(timerDue, timerInterval);
};

rxjsTimer.prototype.createFunctionCall = function () {
    // For the function call, the due time and the optional interval are
    // needed. Instead of expecting these of the caller, the controller
    // is used to retrieve these values.
    var timerDue = this.getTimerDue();
    var timerInterval = this.getTimerInterval();
    return "Rx.Observable.timer(" + timerDue + ", " + timerInterval + ")";
};