var VariableNames = function () {
    this.counter = 1;
};

VariableNames.prototype.getNextName = function () {
    var name = "reactiveVariable" + this.counter;
    this.counter++;
    return name;
};
