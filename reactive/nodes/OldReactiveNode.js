/**
 * The supertype of all reactive nodes in the system, groups all
 * shared functions of the nodes.
 * 
 * @param parent The graphical frp shape that visually represents this node.
 * 
 */
var ReactiveNode = function (parent) {

    // The parent node, being the draw2d object coupled with this
    // action node.
    this.parent = parent;

    // All nodes depending on this node are stored to make sure they
    // can be notified if the output changes.
    this.dependants = new Dictionary();

    // The function that defines the subscription to the action result.
    // Currently used to display the result, can change later.
    //TODO Possibly hidden after standard display?
    this.subscribeFunction = new Function();
};

/**
 * Set the function that is executed when subscribing to the output
 * of this ActionNode.
 * 
 * @param newSubscribeFunction The function that is executed after
 * executing the node action on the input.
 */
ReactiveNode.prototype.setSubscribeFunction = function (newSubscribeFunction) {
    this.subscribeFunction = newSubscribeFunction;
    this.updateInput();
};

ReactiveNode.prototype.pause = function () {

};