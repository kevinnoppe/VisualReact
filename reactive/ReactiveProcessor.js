example.ReactiveProcessor = Class.extend({

    NAME: "example.ReactiveProcessor",

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
                        //$(document).keyup(function(x) {
                        //     alert(x);
                        //});
                        //alert("Command add!");
                        //var o = Rx.Observable.timer(3000, 1000)
                        //    .take(2)
                        //    .map(function (x) {
                        //        alert("Tick");
                        //    });
                        //o.subscribe(function () {
                        //    // subscribe to the event
                        //    //alert("subscribed");
                        //});
                        //var react = event.getCommand().getFigure().getFunction();
                        //react.apply(this);
                    break;
                case draw2d.Configuration.i18n.command.connectPorts:
                    if (event.getCommand() instanceof draw2d.command.CommandConnect) {
                        //alert("New connection");
                        inputFunction = event.command.source.parent.getReactiveFunction();
                        //source = event.getCommand().getSource().getParent().getReactiveFunction();
                        event.getCommand().getTarget().getParent().setReactiveInput(inputFunction);
                        //source.subscribe(function (x) {
                        //    alert("Here?");
                        //});
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
        } else {
            switch (event.getCommand().getLabel()) {
                case draw2d.Configuration.i18n.command.deleteShape:
                    if (event.getCommand().figure instanceof draw2d.Connection) {
                        event.getCommand().figure.targetPort.parent.removeReactiveInput();
                    } else {
                        connections = event.getCommand().figure.getConnections()
                        for (c = 0; c < connections.getSize() ; c++) {
                            conn = connections.get(c);
                            conn.getSource().parent.removeReactiveInput();
                            conn.getTarget().parent.removeReactiveInput();
                        }
                    }
                    break;
            }
        }
    }
});