var rxjsMap = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.prototype.map;
    this.functionCall = "map";
};

rxjsMap.prototype = Object.create(rxjsFunction.prototype);
rxjsMap.prototype.constructor = rxjsMap;

rxjsMap.prototype.getExecution = function (inputs, mapFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    inputs = inputs || this._controlNode.getInputs();
    mapFunction = mapFunction || this._controlNode.getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        this.output = Rx.Observable.prototype.map.apply(
            input,
            [mapFunction]).share();
        this.output.subscribe(function (event) {
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
        ".map(" + this._controlNode.getActionFunction() + ");";
    return ["", scriptCode];
};

//rxjsMap.prototype.addInput = function (inputList) {
//    // Update the internal representation of the output

//    l.push(this.mapFunction);
//    // Set the output of this node to be the resulting stream of this
//    // function.
//    this.output = this.reactiveFunction.apply(l.shift(), l);;
//};