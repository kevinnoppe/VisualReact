var RxJS = function () {
    ReactiveLanguage.call(this);
    // Set the descriptor of the reactive language begin used.
    this.language = "RxJS";

    // The function that needs to be used when executing the reactive code.
    functions[ReactiveLanguage.map] = Rx.Observable.prototype.map;
    functions[ReactiveLanguage.filter] = Rx.Observable.prototype.filter;
    functions[ReactiveLanguage.clickInput] = Rx.Observable.fromEvent;
    functions[ReactiveLanguage.keyboardInput] = Rx.Observable.fromEvent;

    // The string used to call the reactive function when the code 
    // is generated.
    functionCalls[ReactiveLanguage.map] = "map";
    functionCalls[ReactiveLanguage.filter] = "filter";

    // The fromEvent function call still needs several arguments to be
    // a valid function call, this is why we return a function that takes
    // these arguments and returns the correct function call for them.
    functionCalls[ReactiveLanguage.fromEvent] = function (element, event) {
        return "Rx.Observable.fromEvent(" + element + ", " + event + ")";
    };
};

// Use the ReactiveLangue as prototype but keep a different constructor
RxJS.prototype = Object.create(ReactiveLanguage.prototype);
RxJS.prototype.constructor = RxJS;