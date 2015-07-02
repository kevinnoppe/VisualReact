var ConsoleOutputNode = function (figure, mapFunction) {

    SuperNode.call(this, figure);

    //this.actionFunction = mapFunction;
};

ConsoleOutputNode.prototype = Object.create(SuperNode.prototype);
ConsoleOutputNode.prototype.constructor = ConsoleOutputNode;

ConsoleOutputNode.prototype.getExecution = function () {
    return this._model.getExecution();
};

// Overwrite the addInput function of SuperNode because other rules
// apply for this kind of node.
ConsoleOutputNode.prototype.addInput = function (subscriptionControl) {
    // Since a map should only act on one input, the other one is
    // removed when a new input stream is added.
    //if (this.inputs.length >= 1) {
    //    // When a subscription is removed, it should clean up itself.
    //    var ins = this.inputs.values();
    //    for (i = 0; ins.length; i++) {
    //        this.ins[i].remove();
    //    }
    //    this.inputs.clear();
    //}
    var sourceId = subscriptionControl.getSource().getId();
    this.inputs.add(sourceId, subscriptionControl);
    // Finally, the model can be subscribed to the source stream.
    //this._model.addInput(this.inputs.values());
    // Updating the output also means notifying the subscribing
    // nodes as well;
    this._model.updateNode();
};

//ConsoleOutputNode.prototype.setActionFunction = function (actionFunction) {
//    this.actionFunction = actionFunction;
//};

/**
 * Get the action function that should be mapped onto each new event.
 * TODO Move this to an abstract action node.
 */
//ConsoleOutputNode.prototype.getActionFunction = function () {
//    return this.actionFunction;
//};