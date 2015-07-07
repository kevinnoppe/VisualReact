var rxjsTimer = function (controlNode) {
    // Based on the original figure, the model is built.
    // The model represents the actions that are needed to
    // create and recreate rxjsTimer functions.
    rxjsFunction.call(this, controlNode);
};

// Use the rxjsFunction as its "parent", thereby inheriting some necessary
// functions.
rxjsTimer.prototype = Object.create(rxjsFunction.prototype);
rxjsTimer.prototype.constructor = rxjsTimer;

rxjsTimer.prototype.getDueTime = function () {
    return this._controlNode.getDueTime();
};

rxjsTimer.prototype.getIntervalTime = function () {
    return this._controlNode.getIntervalTime();
}

rxjsTimer.prototype.getExecution = function (delay, interval) {
    var timerDue = delay || this.getDueTime();
    var timerInterval = interval || this.getIntervalTime();
    return Rx.Observable.timer(timerDue, timerInterval);
};

rxjsTimer.prototype.getFunctionCall = function () {
    // For the function call, the due time and the optional interval are
    // needed. Instead of expecting these of the caller, the controller
    // is used to retrieve these values.
    var timerDue = this.getDueTime();
    var timerInterval = this.getIntervalTime();
    var scriptCode = "var " + this.variableName +
        " = Rx.Observable.timer(" + timerDue + ", " + timerInterval + ");";

    return ["", scriptCode];
};