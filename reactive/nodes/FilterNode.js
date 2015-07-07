var FilterNode = function (figure, filterFunction) {

    ActionNode.call(this, figure, filterFunction);
};

FilterNode.prototype = Object.create(ActionNode.prototype);
FilterNode.prototype.constructor = FilterNode;

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