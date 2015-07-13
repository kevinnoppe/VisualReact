var rxjsFilter = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.filter;
    this.functionCall = "filter";
    this.currentSubscription = null;
};

rxjsFilter.prototype = Object.create(rxjsFunction.prototype);
rxjsFilter.prototype.constructor = rxjsFilter;

rxjsFilter.prototype.getExecution = function (inputs, filterFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    var inputs = inputs || this.getControlNode().getInputs();
    var filterFunction = filterFunction || this.getControlNode().getActionFunction();
    if (inputs.length === 1) {
        var input = inputs[0].getOutput();
        this.currentSubscription && this.currentSubscription.dispose();
        this.output = Rx.Observable.prototype.filter.apply(
            input,
            [filterFunction]).share();
        this.currentSubscription = this.output.subscribe(function (event) {
            console.log("After filter: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.never();
};

rxjsFilter.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = " +
        inputModels[0].getVariableName() +
        ".filter(" + this.getControlNode().getActionFunction() + ");";
    return ["", scriptCode];
};