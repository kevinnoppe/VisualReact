var InputNode = function (parent) {
    // The parent node, being the draw2d object coupled with this
    // action node.
    this.parent = parent;

    // The function that defines the subscription to the action result.
    // Currently used to display the result, can change later.
    //TODO Possibly hidden after standard display?
    this.subscribeFunction = new Function();

    // All nodes depending on this node are stored to make sure they
    // can be notified if the output changes.
    this.dependants = new Array();

    // The subscription to the result of this action. Stored so it 
    // can be disposed of.
    this.subscription = null;

    // The function that defines the action, will be applied to the 
    // input observable.
    this.inputFunction = null;

    this.output =  Rx.Observable.empty();

    return this;
};

InputNode.prototype.initFromSubject = function (subject) {
    this.setInput(subject);
    return this;
};

InputNode.prototype.initFromFunction = function (inputFunction) {
    this.setInputFunction(inputFunction);
    return this;
}

/**
 * Set the actual function that is executed by the action function
 * when there is a new input.
 * 
 * @param newAction The function that should be executed by the 
 * respective action.
 */
InputNode.prototype.setInputFunction = function (newInput) {
    this.inputFunction = newInput;
    this.output = (eval(this.inputFunction));
    this.updateInput();
};

InputNode.prototype.setInput = function (observable) {
    this.output = observable;
    this.updateInput();
};

/**
 * Set the function that is executed when subscribing to the output
 * of this ActionNode.
 * 
 * @param newSubscribeFunction The function that is executed after
 * executing the node action on the input.
 */
InputNode.prototype.setSubscribeFunction = function (newSubscribeFunction) {
    this.subscribeFunction = newSubscribeFunction;
    this.updateInput();
};

/**
 * Update the input of this ActionNode. This results in an update of
 * the respective subsciptions and output.
 */
InputNode.prototype.updateInput = function () {
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
InputNode.prototype.updateOutput = function () {
    var length = this.dependants.length;
    for (i = 0; i < length; i++) {
        console.log("huh");
        this.dependants[i].setInput(this.output);
    }
    return this;
};

InputNode.prototype.getReactiveOutput = function (dependant) {
    this.dependants.push(dependant);
    return this.output.asObservable().share();
};

InputNode.prototype.removeReactiveSubscriber = function (subscriber) {
    var index = this.dependants.indexOf(subscriber);
    if (index >= 0) {
        this.dependants.splice(index, 1);
    }
};

InputNode.prototype.getCode = function (element, event) {
    // First get the standard input and then go through the children to
    // create the complete reactive string.

    // Store the current name of the variable
    var varName = variableName.getNextName();
    var inputString = "var " + varName + " = ";
    // Get the function call for the given element and event
    var fromEvent = reactiveLanguage.getFunctionCall(ReactiveLanguage.fromEvent);
    inputString += fromEvent("jQuery('#" + element + "')", event);
    
    // Get the rest of the string from the children.
    //TODO
    if (this.dependants.length === 1) {
        var action = this.dependants[0].getCode();
        inputString += "." + action;
    } else {
        // https://jsfiddle.net/4gGgs/201/
        // When there are multiple children, a new variable name is created
        // to accomodate the multiple children. This way both children can
        // refer to the first variable instead of repeating the entire code.
        inputString += ";";
        this.dependants.forEach(function (dependant, index) {
            var newVarName = variableName.getNextName();
            var childAction = "var " + newVarName + " = " + varName + ".";
            var action = dependant.getCode(newVarName);
            inputString += childAction + action;
        });

    }
    
    return inputString;
};