var MapNode = function (figure, mapFunction) {

    ActionNode.call(this, figure, mapFunction);
};

MapNode.prototype = Object.create(ActionNode.prototype);
MapNode.prototype.constructor = MapNode;

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
    this.getModel().addInput(subscriptionControl.getModel());

    // Make sure the changes to the node are propagated to all
    // necessary subscribers.
    this.updateNode();
};

