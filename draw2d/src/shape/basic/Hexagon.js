/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************/
/**
 * @class draw2d.shape.basic.Hexagon
 * A Hexagon Figure.
 * 
 * See the example:
 *
 *     @example preview small frame
 *     
 *     var d1 =  new draw2d.shape.basic.Hexagon({x:10,y:10});
 *     var d2 =  new draw2d.shape.basic.Hexagon({x:100,y:10, bgColor:"#f0f000", alpha:0.7, width:100, height:60});
 *     
 *     canvas.add(d1);
 *     canvas.add(d2);
 *     
 *     canvas.setCurrentSelection(d2);
 *     
 * @author Kevin Noppe
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Hexagon = draw2d.shape.basic.Polygon.extend({
    NAME: "draw2d.shape.basic.Hexagon",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr, setter, getter) {
      this._super($.extend({bgColor:"#00a3f6",color:"#1B1B1B"},attr), setter, getter);
      
      var pos = this.getPosition();
      
      this.resetVertices();
      
      var box = this.getBoundingBox();
      this.addVertex(box.w * (1 / 5) , 0);      // Go to the top left.
      this.addVertex(box.w * (4 / 5), 0);       // ...top right
      this.addVertex(box.w, box.h / 2);         // ...right middle...
      this.addVertex(box.w * (4 / 5), box.h);   // ...bottom right...
      this.addVertex(box.w * (1 / 5), box.h);   // ...bottom left...
      this.addVertex(0, box.h / 2);             // ...left middle...
      
      // override the selection handler from the polygon. Because the vertices of 
      // the diamond are not selectable and modifiable
      //
      this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

      this.setPosition(pos);
    }

    
});