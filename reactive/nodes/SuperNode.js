var SuperNode = function (figure) {
    // The figure that will be used as a view in the system.
    this._view = figure;

    // The model is created based on the reactive type of the visual
    // node. The actual model will depend on the language being used.
    var model = reactiveLanguage.getModel(figure)
    this._model = new model(this);

    // Create the dictionary that will hold all subscribers of this stream.
    // Each subscriber is a Subscription object.
    this.subscriptions = new Dictionary();

    // Create the dictionary that will hold all inputs of the stream. This
    // can be one or multiple, depending on the function.
    // Each input is a Subscription object.
    this.inputs = new Dictionary();

    // The stream to which this node is currently subscribed. Can be
    // null in the beginning since nodes are created without dependencies.
    this.subscription = null;
};

SuperNode.prototype.getId = function () {
    // We use the id of the visual node as the id of the stream.
    return this._view.getId();
};

SuperNode.prototype.addInput = function (subscriptionControl) {
    // Store the new input
    var sourceId = subscriptionControl.getSource().getId();
    this.inputs.add(sourceId, subscriptionControl);

    //TODO Maybe filter this step out, ie. make sure the model only
    // needs to be updated, that it takes the necessary values itself.
    this.getModel().addInput(subscriptionControl.getModel());

    this.updateNode();
};

SuperNode.prototype.removeInput = function (subscriptionControl) {
    // Remove the input
    var sourceId = subscriptionControl.getSource().getId();
    this.inputs.remove(sourceId);

    this.getModel().removeInput(subscriptionControl.getModel());

    this.updateNode();
};

/**
 * Get the list of input streams of the node.
 */
SuperNode.prototype.getInputs = function () {
    return this.inputs.values();
};

SuperNode.prototype.subscribe = function (subscriptionControl) {
    // Add the new subscriber to the list
    //this.subscribers.add(subscriber.getId(), subscriber);
    // By subscribing to a node, the output of this stream will be 
    // providing input to the subscribing stream but also enabeling
    // it to pause the stream.
    // When subscribing, the subscription itself will depend on the
    // host language so an abstraction is again used to create the
    // connection.
    this.subscriptions.add(
        subscriptionControl.getSubscriber().getId(),
        subscriptionControl);

    // The actual subscription happens in the Subscription object,
    // in the abstraction the subscriber is only saved, we do however
    // call the model because other languages might implement this
    // in a different way.
    this.getModel().subscribe(subscriptionControl.getModel());
    this.updateNode();
};

SuperNode.prototype.removeSubscription = function (subscriptionControl) {
    // Remove the subscription from the list
    var subscriberId = subscriptionControl.getSubscriber().getId();
    this.subscriptions.remove(subscriberId);

    // Also call the model to make sure this can be used by other langauges.
    this.getModel().removeSubscription(subscriptionControl.getModel());
};

/**
 * Retrieve a subscription from this node that connects it to the node
 * with the given id.
 */
SuperNode.prototype.getSubscription = function (targetId) {
    return this.subscriptions.get(targetId);
};

SuperNode.prototype.getSubscriptions = function () {
    return this.subscriptions.values();
};

SuperNode.prototype.getModel = function () {
    return this._model;
};

// Get the output of this reactive node. 
SuperNode.prototype.getOutput = function () {
    return this.getModel().getOutput();
};

SuperNode.prototype.updateOutput = function () {
    var subs = this.subscriptions.values();
    for (i = 0; i < subs.length; i++) {
        subs[i].updateInput(this);
    }
};

/**
 * Notify the controller that something in the node has changed. This
 * can be the reactive function or some reactive value and thus the
 * node should be updated accordingly, recreating the reactive node.
 */
SuperNode.prototype.updateNode = function () {
    // First refresh the internal representation of the reactive function.
    this.getModel().updateNode();
    // Afterwards, notify all subscribers the reactive node has been updated.
    this.updateOutput();
};

SuperNode.prototype.emitEvent = function (event) {
    // Re-execute the current event on this node.
    var subs = this.subscriptions.values();
    for (var i = 0; i < subs.length; i++) {
        subs[i].emitEvent(event);
    }
};

SuperNode.prototype.getCode = function (varName) {
    return this.getModel().getCode(varName);
};

SuperNode.prototype.pause = function (pause) {
    var subs = this.getSubscriptions();
    for (var i = 0; i < subs.length; i++) {
        subs[i].pause(pause);
    }
};