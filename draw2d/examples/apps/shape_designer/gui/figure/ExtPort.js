shape_designer.figure.ExtPort = draw2d.shape.basic.Circle.extend({
    
    NAME: "shape_designer.figure.ExtPort",
    
    isExtFigure: true,

    init:function()
    {
      this._super(10);

      this.setUserData({
    	  name:"Port",
    	  type:"Hybrid"
    		  });
      
      this.filters   = new draw2d.util.ArrayList();
      this.filters.add( new shape_designer.filter.PositionFilter());
      this.filters.add( new shape_designer.filter.PortTypeFilter());

      this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },
    

    setInputType: function(type){
    	this.getUserData().type = type;
    },
    
    getInputType: function(){
    	return this.getUserData().type;
    },

    
    getPotentialFilters: function(){
        return [
                {label:"Port Type", impl:"shape_designer.filter.PortTypeFilter"}
                ];
    },

    removeFilter:function(filter){
      this.filters.remove(filter);  
    },

    addFilter:function(filter){
        var alreadyIn = false;
        
        this.filters.each($.proxy(function(i,e){
            alreadyIn = alreadyIn || (e.NAME===filter.NAME);
        },this));
        if(alreadyIn===true){
            return; // silently
        }
        
        this.filters.add(filter);  
        filter.onInstall(this);
        this.repaint();
    },
      
    
    /**
     * @method
     * Trigger the repaint of the element.
     * 
     */
    repaint:function(attributes)
    {
        if(this.shape===null){
            return;
        }

        if(typeof attributes === "undefined"){
            attributes = {};
        }
        
         
        
        this.filters.each($.proxy(function(i,filter){
            filter.apply(this, attributes);
        },this));
        
        this._super(attributes);
    },

    getPersistentAttributes : function()
    {   
        var memento = this._super();
        
        memento.filters = [];
        this.filters.each($.proxy(function(i,e){
            var filterMemento = e.getPersistentAttributes(this);
            memento.filters.push(filterMemento);
        },this));
 
        return memento;
    },
    
    setPersistentAttributes : function( memento)
    {
        this._super(memento);
        

        if(typeof memento.filters !=="undefined"){
            this.filters = new draw2d.util.ArrayList();
            $.each(memento.filters, $.proxy(function(i,e){
                var filter = eval("new "+e.name+"()");
                filter.setPersistentAttributes(this, e);
                this.filters.add(filter);
            },this));
        }
    }
});
