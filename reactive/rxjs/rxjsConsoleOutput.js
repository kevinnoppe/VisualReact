var rxjsConsoleOutput = function (figure) {

    rxjsFunction.call(this, figure);

    //this.reactiveFunction = Rx.Observable.prototype.map;
    //this.functionCall = "map";
};

rxjsConsoleOutput.prototype = Object.create(rxjsFunction.prototype);
rxjsConsoleOutput.prototype.constructor = rxjsConsoleOutput;

// Is this necessary?
//rxjsConsoleOutput.prototype.setFunction = function (fn) {
//    this.mapFunction = fn;
//};

rxjsConsoleOutput.prototype.getExecution = function (inputs) {
    // Get the necessary arguments to create the execution of the
    // reactive node.
    inputs = inputs || this._controlNode.getInputs();
    // Merge all inputs before printing them to the console. The merging
    // is done internally and allows the node to print the event of
    // multiple other streams.
    var merged = Rx.Observable.prototype.merge.apply(this, inputs);
    return merged.subscribe(function (event) {
        console.log("Logged event: " + event.toString());
    });
};

//rxjsConsoleOutput.prototype.addInput = function (inputList) {
//    var l = inputList;
//    l.push(this.mapFunction);
//    // Set the output of this node to be the resulting stream of this
//    // function.
//    this.output = this.reactiveFunction.apply(l.shift(), l);;
//};