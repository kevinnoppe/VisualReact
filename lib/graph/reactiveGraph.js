﻿var ReactiveGraph = function () {
    this.nodes = {};
    this.edges = {};
};

var node = function (nodeId, nodeView, nodeModel) {
    this.nodeId = nodeId;
    this._view = nodeView;
    this._model = nodeModel;
}

ReactiveGraph.prototype.addNode = function (nodeId, controlNode) {
    // Check if the node is an input node, they are being saved 
    // because they are used to create the topologically sorted list.
    //var n = new node(nodeId);
    //if (node instanceof draw2d.shape.frp.Input) {
    //    this.inputNodes.add(n);
    //}
    //this.nodes[id] = n;
    this.nodes[nodeId] = controlNode;
};

ReactiveGraph.prototype.removeNode = function (nodeId) {
    delete this.nodes[nodeId];
};

ReactiveGraph.prototype.addEdge = function (edgeId, sourceId, targetId) {
    this.edges[edgeId] = [sourceId, targetId];
};

ReactiveGraph.prototype.removeEdge = function (edgeId) {
    delete this.edges[edgeId];
};

ReactiveGraph.prototype.createsCycle = function (sourceId, targetId) {
    var id = guid();
    this.addEdge(id, sourceId, targetId);
    try {
        this.getTopologicalSort();
    }
    catch (e) {
        // It creates a cycle
        this.removeEdge(id);
        return true;
    }
    // Since this is only a temporary check, remove the edge again.
    this.removeEdge(id);
    return false;
}

ReactiveGraph.prototype.getTopologicalSort = function () {

    // Copyright 2012 Shin Suzuki<shinout310@gmail.com>

    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    // http://www.apache.org/licenses/LICENSE-2.0
    //     Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.

    var nodes = {}, // hash: stringified id of the node => { id: id, afters: lisf of ids }
        sorted = [], // sorted list of IDs ( returned value )
        visited = {}; // hash: id of already visited node => true

    var Node = function (id) {
        this.id = id;
        this.afters = [];
    }

    // 1. build data structures
    //this.edges.forEach(function (v) {
    //    var from = v[0], to = v[1];
    //    if (!nodes[from]) nodes[from] = new Node(from);
    //    if (!nodes[to]) nodes[to] = new Node(to);
    //    nodes[from].afters.push(to);
    //});
    for (var key in this.edges) {
        if (this.edges.hasOwnProperty(key)) {
            var edge = this.edges[key];
            var from = edge[0], to = edge[1];
            if (!nodes[from]) nodes[from] = new Node(from);
            if (!nodes[to]) nodes[to] = new Node(to);
            nodes[from].afters.push(to);
        }
    }

    // 2. topological sort
    Object.keys(nodes).forEach(function visit(idstr, ancestors) {
        var node = nodes[idstr],
            id = node.id;

        // if already exists, do nothing
        if (visited[idstr]) return;

        if (!Array.isArray(ancestors)) ancestors = [];

        ancestors.push(id);

        visited[idstr] = true;

        node.afters.forEach(function (afterID) {
            if (ancestors.indexOf(afterID) >= 0)  // if already in ancestors, a closed chain exists.
                throw new Error('Cycle created in the graph.');

            visit(afterID.toString(), ancestors.map(function (v) { return v })); // recursive call
        });

        sorted.unshift(id);
    });

    return sorted;
}

