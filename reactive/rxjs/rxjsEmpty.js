var rxjsEmpty = function (figure) {

    rxjsFunction.call(this, figure);

    this.functionCall = "Rx.Observable.empty()";
};

rxjsEmpty.prototype = Object.create(rxjsFunction.prototype);
rxjsEmpty.prototype.constructor = rxjsEmpty;

rxjsEmpty.prototype.getExectution = function () {
    return Rx.Observable.empty();
};

rxjsEmpty.prototype.getOutput = function () {
    if (this.output === null) {
        this.output = this.getExectution();
    }
    return this.output;
};