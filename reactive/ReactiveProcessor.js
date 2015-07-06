/// <reference path="../index.html" />
VisualReact.ReactiveProcessor = Class.extend({

    NAME: "VisualReact.ReactiveProcessor",

    init: function (view) {
        this.view = view;
        //this.Rx = reactiveExtentions;
        // Register this class as a listener for the CommandStack.
        // This way we can update the reactive part of the application
        this.reactiveGraph = new reactiveGraph();
        // The global stream that allows to pause and resume the other streams.
        this.pauser = new Rx.Subject();

        // Create a global "listener" that stores a list of all inputs in the
        // application, this way the application can be "replayed".
        this.inputs = [];

        this.reactiveNodes = new Dictionary();
        this.inputNodes = new Dictionary();
        this.connections = new Dictionary();

        view.commandStack.addEventListener(this);
    },

    newInput: function (sourceId, timestamp, event) {
        // Check if the source is an input node, currently we only
        // want to catch these.
        var source = this.reactiveNodes.get(sourceId);
        if (source instanceof FromEventNode) {
            this.inputs.push({
                source: sourceId,
                time: timestamp,
                event: event
            });
            jQuery('#sldTimeline').prop('max', this.inputs.length);
        }
    },

    // Try to inject the reactivity in the blocks after creation.
    stackChanged: function (event) {
        // Only catch events that have occurred, meaning we don't use the 
        // event thrown before the execution of the command. We thus catch
        // the POST_EXECUTE events.
        if (event.getDetails() === draw2d.command.CommandStack.POST_EXECUTE) {
            switch (event.getCommand().getLabel()) {
                case draw2d.Configuration.i18n.command.addShape:
                    // When creating a new input shape, add the possibility
                    // to notify the main mechanism that stores all inputs.
                    // This should be used to recreate the execution during
                    // debugging.
                    if (event.getCommand().getFigure() instanceof draw2d.shape.frp.Input) {
                        event.getCommand().getFigure().setDebugger(this);
                    }
                    this.createNode(event.getCommand().getFigure());
                    break;
                case draw2d.Configuration.i18n.command.connectPorts:
                    if (event.getCommand() instanceof draw2d.command.CommandConnect) {
                        this.connect(
                            event.getCommand().getSource().getParent(),
                            event.getCommand().getTarget().getParent(),
                            event.getCommand().getConnection().getId());
                        this.reactiveGraph.addEdge(
                            event.getCommand().getSource().getParent().getId(),
                            event.getCommand().getTarget().getParent().getId());
                        try {
                            console.log(this.reactiveGraph.getTopologicalSort());
                        }
                        catch (e) {
                            console.log(e.message);

                        }
                        pause(false);
                        this.createCode();
                        
                        //inputFunction = event.command.source.parent.getReactiveFunction();
                        //source = event.getCommand().getSource().getParent().getReactiveFunction();
                        //event.getCommand().getTarget().getParent().setReactiveInput(inputFunction);
                    }
                    break;
                case draw2d.Configuration.i18n.command.deleteShape:
                    //if (event.getCommand().figure instanceof draw2d.Connection) {
                    //    event.getCommand().figure.targetPort.parent.removeReactiveInput();
                    //}
                    break;
                default:
                    //alert(event.getCommand());
                    break;
            }
            //createCode();
        } else {
            switch (event.getCommand().getLabel()) {
                case draw2d.Configuration.i18n.command.deleteShape:
                    if (event.getCommand().figure instanceof draw2d.Connection) {
                        var connection = event.getCommand().figure;
                        console.log("Removing connection");
                        this.disconnect(
                            connection.getId());
                            //connection.getSource().getParent(),
                            //connection.getTarget().getParent());
                    } else {
                        var connections = event.getCommand().figure.getConnections()
                        console.log("Removing figure");
                        event.getCommand().figure.remove();
                        for (c = 0; c < connections.getSize() ; c++) {
                            var conn = connections.get(c);
                            this.disconnect(
                                conn.getSource().getParent(),
                                conn.getTarget().getParent());
                        }
                    }
                    break;
            }
        }
    },

    createNode: function (figure) {
        // The draw2d node is stored and used as the view.
        // A model is made that represents the reactive counterpart.
        var control = figure.getControlNode();
        //var model = control.getModel();
        // The id is stored separately for easy retrieval.
        //var newNode = new node(
        //    figure,
        //    control,
        //    model);
        // Add the new node to the internal collection of reactive nodes.
        this.reactiveNodes.add(figure.getId(), control);
        if (figure instanceof draw2d.shape.frp.Input) {
            this.inputNodes.add(figure.getId(), control);
        }
    },

    connect: function (source, target, connectionId) {
        var sourceControl = this.reactiveNodes.get(source.getId());
        var targetControl = this.reactiveNodes.get(target.getId());
        var s = new Subscription(connectionId, sourceControl, targetControl);
        this.connections.add(connectionId, s)

        //sourceControl.subscribe(targetControl); //NODIG?
        //var sourceId = source.getId();
        //var targetId = target.getId();
        //var output = source.getReactiveOutput(targetId, target);
        //target.setReactiveInput(sourceId, output, this.pauser);
    },

    disconnect: function (connectionId) {
        //var sourceControl = this.reactiveNodes.get(source.getId());
        //var targetControl = this.reactiveNodes.get(target.getId());
        var subscription = this.connections.get(connectionId);
        //var subscription = sourceControl.removeSubscription(target.getId());
        // Remove the subscription and make sure all relevant data gets freed.
        subscription.remove();
        //source.removeReactiveSubscriber(targetId);
        //target.removeReactiveInput(sourceId);
    },

    createCode: function () {
        var body = "";
        var script = "";
        // First get a list of all elements on the canvas. To make the code
        // generation easier and better optimised, we create a topologically
        // sorted list. This is necessary to make sure the code for nodes that 
        // depend on multiple input streams (eg. zip) are only defined after
        // the definition of all parent streams.
        var figures = this.reactiveGraph.getTopologicalSort();
        for (var i = 0; i < figures.length; i++) {
            // Go over each node, when tere needs to be a referral to 
            // the node, we take a generic name based on the topological
            // order.
            var current = this.reactiveNodes.get(figures[i]);
            // Check if the node depends on one or multiple other variables.
            // When the code only depends on one stream, the new code
            // can be appended to the earlier code without creating a new
            // variable name.
            // When a node has multiple dependants, the name of the node
            // first occurring in the concatenation should be referred.

            var newGenerated = current.getCode("reactiveVariable" + i);

            if (newGenerated[0]) {
                body += "\n" + newGenerated[0];
            }
            script += "\n" + newGenerated[1];
        }
        //var figures = this.view.getFigures().asArray();
        //for (i = 0; i < figures.length ; i++) {
        //    if (figures[i] instanceof draw2d.shape.frp.Input) {
        //        var ar = figures[i].getCode(body, script);
        //        body = ar[0];
        //        script = ar[1];
        //    }
        //}

        // Start by making a blank page and two elements that will represent
        // the actual html code and the javascript code
        var page = "<HTML> <HEAD> <TITLE>Blank page</TITLE>";
        page += "</HEAD> <BODY>";
        page += body;
        page += "<script src='http://code.jquery.com/jquery-1.9.1.js'></script>";
        page += "<script src='http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.2.26/rx.all.js'></script>";
        page += "<script>"
        page += script;
        page += "</script>";
        page += "</BODY> </HTML>";
        jQuery('#reactive-html-code').text(script);
        console.log(page);
        return page;
    },
    
    // Send the pause or resume command to the streams.
    pause: function (p) {
        //this.pauser.onNext(p);
        // Pause all streams in between the nodes
        // Better would be to pause the streams from input nodes to
        // other nodes, this way it is possible to rerun the events
        // without them being dropped by the other subscriptions.
        var l = this.inputNodes.values();
        for (var i = 0; i < l.length; i++) {
            var subscriptions = l[i].getSubscriptions();
            for (var j = 0; j < subscriptions.length; j++) {
                subscriptions[i].pause(p);
            }
        }
    },

    goToEvent: function (eventCounter) {
        for (var i = 0; i < eventCounter; i++) {
            var currentInput = this.inputs[i];
            var source = this.reactiveNodes.get(currentInput.source);
            source.emitEvent(currentInput.event);
        }
    }
});