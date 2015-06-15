/*

Queue.js

A function to represent a queue

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue() {

    // initialise the queue and offset
    var queue = [];
    var offset = 0;

    // Returns the length of the queue.
    this.getLength = function () {
        return (queue.length - offset);
    }

    // Returns true if the queue is empty, and false otherwise.
    this.isEmpty = function () {
        return (queue.length == 0);
    }

    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    this.enqueue = function (item) {
        queue.push(item);
    }

    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    this.dequeue = function () {

        // if the queue is empty, return immediately
        if (queue.length == 0) return undefined;

        // store the item at the front of the queue
        var item = queue[offset];

        // increment the offset and remove the free space if necessary
        if (++offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }

        // return the dequeued item
        return item;

    }

    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    this.peek = function () {
        return (queue.length > 0 ? queue[offset] : undefined);
    }

}

//var binaryHeap = function (data) {
//    this.array = [];

//    if (data && (data instanceof Array)) {
//        this.array = data;
//        var length = this.array.length;
//        for (var i = Math.floor((length - 1) / 2) ; i >= 0; i--) {
//            this.bubbleDown(i, this.array[i]);
//        }
//    }
//};

//var node = function (data, index) {
//    return {value: data,
//        i: index};
//};

//binaryHeap.prototype.shouldSwap = function (child, parent) {
//    return child.i < parent.i;
//};

//binaryHeap.prototype.getParentIndex = function (childIndex) {
//    return Math.floor((childIndex - 1) / 2);
//};
//binaryHeap.prototype.getLeftChild = function (parentIndex) {
//    return parentIndex * 2 + 1;
//};
//binaryHeap.prototype.getRightChild = function (parentIndex) {
//    return parentIndex * 2 + 2;
//};

//binaryHeap.prototype.add = function (data, index) {
//    if (data === undefined) { throw 'data must be valid to add'; }
//    var n = node(data, index);
//    this.array.push(n);
//    this.bubbleUp(this.array.length - 1, data);
//};

//binaryHeap.prototype.bubbleUp = function (childIndex, childData) {
//    if (childIndex > 0) {
//        var parentIndex = this.getParentIndex(childIndex);
//        var parentData = this.array[parentIndex];

//        if (this.shouldSwap(childData, parentData)) {
//            this.array[parentIndex] = childData;
//            this.array[childIndex] = parentData;
//            this.bubbleUp(parentIndex, childData);
//        }
//    }
//};

//binaryHeap.prototype.bubbleDown = function (parentIndex, parentData) {
//    if (parentIndex < this.array.length) {
//        var targetIndex = parentIndex;
//        var targetData = parentData;

//        var leftChildIndex = this.getLeftChild(parentIndex);
//        var rightChildIndex = this.getRightChild(parentIndex);

//        var trySwap = function (index, array, shouldSwap) {
//            if (index < array.length) {
//                var data = array[index];

//                if (shouldSwap(data, targetData)) {
//                    targetIndex = index;
//                    targetData = data;
//                }
//            }
//        };

//        trySwap(leftChildIndex, this.array, this.shouldSwap);
//        trySwap(rightChildIndex, this.array, this.shouldSwap);

//        if (targetIndex !== parentIndex) {
//            this.array[parentIndex] = targetData;
//            this.array[targetIndex] = parentData;
//            this.bubbleDown(targetIndex, parentData);
//        }
//    }
//};

//binaryHeap.prototype.removeHead = function () {

//    var headNode = this.array[0];
//    var tailNode = this.array.pop();

//    this.array[0] = tailNode;
//    this.bubbleDown(0, tailNode);

//    return headNode;
//};
