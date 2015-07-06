﻿var rxjsFunction = function (node) {
    // The figure is used to refer to the visual representation of the
    // reactive function, it is stored as the view.
    this._controlNode = node;

    // The output stream that represents this node. This will normally
    // be the the Rx stream generated by executing the reactive function.
    this.output = null;
};

rxjsFunction.prototype.getFunction = function () {
    return this.reactiveFunction;
};

rxjsFunction.prototype.getNodeExecution = function () {
    return this.nodeExecution;
};

/**
 * Get the output of this reactive RxJS node. When specific
 * changes need to be made to create the stream, this should
 * be implemented in the getExecution function.
 * 
 * @returns The RxJS Observable representing the output stream
 * after going through this reactive function.
 */
rxjsFunction.prototype.getOutput = function () {
    if (this.output === null) {
        this.output = this.getExecution();
    }
    return this.output;
};

rxjsFunction.prototype.subscribe = function (subscriptionModel) {
    // In this implementation, the subscription is handled by
    // rxjsSubscription, so this is a null function internally.
};

rxjsFunction.prototype.removeSubscription = function (subscriptionModel) {
    // In this implementation, the remove of a subscription is handled by
    // rxjsSubscription, so this is a null function internally.
    //TODO something here?
};

rxjsFunction.prototype.addInput = function (subscriptionModel) {
    // In this implentation the addition of new input is handled by
    // the controlNode, so the only thing that we are sure that needs
    // to be done is the update of this node.
};

rxjsFunction.prototype.removeInput = function (subscriptionModel) {
};

rxjsFunction.prototype.updateNode = function () {
    // First refresh the output with the new reactive values.
    this.output = this.getExecution();
};

rxjsFunction.prototype.getId = function () {
    return this._controlNode.getId();
};

rxjsFunction.prototype.getControlNode = function () {
    return this._controlNode;
};

rxjsFunction.prototype.getCode = function (varName) {
    //var inputs = this._controlNode.getInputs();
    //var subscriptions = this._controlNode.getSubscriptions();
    this.variableName = varName;
    
    // Each rxjs model will store its own variable name in case we 
    // need to refer to that name in our generated code. Since this has
    // nothing to do with the control, this is done between the models.

    // We get the variable name of each input
    //var inputNames = [];
    //for (var i = 0; i < this.inputs.length; i++) {
    //    inputNames [i] = this.inputs[i].getModel().getVariableName();
    //}
    return this.getFunctionCall();
};

rxjsFunction.prototype.getVariableName = function () {
    return this.variableName;
};

// Get the 
rxjsFunction.prototype.getInputModels = function () {
    var inputs = this._controlNode.getInputs();
    // The is a list of subscriptions so we get the subscriber of each
    // subscription and take the model of that.
    var models = [];
    for (var i = 0; i < inputs.length; i++) {
        models[i] = inputs[i].getSource().getModel();
    }
    return models;
};