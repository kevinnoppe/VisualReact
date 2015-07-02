var ManualStream = function (id) {
    var _this = this;
    this.id = id;
    this.inputs = new Dictionary();
    this.subscribers = new Dictionary();

}

ManualStream.prototype.addInput = function (inputId, input) {
    this.inputs.add(inputId, input);
    return {
        dispose: function () {
            _this.inputs.remove(inputId);
        }
    };
};

ManualStream.prototype.newEvent = function (event) {
    // Emit the event to all subscribers.
    for (i = 0; i < this.subscribers.length; i++) {

    }
};

ManualStream.prototype.subscribe = function (subscriber) {
    var id = subscriber.getId();
    this.subscribers.add(id, subscriber);
    // Returns an object that allows the user to dispose of the subscription.
    return {
        dispose: function () {
            _this.subscribers.remove(id);
        }
    };
};

ManualStream.prototype.