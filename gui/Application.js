// declare the namespace for the environment
var VisualReact = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
VisualReact.Application = Class.extend(
{
    NAME: "VisualReact.Application",

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init: function () {
        this.view = new VisualReact.View("canvas");
        this.toolbar = new VisualReact.Toolbar("toolbar", this.view);
        this.reactiveProcessor = new VisualReact.ReactiveProcessor(this.view);

        // We link the application with the language we want
        reactiveLanguage = new RxJS();
        variableName = new VariableNames();

        this.defaultRouterClassName = "draw2d.layout.connection.DirectRouter";
        this.defaultRouter = new draw2d.layout.connection.DirectRouter();

        // layout FIRST the body
        this.appLayout = $('#container').layout({
            west: {
                resizable: true,
                closable: true,
                resizeWhileDragging: true,
                paneSelector: "#navigation"
            },
            center: {
                resizable: true,
                closable: true,
                resizeWhileDragging: true,
                paneSelector: "#content"
            },
            east: {
                resizable: true,
                closable: true,
                resizeWhileDragging: true,
                spacing_open: 0,
                spacing_closed: 0,
                paneSelector: "#reactive-html"
            }
        });

        //
        this.contentLayout = $('#content').layout({
            north: {
                resizable: false,
                closable: false,
                spacing_open: 0,
                spacing_closed: 0,
                size: 50,
                paneSelector: "#toolbar"
            },
            center: {
                resizable: false,
                closable: false,
                spacing_open: 0,
                spacing_closed: 0,
                paneSelector: "#canvas"
            }
        });

        this.htmlLayout = $('#reactive-html').layout({
            north: {
                resizable: true,
                closable: false,
                resizeWhileDragging: true,
                size: 300,
                paneSelector: "#reactive-html-content"
            },
            center: {
                resizable: false,
                closable: false,
                spacing_open: 0,
                spacing_closed: 0,
                paneSelector: "#reactive-html-code"
            }
        });

        //var inRed = new draw2d.shape.frp.Input({ x: 15, y: 15 });
        //inRed.setLabel("RedClickStream");
        //inRed.setType("Rx.Observable.fromEvent($red, 'click')");
        //this.view.add(inRed);
        //var inBlue = new draw2d.shape.frp.Input({ x: 100, y: 15 });
        //inBlue.setLabel("BlueClickStream");
        //this.view.add(inBlue);
        //var inYellow = new draw2d.shape.frp.Input({ x: 200, y: 15 });
        //inYellow.setLabel("YellowClickStream");
        //this.view.add(inYellow);
        //var inGreen = new draw2d.shape.frp.Input({ x: 300, y: 15 });
        //inGreen.setLabel("GreenClickStream");
        //this.view.add(inGreen);

        //var acMerge = new draw2d.shape.frp.Action({ x: 150, y: 100 });
        //acMerge.setLabel("Merge");
        //this.view.add(acMerge);

        //var connRedMerge = createConnection(inRed.getOutputPort, acMerge.getInputPort);
        //this.view.add(connRedMerge);
    },

    getNodes: function () {
        return this.view.getNodes();
    },

    // Since there is not yet an easy way to enforce connection routing
    // on all connections, we use the example given by the framework
    // to create a changeable router for all connections by overriding
    // the createConnection method.
    setDefaultRouterClassName: function (defaultRouterClassName) {
        this.defaultRouterClassName = defaultRouterClassName;
        this.defaultRouter = eval("new " + this.defaultRouterClassName + "()");
    },

    createConnection: function (sourcePort, targetPort) {
        var conn = new draw2d.Connection();
        conn.setRouter(this.defaultRouter);
        conn.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        return conn;
    }

});
