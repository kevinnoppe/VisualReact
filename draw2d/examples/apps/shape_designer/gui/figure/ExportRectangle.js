shape_designer.figure.ExportRectangle = draw2d.shape.basic.Rectangle.extend({

    NAME:  "shape_designer.figure.ExportRectangle",
    COLOR: "#303030",
    
    init:function(attr)
    {
      this._super($.extend({width:256, height:256},attr));
      
      // The label of the export mask
      //
      this.topLeftLocator = new draw2d.layout.locator.Locator(this);
      this.topLeftLocator.relocate = $.proxy(function(index, target){
             var targetBoundingBox = target.getBoundingBox();
             target.setPosition(-0.6,-(targetBoundingBox.h));
      },this.topLeftLocator);
      this.label = new draw2d.shape.basic.Label({text:"Export"});
      this.label.setRadius(0);
      this.label.setFontSize(12);
      this.label.setBackgroundColor(this.COLOR);
      this.label.setStroke(0);
      this.label.setPadding(5);
      this.label.addCssClass("highlight");
      this.label.repaint = $.proxy(function(attributes) {
          if(this.svgNodes===null || this.shape===null){
              return;
          } 
          this.svgNodes.attr({cursor:"move"});
          this.shape.attr({cursor:"move"});
          draw2d.shape.basic.Label.prototype.repaint.call(this, attributes);
      }, this.label);
      this.add(this.label, this.topLeftLocator);   
      
      // The dimension label of the mask
      //
      this.bottomLeftLocator = new draw2d.layout.locator.Locator(this);
      this.bottomLeftLocator.relocate = $.proxy(function(index, target){
          var parent = target.getParent();
          var boundingBox = parent.getBoundingBox();
          target.setPosition(-0.6,boundingBox.h);
      },this.bottomLeftLocator);
      this.dimLabel = new draw2d.shape.basic.Label({text:"30x20px"});
      this.dimLabel.setRadius(0);
      this.dimLabel.setFontSize(9);
      this.dimLabel.setBackgroundColor(null);
      this.dimLabel.setFontColor(this.COLOR);
      this.dimLabel.setStroke(0);
      this.dimLabel.addCssClass("highlight");
      this.dimLabel.installEditor(new draw2d.ui.LabelInplaceEditor({onCommit: $.proxy(function(text){
          var dims = text.replace(" ","").replace(",","x").replace("px","").replace("X","x").split("x");
          var w = parseInt(dims[0]);
          var h = parseInt(dims[1]);
          if(!(isNaN(w) || isNaN(h))){
              this.setDimension(w,h);
          }
          else{
              this.setDimension(this.getWidth(), this.getHeight());
          }
      },this)}));
      this.dimLabel.repaint = $.proxy(function(attributes) {
          if(this.svgNodes===null || this.shape===null){
              return;
          }
          this.svgNodes.attr({cursor:"pointer"});
          this.shape.attr({cursor:"pointer"});
          draw2d.shape.basic.Label.prototype.repaint.call(this, attributes);
      }, this.dimLabel);
      // start inplace edit with a single click
      this.dimLabel.on("click", $.proxy(function(){this.onDoubleClick();},this.dimLabel));

      this.add(this.dimLabel, this.bottomLeftLocator);   

      // the highlight (darken) mask 
      //
      this.mask =  new draw2d.VectorFigure();
      this.mask.repaint = $.proxy(function(attributes) {
              if(this.shape===null){
                  return;
              }
              
              if (typeof attributes === "undefined") {
                  attributes = {};
              }
              var maskBox = this.parent.getBoundingBox();
              attributes.path  = ' M 0 0'+
                                 ' L 0 '+this.canvas.initialHeight+ 
                                 ' L '+this.canvas.initialWidth+' '+this.canvas.initialHeight+
                                 ' L '+this.canvas.initialWidth+' 0'+
                                 ' Z '+
                                 ' M '+maskBox.x+" "+maskBox.y+
                                 ' l '+maskBox.w+" 0"+ 
                                 ' l 0 '+maskBox.h+
                                 ' l -'+maskBox.w+' 0'+
                                 ' Z';
              draw2d.VectorFigure.prototype.repaint.call(this,attributes);
          },this.mask);
      
      this.mask.createShapeElement = $.proxy(function(){return this.canvas.paper.path(""); },this.mask);
      this.mask.setAlpha(0.2);
      this.mask.setBackgroundColor("#a0a0a0");
      this.add(this.mask, this.topLeftLocator);   

      
      this.setBackgroundColor(null);
      this.setColor(this.COLOR);
      this.setStroke(0.6);
      this.setRadius(0);
      this.setDeleteable(false);
      
      // simple selection feedback without marching ants lines
      this.installEditPolicy(new draw2d.policy.figure.ResizeSelectionFeedbackPolicy());
   },
   
   setDimension:function(w,h){
       this._super(w,h);
       if(this.dimLabel)
       this.dimLabel.setText(w+" x "+h+" px");
   },
   
   setVisible: function(flag){
       this._super(flag);
       this.label.setVisible(flag);
       this.mask.setVisible(flag);
       this.dimLabel.setVisible(flag);
   },
   
   toFront: function(){
       this._super();
       this.mask.toFront();
       this.label.toFront();
       this.dimLabel.toFront();
   },
   
   /**
    * redirect the hitTest to the label. Only this one is the dragDrop handle
    */
   hitTest: function(){
       return this.label.hitTest.apply(this.label,arguments);
   }
   
});
