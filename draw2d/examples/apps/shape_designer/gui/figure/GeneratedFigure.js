shape_designer.figure.GeneratedFigure = draw2d.SetFigure.extend({            
                                                          
       NAME: "shape_designer.figure.GeneratedFigure",                            
       
       
       init:function(w,h)                                 
       {                                                  
         this._super(100, 100);              
                                                          
         // Port                                    
         this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 19)); 
         // Port                                    
         this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 51)); 
         // Port                                    
         this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 78)); 
         // Port                                    
         this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.52999999999997, 51)); 
       },                                                 
                                                          
       createShapeElement : function()                    
       {                                                  
           var shape = this._super();                   
             this.originalWidth = 100;              
             this.originalHeight= 100;             
             return shape;                                
       },                                                 
                                                          
       
       createSet: function(){                             
            var set= this.canvas.paper.set();             
                                                          
            
            // ExportFrame                                 
            shape = this.canvas.paper.path("M0,0 L100,0 L100,100 L0,100");                    
            shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});                       
            set.push(shape);                              
                                                          
            // Rectangle                                 
            shape = this.canvas.paper.path('M0.46475215980225926 0.9548241215573938L99.4592884343391 0.9548241215573938L99.4592884343391 99.94936039609425L0.46475215980225926 99.94936039609425Z');                    
            shape.attr({"stroke":"#808080","stroke-width":1,"fill":"#FFFFFF","opacity":1});                       
            set.push(shape);                              
                                                          
            // Label_0b8f942d-edbd-b368-6557-c68c952dacbf                                 
            shape = this.canvas.paper.text(0,0,'&');                    
            shape.attr({"x":31,"y":51.5234375,"text-anchor":"start","text":"&","font":"10px \"Arial\"","stroke":"none","fill":"#080808","font-weight":"normal","font-size":60,"opacity":0.7,"transform":[["R",0],["T",27,14]]});                       
            set.push(shape);                              
  
            return set;                                   
       },                                                 

       /**
        * @method
        * Apply the opacity to all child set elements. Override this if you want to avoid opacity changes.
        * @private
        * 
        */
       applyAlpha: function(){
//           this.svgNodes.attr({opacity: this.alpha});
       }

}); 