
TrapezoidFigure = draw2d.shape.basic.Polygon.extend({

    init : function(attr)
    {
        this._super($.extend({bgColor:"#00a3f6",color:"#1B1B1B"},attr));
        
        this.resetVertices();
        
        var box = this.getBoundingBox();
        
        this.addVertex(0, 0);                   // Start at the left top
        this.addVertex(box.w, 0);               // Go to the right top
        this.addVertex(box.w * (2 / 3), box.h); // Go to the right middle bottom
        this.addVertex(box.w * (1 / 3), box.h); // Go to the left middle bottom

        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

        this.setPosition(box.getTopLeft());
    }

});
