/**
 * @class example.connection_labeledit.LabelConnection
 * 
 * A simple Connection with a label wehich sticks in the middle of the connection..
 *
 * @author Andreas Herz
 * @extend draw2d.Connection
 */
var MyConnection= draw2d.Connection.extend({
    
    NAME: "MyConnection",  /* required for JSON read/write */
    
    init:function(attr)
    {
      this._super(attr);
    },

    /**
     * @method 
     * Return an objects with all important attributes for XML or JSON serialization
     * 
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        // add your custom attributes here!!!
        // e.g. the source and target decoration
        //
        
        if(this.sourceDecorator!==null){
            memento.source.decoration = this.sourceDecorator.NAME;
        }
        
        if(this.targetDecorator!==null){
            memento.target.decoration = this.targetDecorator.NAME;
        }

        return memento;
    },
    
    /**
     * @method 
     * Read all attributes from the serialized properties and transfer them into the shape.
     * 
     * @param {Object} memento
     * @returns 
     */
    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        
        // restore your custom attributes here
        if(typeof memento.target.decoration !=="undefined" && memento.target.decoration!=null){
            this.setTargetDecorator( eval("new "+memento.target.decoration));
        }

        if(typeof memento.source.decoration !=="undefined" && memento.source.decoration!=null){
            this.setSourceDecorator( eval("new "+memento.source.decoration));
        }
    }
});
