var ScanNode = function (figure, accumulator, scanFunction) {

    ActionNode.call(this, figure, scanFunction);

    this.accumulator = accumulator;
};

ScanNode.prototype = Object.create(ActionNode.prototype);
ScanNode.prototype.constructor = ScanNode;

// Overwrite the addInput function of SuperNode because other rules
// apply for this kind of node.
ScanNode.prototype.addInput = function (subscriptionControl) {
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

ScanNode.prototype.setAccumulator = function (acc) {
    this.accumulator = acc;
    this.updateNode();
};

ScanNode.prototype.getAccumulator = function () {
    return this.accumulator;
}

