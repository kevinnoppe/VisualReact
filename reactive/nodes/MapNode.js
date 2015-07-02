var MapNode = function (figure, mapFunction) {

    SuperNode.call(this, figure);

    this.actionFunction = mapFunction;
};

MapNode.prototype = Object.create(SuperNode.prototype);
MapNode.prototype.constructor = MapNode;

MapNode.prototype.getExecution = function () {
    // Since the execution of a map stream is based on the map function,
    // it is passed along as the argument of the function call.
    return this._model.getExecution(this.actionFunction);
};

// Overwrite the addInput function of SuperNode because other rules
// apply for this kind of node.
MapNode.prototype.addInput = function (subscriptionControl) {
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

    // Make sure the changes to the node are propagated to all
    // necessary subscribers.
    this.updateNode();
};

//TODO raise this to an abstract level with all "action" nodes.
MapNode.prototype.setActionFunction = function (actionFunction) {
    this.actionFunction = actionFunction;
};

/**
 * Get the action function that should be mapped onto each new event.
 * TODO Move this to an abstract action node.
 */
MapNode.prototype.getActionFunction = function () {
    return this.actionFunction;
};