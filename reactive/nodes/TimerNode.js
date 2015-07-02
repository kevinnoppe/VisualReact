var TimerNode = function (figure, due, interval) {
    // Call the supernode, where the view and the model will be created.
    SuperNode.call(this, figure);

    // Set all necessary information necessary for this kind of reactive
    // function. It is possible that the interval is undefined, in this
    // case the stream will only emit one value.
    this.timerDue = due;
    this.timerInterval = interval;
};

TimerNode.prototype = Object.create(SuperNode.prototype);
TimerNode.prototype.constructor = TimerNode;

// Since certain reactive functions require other input, there is a way
// to create them specifically;
TimerNode.prototype.getExecution = function () {
    // We get the normal execution of the model.
    return this._model.getExecution(this.timerDue, this.timerInterval);
    };

TimerNode.prototype.getTimerDue = function () {
    return this.timerDue;
};

TimerNode.prototype.getTimerInterval = function () {
    return this.timerInterval;
};

/**
 * Update the due time of the timer, thereby changing the node and
 * resuesting an update of the reactive node.
 */
TimerNode.prototype.setDueTime = function (due) {
    this.timerDue = due;
    this.updateNode();
};

TimerNode.prototype.setIntervalTime = function (interval) {
    this.timerInterval = interval;
    this.updateNode();
}