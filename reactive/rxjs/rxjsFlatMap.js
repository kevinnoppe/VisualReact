var rxjsFlatMap = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.prototype.map;
    this.functionCall = "map";
};

rxjsFlatMap.prototype = Object.create(rxjsFunction.prototype);
rxjsFlatMap.prototype.constructor = rxjsFlatMap;

rxjsFlatMap.prototype.getExecution = function (inputs, mapFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    inputs = inputs || this._controlNode.getInputs();
    mapFunction = mapFunction || this._controlNode.getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        this.output = Rx.Observable.prototype.flatMap.apply(
            input,
            [mapFunction]).share();
        this.output.subscribe(function (event) {
            console.log("After flatMap: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.empty();
};

rxjsFlatMap.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = " +
        inputModels[0].getVariableName() +
        ".flatMap(" + this._controlNode.getActionFunction() + ");";
    return ["", scriptCode];
};