var FilterNode = function (figure, filterFunction) {

    SuperNode.call(this, figure);

    this.actionFunction = filterFunction;
};

FilterNode.prototype = Object.create(SuperNode.prototype);
FilterNode.prototype.constructor = FilterNode;

FilterNode.prototype.getExecution = function () {
    // Since the execution of a map stream is based on the map function,
    // it is passed along as the argument of the function call.
    return this._model.getExecution(this.actionFunction);
};

// Overwrite the addInput function of SuperNode because other rules
// apply for this kind of node.
FilterNode.prototype.addInput = function (subscriptionControl) {
    // Since a map should only act on one input, the other one is
    // removed when a new input stream is added.
    if (this.inputs.length >= 1) {
        // When a subscription is removed, it should clean up itself.
        var ins = this.inputs.values();
        for (i = 0; ins.length; i++) {
            this.ins[i].remove();
        }
        this.inputs.clear();
    }
    var sourceId = subscriptionControl.getSource().getId();
    this.inputs.add(sourceId, subscriptionControl);
    // Finally, the model can be subscribed to the source stream.
    this._model.addInput(subscriptionControl.getModel());

    // Updating the output also means notifying the subscribing
    // nodes as well;
    this.updateNode();
};

FilterNode.prototype.setActionFunction = function (actionFunction) {
    this.actionFunction = actionFunction;
};

//TODO Move level up
FilterNode.prototype.getActionFunction = function () {
    return this.actionFunction;
};