var FromEventNode = function (figure, target, name) {
    // Call the supernode, where the view and the model will be created.
    SuperNode.call(this, figure);

    // Set all necessary information necessary for this kind of reactive
    // function.
    this.eventTarget = target; // Already including the jQuery tags.
    this.eventName = name;
};

FromEventNode.prototype = Object.create(SuperNode.prototype);
FromEventNode.prototype.constructor = FromEventNode;

// Since certain reactive functions require other input, there is a way
// to create them specifically;
FromEventNode.prototype.getExecution = function () {
    // We get the normal execution of the model.
    return this._model.getExecution(this.eventTarget, this.eventName);
    };

FromEventNode.prototype.getEventTarget = function () {
    return this.eventTarget;
};

FromEventNode.prototype.getEventName = function () {
    return this.eventName;
};