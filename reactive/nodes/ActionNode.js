var ActionNode = function (figure, actionFunction) {

    SuperNode.call(this, figure);

    this.actionFunction = actionFunction;
};

// Set the correct prototype and constructors to mimic object inheritance.
ActionNode.prototype = Object.create(SuperNode.prototype);
ActionNode.prototype.constructor = ActionNode;

//ActionNode.prototype.getExecution = function () {
//    // Since the execution of a map stream is based on the map function,
//    // it is passed along as the argument of the function call.
//    return this._model.getExecution(this.actionFunction);
//};

ActionNode.prototype.setActionFunction = function (newAction) {
    this.actionFunction = newAction;
    this.updateNode();
};

/**
 * Get the action function that should be mapped onto each new event.
 */
ActionNode.prototype.getActionFunction = function () {
    return this.actionFunction;
};