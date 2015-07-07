var rxjsMap = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.prototype.map;
    this.functionCall = "map";
    this.currentSubscription = null;
};

rxjsMap.prototype = Object.create(rxjsFunction.prototype);
rxjsMap.prototype.constructor = rxjsMap;

rxjsMap.prototype.getExecution = function (inputs, mapFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    var inputs = inputs || this.getControlNode().getInputs();
    var mapFunction = mapFunction || this.getControlNode().getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        // Be sure to reset the original internal subscription
        if (this.currentSubscription !== null) {
            this.currentSubscription.dispose();
        }
        this.output = Rx.Observable.prototype.map.apply(
            input,
            [mapFunction]).share();
        this.currentSubscription = this.output.subscribe(function (event) {
            console.log("After map: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.empty();
};

rxjsMap.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = " +
        inputModels[0].getVariableName() +
        ".map(" + this.getControlNode().getActionFunction() + ");";
    return ["", scriptCode];
};