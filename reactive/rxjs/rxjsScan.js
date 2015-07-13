var rxjsScan = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.prototype.map;
    this.functionCall = "map";
    this.currentSubscription = null;
};

rxjsScan.prototype = Object.create(rxjsFunction.prototype);
rxjsScan.prototype.constructor = rxjsScan;

rxjsScan.prototype.getExecution = function (inputs, accumulator, scanFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    var inputs = inputs || this.getControlNode().getInputs();
    var accumulator = accumulator || this.getControlNode().getAccumulator();
    var scanFunction = scanFunction || this.getControlNode().getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        this.currentSubscription && this.currentSubscription.dispose();
        // When there is an original accumulator, add it as an argument.
        var args = accumulator ? [accumulator, scanFunction] : [scanFunction];
        this.output = Rx.Observable.prototype.scan.apply(
            input,
            args).share();
        this.currentSubscription = this.output.subscribe(function (event) {
            console.log("After scan: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.never();
};

rxjsScan.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    var accumulator = this.getControlNode().getAccumulator();
    var actionFunction = this.getControlNode().getActionFunction();
    var args = accumulator ?
        accumulator + ", " + actionFunction :
        actionFunction;
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = " +
        inputModels[0].getVariableName() +
        ".scan(" + args + ");";
    return ["", scriptCode];
};