shape_designer.dialog.FigureCode = Class.extend(
{
    NAME : "shape_designer.dialog.FigureCode", 

    init:function(){
     },

	show:function(){
		var writer = new shape_designer.FigureWriter();
		
		writer.marshal(app.view, "testShape",function(js){
		   
	        var splash = $(
	                '<pre id="test_code" class="prettyprint">'+
                    js+
	                '</div>'+
	                ' <div id="test_close"><img src="icons/dialog_close.png"/></div>'
	                );
	        splash.hide();
	        $("body").append(splash);

	         
	         $("#test_close").on("click",function(){
	             splash.fadeOut(function(){
	                 splash.remove();
	             });
	         });
	         prettyPrint();
	         
	         splash.fadeIn();		    
		});
	}

      
});  