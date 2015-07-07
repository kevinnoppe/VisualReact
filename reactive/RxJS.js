var RxJS = function () {
    ReactiveLanguage.call(this);
    // Set the descriptor of the reactive language begin used.
    this.language = "RxJS";
    // Create an object that will represent the mapping between the identifier
    // of the reactive function and an object with all its internal functions.
    this.reactiveObjects = {};

    // Add all reactive functions with an object that contains the necessary
    // functions for recreating it.
    this.reactiveObjects[ReactiveLanguage.empty] = rxjsEmpty;
    this.reactiveObjects[ReactiveLanguage.map] = rxjsMap;
    this.reactiveObjects[ReactiveLanguage.flatMap] = rxjsFlatMap;
    this.reactiveObjects[ReactiveLanguage.scan] = rxjsScan;
    this.reactiveObjects[ReactiveLanguage.filter] = rxjsFilter;
    this.reactiveObjects[ReactiveLanguage.zip] = rxjsZip;
    this.reactiveObjects[ReactiveLanguage.fromEvent] = rxjsFromEvent;
    this.reactiveObjects[ReactiveLanguage.timer] = rxjsTimer;
    this.reactiveObjects[ReactiveLanguage.subscription] = rxjsSubscription;
    this.reactiveObjects[ReactiveLanguage.consoleOutput] = rxjsConsoleOutput;

    // The function that needs to be used when executing the reactive code.
    //functions[ReactiveLanguage.empty] = Rx.Observable.empty;
    //functions[ReactiveLanguage.map] = Rx.Observable.prototype.map;
    //functions[ReactiveLanguage.filter] = Rx.Observable.prototype.filter;
    //functions[ReactiveLanguage.zip] = Rx.Observable.zip;
    //functions[ReactiveLanguage.fromEvent] = Rx.Observable.fromEvent;

    // The string used to call the reactive function when the code 
    // is generated.
    //functionCalls[ReactiveLanguage.empty] = "Rx.Observable.empty";
    //functionCalls[ReactiveLanguage.map] = "map";
    //functionCalls[ReactiveLanguage.filter] = "filter";
    //functionCalls[ReactiveLanguage.zip] = "zip";

    // The fromEvent function call still needs several arguments to be
    // a valid function call, this is why we return a function that takes
    // these arguments and returns the correct function call for them.
    //functionCalls[ReactiveLanguage.fromEvent] = function (element, event) {
    //    return "Rx.Observable.fromEvent(" + element + ", " + event + ")";
    //};

    //nodeExecution[ReactiveLanguage.empty] = function (inputList, argumentList) {
    //    // When an empty stream is created, the input list and the arguments
    //    // don't matter, the empty stream is just created.
    //    return functions[ReactiveLanguage.empty]();
    //};
    //nodeExecution[ReactiveLanguage.map] = function (inputList, argumentList) {
    //    // For the map we expect the input list to have only one element
    //    // because the map function can only be executed on one stream.
    //    // When multiple map functions are needed, multiple map nodes 
    //    // should be created.
    //    if (inputList.length === 1) {
    //        // The map function should be executed with the necessary arguments.
    //        // The first argument is the 'this', namely the input stream.
    //        // The rest of the arguments is then applied.
    //        return functions[ReactiveLanguage.map].apply(inputList[0], argumentList);
    //    }
    //    // Should we return something otherwise? This would mean that something
    //    // is wrong with the number of input streams, which should not be the case
    //    // TODO Change this such that we just assume that only one input steam
    //    // will be provided.
    //};
    //nodeExecution[ReactiveLanguage.filter] = function (inputList, argumentList) {
    //    // Same implementation as map
    //    if (inputList.length === 1) {
    //        return functions[ReactiveLanguage.filter].apply(inputList[0], argumentList);
    //    }
    //};
    //nodeExecution[ReactiveLanguage.zip] = function (inputList, argumentList) {
    //    // When using zip, this is normally done with the Rx.Observable object
    //    // as 'this' but internally this is replaced by the first stream of the
    //    // input list. We thus call it directly on the first element of the list.
    //    var args = inputList.concat(argumentList);
    //    return functions[ReactiveLanguage.zip].apply(args[0], args);
    //};

    //models[ReactiveLanguage.fromEvent] = new fromEvent(figure);
};

// Use the ReactiveLangue as prototype but keep a different constructor
RxJS.prototype = Object.create(ReactiveLanguage.prototype);
RxJS.prototype.constructor = RxJS;

RxJS.prototype.getModel = function (figure) {
    return this.getModelFromType(figure.getReactiveType());
};

RxJS.prototype.getModelFromType = function (type) {
    return this.reactiveObjects[type];
}