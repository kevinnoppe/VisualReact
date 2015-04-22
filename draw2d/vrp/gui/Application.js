// declare the namespace for this example
var example = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
example.Application = Class.extend(
{
    NAME : "example.Application", 

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
    {
	      this.view    = new example.View("canvas");
	      this.toolbar = new example.Toolbar("toolbar", this.view);

	      this.defaultRouterClassName = "draw2d.layout.connection.ManhattanBridgedConnectionRouter";
	      this.defaultRouter = new draw2d.layout.connection.ManhattanBridgedConnectionRouter();
	       
	       // layout FIRST the body
	       this.appLayout = $('#container').layout({
	   	     west: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#navigation"
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#content"
	            }
	       });
	      
	       //
	       this.contentLayout = $('#content').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	       
    },

    // Since there is not yet an easy way to enforce connection routing
    // on all connections, we use the example given by the framework
    // to create a changeable router for all connections by overriding
    // the createConnection method.
    setDefaultRouterClassName: function(defaultRouterClassName){
        this.defaultRouterClassName = defaultRouterClassName;
        this.defaultRouter = eval("new "+this.defaultRouterClassName+"()");
    },
	
    createConnection: function(sourcePort, targetPort){
        var conn = new draw2d.Connection();
        conn.setRouter(this.defaultRouter);
        conn.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
        return conn;
    }

});
