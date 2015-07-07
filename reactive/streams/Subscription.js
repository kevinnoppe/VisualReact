var Subscription = function (subscriptionId, sourceControl, subscriberControl) {
    this.source = sourceControl;
    this.subscriber = subscriberControl;
    this.subscriptionId = subscriptionId;

    // First create the actual subscription, based on the host language.
    var subscriptionModel = reactiveLanguage.getModelFromType(
        ReactiveLanguage.subscription);
    // Does the model itself need to do the connecting or should we leave that
    // to the implementation of the stream models, thus sending the subscription
    // to the controllers of the streams.
    // A logical thing seems to send it to the controller nodes, because
    // depending on the implementation language, the connection could differ.
    // On the other hand, we use the Subscription as the abstraction for
    // the connection, so it makes sense to allow the abstraction to control
    // how a new connection is made!
    this._model = new subscriptionModel(
        this,
        this.source.getModel(), 
        this.subscriber.getModel());

    // Then subscribe to the source, notify the node of the new subscription.
    this.source.subscribe(this);

    // Lastly, notify the subscribing node, also giving it the stream to
    // which it needs to subscribe.
    this.subscriber.addInput(this);
};

Subscription.prototype.getSource = function () {
    return this.source;
};

Subscription.prototype.getSubscriber = function () {
    return this.subscriber;
};

Subscription.prototype.getId = function () {
    return this.subscriptionId;
};

Subscription.prototype.getOutput = function () {
    return this.getModel().getOutput();
};

Subscription.prototype.pause = function (paused) {
    return this.getModel().pause(paused);
};

// When the subscription is being disposed of, make sure all cleanup
// is done as well.
Subscription.prototype.dispose = function () {
    return this.getModel().dispose();
};

Subscription.prototype.remove = function () {
    // Make sure all references to the subscription are removed.
    this.source.removeSubscription(this);
    // When a subscription is removed, several steps need to be taken
    // First, make sure that the subscription is disposed in the subscriber.
    this.subscriber.removeInput(this);

    this.getModel().remove();
};

Subscription.prototype.emitEvent = function (event) {
    this.getModel().emitEvent(event);
}

Subscription.prototype.updateInput = function (updatedNode) {
    // Because this is a subscription (connection) node, the changed
    // output of the previous node should be updated, such that the
    // following nodes continue receiving the right events.
    this.getModel().updateInput(updatedNode);
};

Subscription.prototype.getModel = function () {
    return this._model;
};