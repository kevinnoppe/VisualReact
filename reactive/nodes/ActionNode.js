var ActionNode = function(parent, actionType, actionFunction){
    // The parent node, being the draw2d object coupled with this
    // action node.
    this.parent = parent;

    // The type of action, this is coupled to the reactive language 
    // being used. Currently this is a referral to a class that then
    // returns the actual action function depending on the chosen
    // reactive language.
    this.actionType = actionType,

    // The function that defines the action, will be applied to the 
    // input observable.
    this.actionFunction = actionFunction;

    // The function that defines the subscription to the action result.
    // Currently used to display the result, can change later.
    //TODO Possibly hidden after standard display?
    this.subscribeFunction = null;

    // The input stream that emits events from the input node. To
    // start this is an empty stream until something changes.
    //TODO Make this language independant
    this.input = Rx.Observable.empty();

    // The output stream that emits events to the other nodes. To
    // start this is an empty stream until something changes.
    this.output = Rx.Observable.empty();

    // All nodes depending on this node are stored to make sure they
    // can be notified if the output changes.
    this.dependants = new Array();
    
    // The subscription to the result of this action. Stored so it 
    // can be disposed of.
    this.subscription = null;

    //return this;
}

    /**
     * Set the actual function that is executed by the action function
     * when there is a new input.
     * 
     * @param newAction The function that should be executed by the 
     * respective action.
     */
ActionNode.prototype.setActionFunction = function(newAction) {
    this.actionFunction = newAction;
    this.updateInput();
};

    /**
     * Set the function that is executed when subscribing to the output
     * of this ActionNode.
     * 
     * @param newSubscribeFunction The function that is executed after
     * executing the node action on the input.
     */
ActionNode.prototype.setSubscribeFunction = function(newSubscribeFunction) {
    this.subscribeFunction = newSubscribeFunction;
    this.updateInput();
};

    /**
     * Set the input for this action node.
     * 
     * @param input The input is an Observable that is the source
     * of data for the action node.
     */
ActionNode.prototype.setReactiveInput = function (input) {
    // Store the new input and apply the corresponding action to it.
    this.input = input;
    this.updateInput();
};

    /**
     * Remote the input for the action node. Also resets the output.
     */
ActionNode.prototype.deleteReactiveInput = function() {
    this.input = null;
    if (this.subscription !== null) {
        this.subscription.dispose();
        this.subscription = null;
    }
    this.output = Rx.Observable.empty();
    this.updateOutput();
};

    /**
     * Update the input of this ActionNode. This results in an update of
     * the respective subsciptions and output.
     */
ActionNode.prototype.updateInput = function () {
    var action = reactiveLanguage.getFunction(this.actionType);
    this.output = action.call(this.input, eval(this.actionFunction)).share();
    // Subscribe to our own output so it can be displayed and used.
    // If there was a previous subscription, dispose of it so it can
    // be garbage collected.
    if (this.subscription !== null) {
        this.subscription.dispose();
    }
    this.subscription =
        this.output.subscribe(eval(this.subscribeFunction));
    this.updateOutput();
};

    /**
     * Notify all dependants that the output has changed.
     */
ActionNode.prototype.updateOutput = function () {
    var length = this.dependants.length;
    for (i = 0; i < length; i++) {
        this.dependants[i].setReactiveInput(this.output);
    }
};

ActionNode.prototype.getReactiveOutput = function (dependant) {
    this.dependants.push(dependant);
    return this.output.asObservable().share();
};

ActionNode.prototype.removeReactiveSubscriber = function (subscriber) {
    var index = this.dependants.indexOf(subscriber);
    if (index >= 0) {
        this.dependants.splice(index, 1);
    }
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
        var childAction = this.dependants[0].getCode();
        return "." + actionCode + this.actionFunction;
    }
    else {
        actionString += ";";
        this.dependants.forEach(function (dependantindex) {
            var newVarName = variableName.getNextName();
            var childAction = "var " + newVarName + " = " + varName + ".";
            var action = dependant.getCode(newVarName);
            actionString += childAction + action;
        });
    }

    return actionString;
};