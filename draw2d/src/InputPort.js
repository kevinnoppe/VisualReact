/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.InputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 * 
 * @author Andreas Herz
 * @extend draw2d.Port
 */ 
draw2d.InputPort = draw2d.Port.extend({

    NAME : "draw2d.InputPort",

    /**
     * @constructor
     * Create a new InputPort element
     * 
     * @param {Object} [attr] the configuration of the shape
     */
    init: function( attr)
    {
        this._super( attr);
        
        // responsive for the arrangement of the port 
        // calculates the x/y coordinates in relation to the parent node
        this.locator=new draw2d.layout.locator.InputPortLocator();
    },


    /**
     * @inheritdoc
     */
    onDragLeave:function( figure)
    {
      if(figure instanceof draw2d.OutputPort){
        this._super( figure);
      }
      
      else if(figure instanceof draw2d.HybridPort){
          this._super( figure);
      }
    },
    
    
    /**
     * @inheritdoc
     */
    createCommand:function( request)
    {
       // Connect request between two ports
       //
       if(request.getPolicy() ===draw2d.command.CommandType.CONNECT)  {
           return new draw2d.command.CommandConnect(request.canvas,request.source,request.target, request.source);
       }
    
       // ...else call the base class
       return this._super(request);
    }
});