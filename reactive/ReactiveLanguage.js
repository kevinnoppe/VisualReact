var ReactiveLanguage = function (language) {
    language = "language";
    functions = {};
    functionCalls = {};
    nodeExecution = {};
};

ReactiveLanguage.empty = "empty";
ReactiveLanguage.map = "map";
ReactiveLanguage.filter = "filter";
ReactiveLanguage.zip = "zip";
ReactiveLanguage.fromEvent = "fromEvent";

//ReactiveLanguage.prototype.language = "ReactiveLanguage";

ReactiveLanguage.prototype.functions = {};

ReactiveLanguage.prototype.functionCalls = {};

ReactiveLanguage.prototype.getFunction = function (name) {
    return functions[name];
};

ReactiveLanguage.prototype.getFunctionCall = function (name) {
    return functionCalls[name];
};

ReactiveLanguage.prototype.getNodeExecution = function (name) {
    return nodeExecution[name];
}