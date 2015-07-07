var ZipNode = function (figure, zipFunction) {

    ActionNode.call(this, figure, zipFunction);
};

ZipNode.prototype = Object.create(ActionNode.prototype);
ZipNode.prototype.constructor = ZipNode;

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