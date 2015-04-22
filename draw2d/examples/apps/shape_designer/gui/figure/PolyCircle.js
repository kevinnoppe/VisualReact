shape_designer.figure.PolyCircle = shape_designer.figure.ExtPolygon.extend({

    NAME: "shape_designer.figure.PolyCircle",

    init:function(center, radius)
    {
      this._super();
    
      this.sides = 36;
      
      if(typeof center === "undefined"){
          this.vertices   = new draw2d.util.ArrayList();
          this.addVertex(new draw2d.geo.Point(100,100) );
          this.addVertex(new draw2d.geo.Point(140,100) );
          this.addVertex(new draw2d.geo.Point(140,140) );
          this.addVertex(new draw2d.geo.Point(100,140) );
      }
      else{
          this.vertices   = new draw2d.util.ArrayList();
          for (var i = 0; i < this.sides; i++){
              var radian = 2 * Math.PI * i / this.sides;
              var x = Math.cos( radian )*radius+center.x;
              var y = Math.sin( radian )*radius+center.y;
              this.addVertex(new draw2d.geo.Point(x,y) );
          }
      }
      
      this.setUserData({name:"Circle"});
    }
});
