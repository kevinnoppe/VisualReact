/*****************************************
 *   Library is under GPL License (GPL)
 *   Copyright (c) 2012 Andreas Herz
 ****************************************//**
 * @class draw2d.ui.TextInput
 * @author Kevin Noppe
 * @extends draw2d.ui.LabelEditor
*/

draw2d.ui.TextBox =  draw2d.ui.LabelEditor.extend({
    
    /**
     * @constructor
     * @private
     */
    init: function(listener){
        this._super();
        
        // register some default listener and override this with the handover one 
        this.listener = $.extend({onCommit:function(){}, onCancel:function(){}},listener);
    },
    
    /**
     * @method
     * Trigger the creation of the text input box.
     * 
     * @param {draw2d.shape.frp.KeyboardInput} keyboardInput The keyboardInput object
     */
    start: function (keyboardInput) {
        this.keyboardInput = keyboardInput;

        this.closeCallback = $.proxy(this.stop,this);
        
        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click",this.closeCallback);
      
        // append the input field to the document and register 
        // the ENTER and ESC key to commit /cancel the operation
        //
        this.html = $('<input id="textInput">');
        this.html.val("");
        this.html.hide();
        
        $("body").append(this.html);
        
        this.html.autoResize({animate:false});
        
        this.html.bind("keyup",$.proxy(function(e){
            switch (e.which) {
            case 27:
                 this.stop();
                 break;
            }
            this.keyboardInput.keyUp(e);
         },this));
        
        this.html.bind("blur", this.closeCallback);
         
         // avoid commit of the operation if we click inside the editor
         //
         this.html.bind("click",function(e){
             e.stopPropagation();
             e.preventDefault();
         });

        // Position the INPUT and init the autoresize of the element
        //
         var canvas = this.keyboardInput.getCanvas();
         var bb = this.keyboardInput.getBoundingBox();

        bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x,bb.y));

        // remove the scroll from the body if we add the canvas directly into the body
        var scrollDiv = canvas.getScrollArea();
        if(scrollDiv.is($("body"))){
           bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
        }
        
        bb.translate(-1,-1);
        bb.resize(2,2);
               
        this.html.css({position:"absolute","top": bb.y, "left":bb.x, "min-width":bb.w*(1/canvas.getZoom()), "height":Math.max(25,bb.h*(1/canvas.getZoom()))});
        this.html.fadeIn($.proxy(function(){
            this.html.focus();
        },this));
    },
    
    /**
     * @method
     * Close the input textbox and remove all references.<br>
     * Remove the editor.<br>
     * @private
     */
    stop: function(){
        this.html.unbind("blur",this.closeCallback);
        $("body").unbind("click",this.closeCallback);
        this.html.fadeOut($.proxy(function(){
            this.html.remove();
            this.html = null;
        },this));
        
    }
});

