var ActionNode = function (parent, actionType, actionFunction) {

    ReactiveNode.call(this, parent);

    // The type of action, this is coupled to the reactive language 
    // being used. Currently this is a referral to a class that then
    // returns the actual action function depending on the chosen
    // reactive language.
    this.actionType = actionType,

    // The function that defines the action, will be applied to the 
    // input observable.
    this.actionFunction = actionFunction;

    // The input stream that emits events from the input node. To
    // start this is an empty stream until something changes.
    //TODO Make this completely language independant
    this.emptyStream = reactiveLanguage.getFunction(ReactiveLanguage.empty)();
    this.inputs = new Dictionary();

    // The output stream that emits events to the other nodes. To
    // start this is an empty stream until something changes.
    this.output = reactiveLanguage.getFunction(ReactiveLanguage.empty)();

    // The subscription to the result of this action. Stored so it 
    // can be disposed of.
    this.subscription = null;

    // The pauser that will sends event when te application is paused
    // or resumed.
    this.paused = reactiveLanguage.getFunction(ReactiveLanguage.empty)();
};

// Set the correct prototype and constructors to mimic object inheritance.
ActionNode.prototype = Object.create(ReactiveNode.prototype);
ActionNode.prototype.constructor = ActionNode;

/**
 * Set the actual function that is executed by the action function
 * when there is a new input.
 * 
 * @param newAction The function that should be executed by the 
 * respective action.
 */
ActionNode.prototype.setActionFunction = function (newAction) {
    this.actionFunction = newAction;
    this.updateInput();
};

/**
 * Set the input for this action node.
 * 
 * @param input The input is an Observable that is the source
 * of data for the action node.
 */
ActionNode.prototype.setReactiveInput = function (inputId, input, pauser) {
    this.inputs.add(inputId, input);
    this.pauser = pauser;
    this.updateInput();
};

/**
 * Remote the input for the action node. Also resets the output.
 */
ActionNode.prototype.removeReactiveInput = function (inputId) {
    this.inputs.remove(inputId);

    // Reset the subscription
    if (this.subscription !== null) {
        this.subscription.dispose();
        this.subscription = null;
    }

    // Since the input has changed, there needs to be an update of 
    // the internal working of the action.
    this.updateInput();
};

ActionNode.prototype.getNodeExecutionArguments = function() {
    return [eval(this.actionFunction)];
};

/**
 * Update the input of this ActionNode. This results in an update of
 * the respective subsciptions and output.
 */
ActionNode.prototype.updateInput = function () {
    var nodeExecution = reactiveLanguage.getNodeExecution(this.actionType);
    this.output = nodeExecution(
        this.inputs.isEmpty() ? [this.emptyStream] : this.inputs.values(),
        this.getNodeExecutionArguments()).pausable(this.pauser).share();
    // If there was a previous subscription, dispose of it so it can
    // be garbage collected.
    if (this.subscription !== null) {
        this.subscription.dispose();
    }
    // Subscribe to the updated output.
    this.subscription =
        this.output.subscribe(eval(this.subscribeFunction));
    this.updateOutput();
};

/**
 * Notify all dependants that the output has changed.
 */
ActionNode.prototype.updateOutput = function () {
    this.dependants.each(function (key, val) {
        val.setReactiveInput(this.output);
    });
};

ActionNode.prototype.getReactiveOutput = function (id, dependant) {
    this.dependants.add(id, dependant);
    return this.output.asObservable().share();
};

ActionNode.prototype.removeReactiveSubscriber = function (subscriberId) {
    this.dependants.remove(subscriberId)
};

ActionNode.prototype.getCode = function (varName) {
    // Check if there are multiple listeners, it should not be possible to
    // set multiple action to another action.

    // If we disallow the user to create multiple links between one two actions,
    // there would be no need for this.

    // Then again, we still need to check for loops in the scheme since cycles 
    // cannot be allowed.

    // Get the name of the function that should be used to call the function

    var actionString = "";

    var actionCall = reactiveLanguage.getFunctionCall(this.actionType);
    actionString += actionCall + this.actionFunction;

    //if (varName !== undefined) {
    //    var newVarName = variableName.getNextName();
    //    actionString += "; var " + newVarName + " = " + varName + "."
    //}
    //else {
    //    actionString += ".";
    //}

    if (this.dependants.length === 1) {
        var actionCode = reactiveLanguage.getFunctionCall(this.actionType);
        var childAction = (this.dependants.values())[0].getCode(varName);
        return actionCode + this.actionFunction + "." + childAction;
    }
    else {
        actionString += ";";
        this.dependants.forEach(function (dependantindex, dependant) {
            var newVarName = variableName.getNextName();
            var childAction = "var " + newVarName + " = " + varName + ".";
            var action = dependant.getCode(newVarName);
            actionString += childAction + action;
        });
    }

    return actionString;
};