var ReactiveLanguage = function (language) {
    language = "language";
    //functions = {};
    //functionCalls = {};
    //nodeExecution = {};
    models = {};
};

// All available language constructs
ReactiveLanguage.empty = "empty";
ReactiveLanguage.map = "map";
ReactiveLanguage.flatMap = "flatMap";
ReactiveLanguage.scan = "scan";
ReactiveLanguage.filter = "filter";
ReactiveLanguage.zip = "zip";
ReactiveLanguage.fromEvent = "fromEvent";
ReactiveLanguage.filter = "filter";
ReactiveLanguage.subscription = "subscribe";
ReactiveLanguage.consoleOutput = "consoleOutput";

// The list with all functions that can be executed.
//ReactiveLanguage.prototype.functions = {};

// The list with all functions that can be called for code creation.
//ReactiveLanguage.prototype.functionCalls = {};

/**
 * Get the reactive function to execute
 * 
 * @param name The identifier of the language construct.
 */
//ReactiveLanguage.prototype.getFunction = function (name) {
//    return functions[name];
//};

/**
 * Get the call to the reactive function for use in code generation.
 * 
 * @param name The identifier of the language construct.
 */
//ReactiveLanguage.prototype.getFunctionCall = function (name) {
//    return functionCalls[name];
//};

/**
 * Get the code necessary to execute the reactive function in its node.
 * 
 * @param name The identifier of the language construct.
 */
ReactiveLanguage.prototype.getNodeExecution = function (name) {
    return nodeExecution[name];
};

ReactiveLanguage.prototype.createModel = function (figure) {
    throw new Error("Needs to be implemented by the host language.")
}