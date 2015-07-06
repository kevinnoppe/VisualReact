var rxjsZip = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.zip;
    this.functionCall = "zip";
};

rxjsZip.prototype = Object.create(rxjsFunction.prototype);
rxjsZip.prototype.constructor = rxjsZip;

rxjsZip.prototype.getExecution = function (inputs, zipFunction) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    inputs = inputs || this._controlNode.getInputs();
    zipFunction = zipFunction || this._controlNode.getActionFunction();
    if (inputs.length > 0) {
        // First create the list of actual inputs
        var inputList = [];
        for (i = 0; i < inputs.length; i++) {
            inputList.push(inputs[i].getOutput());
        }
        // Append the action function to the list because apply takes
        // a list of parameters to pass to the function.
        inputList.push(zipFunction);
        // Execute the function
        this.output = Rx.Observable.prototype.zip.apply(
            inputList.shift(),
            inputList).share();
        if (this.internalSubscription !== undefined) {
            this.internalSubscription.dispose();
        }
        this.internalSubscription = this.output.subscribe(function (event) {
            console.log("After zip: " + event.toString());
        });
        return this.output;
    }
    return Rx.Observable.Empty();
};

rxjsZip.prototype.getFunctionCall = function () {
    var inputModels = this.getInputModels();
    // Create a list of reactive variable names from the list of models.
    var inputNames = [];
    for (var i = 0; i < inputModels.length; i++) {
        inputNames[i] = inputModels[i].getVariableName();
    }
    // Since map is a function that is executed on one stream we only take
    // the first name, which should always be the only one.
    var scriptCode = "var " + this.variableName + " = Rx.Observable.zip(" +
        inputNames.join(", ") + ", " +
        this._controlNode.getActionFunction() + ");";
    return ["", scriptCode];
};

//rxjsZip.prototype.addInput = function (inputList) {
//    var l = inputList;
//    l.push(this.mapFunction);
//    // Set the output of this node to be the resulting stream of this
//    // function.
//    this.output = this.reactiveFunction.apply(l.shift(), l);;
//};