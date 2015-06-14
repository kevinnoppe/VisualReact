var ZipNode = function (parent, actionType, actionFunction) {

    ActionNode.call(this, parent, actionType, actionFunction);

    // We need it to be possible for multiple inputs
    //this.inputList = [];
};

ZipNode.prototype = Object.create(ActionNode.prototype);
ZipNode.prototype.constructor = ZipNode;

ZipNode.prototype.getExecutionNodeArguments = function () {
    return [this.actionFunction];
};

//ZipNode.prototype.setReactiveInput = function (input) {
//    // Find a way to uniquely identify streams
//    // This way they can be compared, replaced, updated and removed.

//};