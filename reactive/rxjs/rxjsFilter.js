var rxjsFilter = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.filter;
    this.functionCall = "filter";
};

rxjsFilter.prototype = Object.create(rxjsFunction.prototype);
rxjsFilter.prototype.constructor = rxjsFilter;

rxjsFilter.prototype.getExecution = function (inputs, filterFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    inputs = inputs || this._controlNode.getInputs();
    filterFunction = filterFunction || this._controlNode.getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        this.output = Rx.Observable.prototype.filter.apply(
            input,
            [filterFunction]).share();
        this.output.subscribe(function (event) {
            console.log("After filter: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.empty();
};

rxjsFilter.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = " +
        inputModels[0].getVariableName() +
        ".filter(" + this._controlNode.getActionFunction() + ");";
    return ["", scriptCode];
};

//rxjsFilter.prototype.addInput = function (inputList) {
//    var l = inputList;
//    l.push(this.mapFunction);
//    // Set the output of this node to be the resulting stream of this
//    // function.
//    this.output = this.reactiveFunction.apply(l.shift(), l);;
//};