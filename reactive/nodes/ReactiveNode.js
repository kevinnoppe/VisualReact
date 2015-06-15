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

}

//ReactiveNode.prototype.getCode = function (inputNodeList) {
//    // We get the list of input nodes, of which there might me several.
//    // A breadth-first search is executed with some extra's:
//    // First of all, the nodes that rely on multiple other nodes
//    // are deferred to place until the last dependable has been created.
//    // This way, there should be less accidental glitches introduced to
//    // the generated code.

//    var top = [];
//    while (inputNodeList.length !== 0) {
//        var cur = inputNodeList.shift();
//        top.push(cur);

//    }

//    //breadth first search on all input elements
//    var queue = new Queue();
//    for (node in inputNodeList) {
//        queue.enqueue(node);
//    }
//    while (!queue.isEmpty) {
//        var node = queue.dequeue();
//        // Get the code of that node
//        node.getCode();
//        for (dep in node.getDependants()) {

//        }
//    }
//};