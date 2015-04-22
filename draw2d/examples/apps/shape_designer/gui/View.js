

shape_designer.View = draw2d.Canvas.extend({
	
	init:function(id){
		this._super(id, 2000,2000);
		this.clippboardFigure=null;
		this.setScrollArea("#"+id);
		
		this.currentDropConnection = null;
		
        this.installEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy(20,1,"#FF4981"));
        this.installEditPolicy( new draw2d.policy.canvas.SnapToGeometryEditPolicy());
        this.installEditPolicy( new draw2d.policy.canvas.FadeoutDecorationPolicy());
        
        Mousetrap.bind(['ctrl+c', 'command+c'], $.proxy(function (event) {
            var primarySelection = this.getSelection().getPrimary();
            if(primarySelection!=null){
                this.clippboardFigure = primarySelection.clone();
                this.clippboardFigure.translate(5,5);
            }
            return false;
        },this));

        Mousetrap.bind(['ctrl+v', 'command+v'], $.proxy(function (event) {
           if(this.clippboardFigure!=null){
               var cloneToAdd = this.clippboardFigure.clone();
               var command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition());
               this.getCommandStack().execute(command);
               this.setCurrentSelection(cloneToAdd);
           }
           return false;
        },this));

        var setZoom = $.proxy(function(factor){
            var newZoom = this.getZoom()*factor;
            $("#canvas_zoom_normal").text((parseInt((1.0/newZoom)*100))+"%");
            this.setZoom(newZoom,true);
        },this);
        
        // Inject the ZoomIn Button and the callbacks
        //
        $("#canvas_zoom_in").on("click",function(){
            setZoom(1.2);
        });
 
        // Inject the OneToOne Button
        //
        $("#canvas_zoom_normal").on("click",$.proxy(function(){
            this.setZoom(1.0, true);
            $("#canvas_zoom_normal").text("100%");
        },this));
      
        // Inject the ZoomOut Button and the callback
        //
        $("#canvas_zoom_out").on("click",$.proxy(function(){
            setZoom(0.8);
        },this));
        
        $("#canvas_config_grid").bootstrapSwitch();
        $('#canvas_config_grid').on('switchChange', $.proxy(function (e, data) {
           if(data.value){
                this.installEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy(20,1,"#FF4981"));
            }
            else{
                this.uninstallEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy(20,1,"#FF4981"));
            }
          },this));
        $("#canvas_config_frame").bootstrapSwitch();
        $('#canvas_config_frame').on('switchChange', $.proxy(function (e, data) {
            this.exportFrames.each(function(i,frame){
                frame.setVisible(data.value);
            });
          },this));
        
        $("#canvas_config_items").on("click",$.proxy(function(e){
            e.stopPropagation();
        },this));
        

        this.reset();
	},

	/**
	 * @method
	 * Reset the view/canvas and starts with a clean and new document with default decorations
	 * 
	 * 
	 */
	reset: function(){
        this.clear();
        this.add(new shape_designer.figure.ExportRectangle(),100,100);
	},
	
	/**
	 * Reset the view without any decorations. This is good before loading a document
	 * 
	 */
	clear: function(){
	    this._super();
        this.exportFrames = new draw2d.util.ArrayList();
	},
	
    getExtFigure: function(id){
        var figure = null;
        this.getExtFigures().each(function(i,e){
            if(e.id===id){
                figure=e;
                return false;
             }
        });
        return figure;
    },

    getExtFigures: function(){
	    var figures = this.getFigures().clone();
	    
	    // the export rectangles are not part of the document itself. In this case we
	    // filter them out
	    //
	    figures.grep(function(figure){
	        return (typeof figure.isExtFigure  !=="undefined");
	    });
	    
	    var lines = this.getLines().clone();
	    lines.grep(function(line){
            return (typeof line.isExtFigure  !=="undefined");
        });
	    
	    figures.addAll(lines);
	    
	    return figures;
	},
	
	
	add: function(figure, x,y){
	    this._super(figure, x,y);
	    
	    if(figure instanceof shape_designer.figure.ExportRectangle){
	        this.exportFrames.add(figure);
	    }
	    
	    this.exportFramesToFront();
	},
	
    exportFramesToFront: function(){
        this.exportFrames.each( function(index, frame){ 
            frame.toFront();
        });
    },
    
    hideDecoration: function(){
        this.uninstallEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy());
        this.exportFrames.each( function(index, frame){ 
            frame.setVisible(false);
        });
        this.getFigures().each( function(index, figure){ 
            figure.unselect();
        });
    },
    
    showDecoration: function(){
        this.installEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy());
        this.exportFrames.each( function(index, frame){ 
            frame.setVisible(true);
            frame.toFront();
        });
    }
});

