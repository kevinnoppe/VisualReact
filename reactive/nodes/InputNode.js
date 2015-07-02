var InputNode = function (parent) {

    ReactiveNode.call(this, parent);

    // The subscription to the result of this action. Stored so it 
    // can be disposed of.
    this.subscription = null;

    // The function that defines the action, will be applied to the 
    // input observable.
    this.inputFunction = null;

    this.output = reactiveLanguage.getFunction(ReactiveLanguage.empty)();

    // The debugger that is linked to this node, it stores all input
    // events emitted by this node.
    this.debug = null;
    this.debugSubscription = null;

    return this;
};

// Set the prototype of this object to be the ReactiveNode parent type.
InputNode.prototype = Object.create(ReactiveNode.prototype);

// Set the constructor for this type.
InputNode.prototype.constructor = InputNode;


InputNode.prototype.initFromSubject = function (subject) {
    this.setInput(subject);
    return this;
};

InputNode.prototype.initFromFunction = function (inputFunction) {
    this.setInputFunction(inputFunction);
    return this;
};

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
    for (key in this.dependants.keys) {
        var dependant = this.dependants.get(key);
        dependant.setInput(this.output);
    }
    // Check if the debugger linked exists, if it does, send it updates
    // of every new input.
    if (this.debug !== null) {
        if (this.debugSubscription !== null) {
            this.debugSubscription.dispose();
        }
        this.debugSubscription = this.output.subscribe(function (e) {
            this.debug.newInput({
                event: e,
                time: Date.getTime(),
                source: getId()
            })
        });
    }
    return this;
};

InputNode.prototype.getReactiveOutput = function (id, dependant) {
    this.dependants.add(id, dependant);
    //this.dependants.push(id, dependant);
    return this.output.asObservable().share();
};

InputNode.prototype.removeReactiveSubscriber = function (subscriberId) {
    this.dependants.remove(subscriberId);
};

InputNode.prototype.setDebugger = function (debug) {
    this.debug = debug;
    //TODO Find an effective way to do this.
    //this.getReactiveOutput().subscribe(
    //    function (e) {
    //        this.debugger.newInput({
    //                event: e,
    //                time: Date.getTime(),
    //                source: getId()
    //            })
    //    });
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
        var action = (this.dependants.values())[0].getCode(varName);
        inputString += "." + action;
    } else {
        // https://jsfiddle.net/4gGgs/201/
        // When there are multiple children, a new variable name is created
        // to accomodate the multiple children. This way both children can
        // refer to the first variable instead of repeating the entire code.
        inputString += ";";
        this.dependants.forEach(function (dependantId, dependant) {
            var newVarName = variableName.getNextName();
            var childAction = "var " + newVarName + " = " + varName + ".";
            var action = dependant.getCode(newVarName);
            inputString += childAction + action;
        });

    }
    
    return inputString;
};