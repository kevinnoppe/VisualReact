// declare the namespace for this example
var shape_designer = {
		figure:{
			
		},
		filter:{
			
		},
		dialog:{
			
		},
		policy:{
			
		}
};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 */

shape_designer.Application = Class.extend(
{
    NAME : "shape_designer.Application", 

    
    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
    {
        
        draw2d.Configuration.color.resizeHandle="#26B4A8";
        draw2d.Configuration.color.vertexHandle="#26B4A8";
        
     
        this.fileName = null;
        
	      this.view    = new shape_designer.View("canvas");
          this.toolbar = new shape_designer.Toolbar("toolbar",  this.view );
          this.layer   = new shape_designer.Layer("layer_elements", this.view );
          this.filter  = new shape_designer.FilterPane("filter_actions", this.view );
          if(typeof Ti !== "undefined"){
              // TideSDK envoriment
              this.filePicker = new draw2d.storage.TideSDKStorage();
          }
          else{
              // WebBrowser envoroment
              this.filePicker = new draw2d.storage.GoogleDrive();
  //            this.filePicker = new draw2d.storage.LocalFileStorage();
          }
          
  //        this.view.add(new shape_designer.figure.GeneratedFigure(),100,100);
  //        this.view.add(new shape_designer.figure.GeneratedFigure(),200,100);
          this.view.installEditPolicy(new shape_designer.policy.SelectionToolPolicy());
             

           // special drag drop handling for the TideSDK enviroment
           if(typeof Ti !=="undefined"){
               $("#toolbar").mousedown ( function ( event )
               {
                   event.preventDefault();
                   if(!Ti.UI.getMainWindow().isMaximized())
                   {
                       var diffX = event.pageX;
                       var diffY = event.pageY;
    
                       $(document).mousemove ( function ( event )
                       {
                           event.preventDefault();
                           if (event.screenY - diffY < screen.height-100)
                           Ti.UI.getMainWindow().moveTo(event.screenX - diffX, event.screenY - diffY);
                       });
                   }
               });
    
               $(document).mouseup ( function ( event )
               {
                   event.preventDefault();
                   $(document).unbind('mousemove');
               });
    
               $("#toolbar").dblclick ( function ( event )
               {
                   event.preventDefault();
                   if (!Ti.UI.getMainWindow().isMaximized())
                       Ti.UI.getMainWindow().maximize();
                   else
                       Ti.UI.getMainWindow().unmaximize();
               });
           }
           about.hide();
 	},
	
	fileOpen: function( openCallback, errorCallback, abortCallback){
        this.filePicker.pickFileAndLoad(
          // file pattern
          "draw2d",
          // success callback
          //
          $.proxy(function(file, fileData){
            try{
                this.view.clear();
                var reader = new draw2d.io.json.Reader();
                reader.unmarshal(this.view, fileData);
                this.fileName = file.title;
                document.title = file.title;
                this.view.getCommandStack().markSaveLocation();
                openCallback();
            }
            catch(e){
                this.view.reset();
                errorCallback();
            }
          },this),
          // abort callback
          //
          abortCallback);
	},
	
	fileSave: function(saveCallback, errorCallback, abortCallback){

	    var _export = $.proxy(function(baseName){
            baseName = baseName.replace(".draw2d","");
            
            // Save the PNG file first
            //
            new draw2d.io.png.Writer().marshal(this.view, $.proxy(function(dataUrl, base64Image){
                var imageName =baseName+".png";
                this.filePicker.saveFile(imageName, base64Image, true, $.proxy(function(){
                    $.bootstrapGrowl(imageName+" saved");
  
                    // Save the json 
                    //
                    new draw2d.io.json.Writer().marshal(this.view,$.proxy(function(json, base64Content){
                        var jsonName =baseName+".draw2d";
                        this.filePicker.saveFile(jsonName, JSON.stringify(json, null, 2), false, $.proxy(function(fileHandle){
                            this.fileName = fileHandle.title;
                            $.bootstrapGrowl(jsonName+" saved");
 
                            // save the JS file
                            //
                            new shape_designer.FigureWriter().marshal(this.view, baseName, $.proxy(function(js, jsBase64){
                                var jsName =baseName+".js";
                                this.filePicker.saveFile(jsName, js, false, $.proxy(function(){
                                     $.bootstrapGrowl(jsName+" saved");
                                     saveCallback();
                                },this),errorCallback);
                            },this));
                        },this),errorCallback);
                    },this));
                    
                },this), errorCallback);
            },this), this.view.exportFrames.first().getBoundingBox());
        },this);
        
        if(this.fileName === null){
            this.filePicker.promptForFilename(_export,abortCallback);
        }
        else{
            _export(this.fileName);
        }
	}


});
