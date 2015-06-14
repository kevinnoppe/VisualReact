VisualReact.ReactiveProcessor = Class.extend({

    NAME: "VisualReact.ReactiveProcessor",

    init: function (view) {
        this.view = view;
        //this.Rx = reactiveExtentions;
        // Register this class as a listener for the CommandStack.
        // This way we can update the reactive part of the application

        view.commandStack.addEventListener(this);
    },

    // Try to inject the reactivity in the blocks after creation.
    stackChanged: function (event) {
        // Only catch events that have occurred, meaning we don't use the 
        // event thrown before the execution of the command. We thus catch
        // the POST_EXECUTE events.
        if (event.getDetails() === draw2d.command.CommandStack.POST_EXECUTE) {
            switch (event.getCommand().getLabel()) {
                case draw2d.Configuration.i18n.command.addShape:
                    break;
                case draw2d.Configuration.i18n.command.connectPorts:
                    if (event.getCommand() instanceof draw2d.command.CommandConnect) {
                        this.connect(
                            event.getCommand().getSource().getParent(),
                            event.getCommand().getTarget().getParent());
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
                            connection.getSource().getParent(),
                            connection.getTarget().getParent());
                        //connection.getSource().getParent().removeReactiveSubscriber(
                        //    connection.getTarget().getParent().getId());
                        //connection.getTarget().getParent().removeReactiveInput(
                        //    connection.getSource().getParent().getId());
                    } else {
                        var connections = event.getCommand().figure.getConnections()
                        console.log("Removing figure");
                        for (c = 0; c < connections.getSize() ; c++) {
                            var conn = connections.get(c);
                            this.disconnect(
                                conn.getSource().getParent(),
                                conn.getTarget().getParent());
                            //conn.getSource().parent.removeReactiveSubscriber(
                            //    conn.getTarget().getParent().getId());
                            //conn.getTarget().parent.removeReactiveInput(
                            //    conn.getSource().getParent().getId());
                        }
                    }
                    break;
            }
        }
    },

    connect: function (source, target) {
        var sourceId = source.getId();
        var targetId = target.getId();
        var output = source.getReactiveOutput(targetId, target);
        target.setReactiveInput(sourceId, output);
    },

    disconnect: function (source, target) {
        var sourceId = source.getId();
        var targetId = target.getId();
        source.removeReactiveSubscriber(targetId);
        target.removeReactiveInput(sourceId);
    },

    createCode: function () {
        var body = "";
        var script = "";
        // First get all elements on the canvas.
        var figures = this.view.getFigures().asArray();
        for (i = 0; i < figures.length ; i++) {
            if (figures[i] instanceof draw2d.shape.frp.Input) {
                var ar = figures[i].getCode(body, script);
                body = ar[0];
                script = ar[1];
            }
        }

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
        console.log(page);
        return page;
    }
});