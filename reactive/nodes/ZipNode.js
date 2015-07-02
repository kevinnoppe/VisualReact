var ZipNode = function (figure, zipFunction) {

    SuperNode.call(this, figure);

    this.actionFunction = zipFunction;
};

ZipNode.prototype = Object.create(SuperNode.prototype);
ZipNode.prototype.constructor = ZipNode;

ZipNode.prototype.getExecution = function () {
    // Since the execution of a map stream is based on the map function,
    // it is passed along as the argument of the function call.
    return this._model.getExecution(this.actionFunction);
};

// Overwrite the addInput function of SuperNode because other rules
// apply for this kind of node.
ZipNode.prototype.addInput = function (subscriptionControl) {
    var sourceId = subscriptionControl.getSource().getId();
    this.inputs.add(sourceId, subscriptionControl);
    // Finally, the model can be subscribed to the source stream.
    this._model.addInput(this.inputs.values());
    // Updating the output also means notifying the subscribing
    // nodes as well;
    this.updateNode();
};

//TODO raise this to an abstract level with all "action" nodes.
ZipNode.prototype.setActionFunction = function (actionFunction) {
    this.actionFunction = actionFunction;
};

/**
 * Get the action function that should be mapped onto each new event.
 * TODO Move this to an abstract action node.
 */
ZipNode.prototype.getActionFunction = function () {
    return this.actionFunction;
};