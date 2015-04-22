Ext.data.JsonP.draw2d_policy_canvas_ExtendedKeyboardPolicy({"uses":[],"alternateClassNames":[],"superclasses":["draw2d.policy.EditPolicy","draw2d.policy.canvas.CanvasPolicy","draw2d.policy.canvas.KeyboardPolicy"],"extends":"draw2d.policy.canvas.KeyboardPolicy","meta":{},"mixins":[],"component":false,"tagname":"class","files":[{"href":"ExtendedKeyboardPolicy.html#draw2d-policy-canvas-ExtendedKeyboardPolicy","filename":"ExtendedKeyboardPolicy.js"}],"mixedInto":[],"members":[{"owner":"draw2d.policy.canvas.ExtendedKeyboardPolicy","meta":{},"tagname":"method","name":"constructor","id":"method-constructor"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{},"tagname":"method","name":"createMonochromGif","id":"method-createMonochromGif"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onClick","id":"method-onClick"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onDoubleClick","id":"method-onDoubleClick"},{"owner":"draw2d.policy.EditPolicy","meta":{},"tagname":"method","name":"onInstall","id":"method-onInstall"},{"owner":"draw2d.policy.canvas.ExtendedKeyboardPolicy","meta":{"private":true},"tagname":"method","name":"onKeyDown","id":"method-onKeyDown"},{"owner":"draw2d.policy.canvas.KeyboardPolicy","meta":{"private":true},"tagname":"method","name":"onKeyUp","id":"method-onKeyUp"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{},"tagname":"method","name":"onMouseDown","id":"method-onMouseDown"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onMouseDrag","id":"method-onMouseDrag"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onMouseMove","id":"method-onMouseMove"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onMouseUp","id":"method-onMouseUp"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{"template":true},"tagname":"method","name":"onRightMouseDown","id":"method-onRightMouseDown"},{"owner":"draw2d.policy.EditPolicy","meta":{},"tagname":"method","name":"onUninstall","id":"method-onUninstall"},{"owner":"draw2d.policy.canvas.CanvasPolicy","meta":{},"tagname":"method","name":"snap","id":"method-snap"}],"author":[{"email":null,"tagname":"author","name":"Andreas Herz"}],"autodetected":{},"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='docClass'>draw2d.policy.EditPolicy</a><div class='subclass '><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='docClass'>draw2d.policy.canvas.CanvasPolicy</a><div class='subclass '><a href='#!/api/draw2d.policy.canvas.KeyboardPolicy' rel='draw2d.policy.canvas.KeyboardPolicy' class='docClass'>draw2d.policy.canvas.KeyboardPolicy</a><div class='subclass '><strong>draw2d.policy.canvas.ExtendedKeyboardPolicy</strong></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/ExtendedKeyboardPolicy.html#draw2d-policy-canvas-ExtendedKeyboardPolicy' target='_blank'>ExtendedKeyboardPolicy.js</a></div></pre><div class='doc-contents'><p>Extended keyboard policy to <b>delete</b> and <b>group</b> figures in the canvas.\n<br>\nKeyboard commands</p>\n\n<ul>\n   <li>DEL    - delete selection</li>\n   <li>Ctrl+G - group/ungroup selection</li>\n   <li>Ctrl+B - send current selection in the background (toBack)</li>\n   <li>Ctrl+F - send current selection in the foreground (toFront)</li>\n</ul>\n\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.ExtendedKeyboardPolicy'>draw2d.policy.canvas.ExtendedKeyboardPolicy</span><br/><a href='source/ExtendedKeyboardPolicy.html#draw2d-policy-canvas-ExtendedKeyboardPolicy-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.policy.canvas.ExtendedKeyboardPolicy-method-constructor' class='name expandable'>draw2d.policy.canvas.ExtendedKeyboardPolicy</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.policy.canvas.ExtendedKeyboardPolicy\" rel=\"draw2d.policy.canvas.ExtendedKeyboardPolicy\" class=\"docClass\">draw2d.policy.canvas.ExtendedKeyboardPolicy</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.policy.canvas.ExtendedKeyboardPolicy\" rel=\"draw2d.policy.canvas.ExtendedKeyboardPolicy\" class=\"docClass\">draw2d.policy.canvas.ExtendedKeyboardPolicy</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.KeyboardPolicy-method-constructor\" rel=\"draw2d.policy.canvas.KeyboardPolicy-method-constructor\" class=\"docClass\">draw2d.policy.canvas.KeyboardPolicy.constructor</a></p></div></div></div><div id='method-createMonochromGif' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-createMonochromGif' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-createMonochromGif' class='name expandable'>createMonochromGif</a>( <span class='pre'>w, h, d, color</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Helper method to make an monochrome GIF image WxH pixels big, first create a properly sized array: var pixels = new A...</div><div class='long'><p>Helper method to make an monochrome GIF image WxH pixels big, first create a properly sized array: var pixels = new Array(W<em>H);.\nThen, for each pixel X,Y that should be opaque, store a 1 at the proper location: pixels[X+Y</em>W] = 1;.\nFinally, create the image: var my_glif = createGif(W, H, pixels, color);\n\"0\" pixels are transparent.\nThe <b>color</b> defines the foreground color.</p>\n\n<p>Now, you can specify this image as the SRC attribute of an IMG tag: document.write(\"<IMG SRC=\\\"\" + my_glif + \"\\\">\");\nor for the canvas as background-image css attribute.</IMG></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>w</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>h</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>d</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>color</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onClick' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onClick' class='name expandable'>onClick</a>( <span class='pre'>the, mouseX, mouseY, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called by the canvas if the user click on a figure. ...</div><div class='long'><p>Called by the canvas if the user click on a figure.</p>\n        <p>Available since: <b>3.0.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>the</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>figure under the click event. Can be null</p>\n</div></li><li><span class='pre'>mouseX</span> : Number<div class='sub-desc'><p>the x coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>mouseY</span> : Number<div class='sub-desc'><p>the y coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onDoubleClick' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onDoubleClick' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onDoubleClick' class='name expandable'>onDoubleClick</a>( <span class='pre'>the, mouseX, mouseY, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called by the canvas if the user double click on a figure. ...</div><div class='long'><p>Called by the canvas if the user double click on a figure.</p>\n        <p>Available since: <b>4.1.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>the</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>figure under the double click event. Can be null</p>\n</div></li><li><span class='pre'>mouseX</span> : Number<div class='sub-desc'><p>the x coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>mouseY</span> : Number<div class='sub-desc'><p>the y coordinate of the mouse during the click event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onInstall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='defined-in docClass'>draw2d.policy.EditPolicy</a><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onInstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onInstall' class='name expandable'>onInstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been installed. ...</div><div class='long'><p>Called by the host if the policy has been installed.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onKeyDown' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.canvas.ExtendedKeyboardPolicy'>draw2d.policy.canvas.ExtendedKeyboardPolicy</span><br/><a href='source/ExtendedKeyboardPolicy.html#draw2d-policy-canvas-ExtendedKeyboardPolicy-method-onKeyDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.ExtendedKeyboardPolicy-method-onKeyDown' class='name expandable'>onKeyDown</a>( <span class='pre'>canvas, keyCode, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback if the user press a key ...</div><div class='long'><p>Callback if the user press a key</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'><p>the related canvas</p>\n</div></li><li><span class='pre'>keyCode</span> : Number<div class='sub-desc'><p>the pressed key</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.policy.canvas.KeyboardPolicy-method-onKeyDown\" rel=\"draw2d.policy.canvas.KeyboardPolicy-method-onKeyDown\" class=\"docClass\">draw2d.policy.canvas.KeyboardPolicy.onKeyDown</a></p></div></div></div><div id='method-onKeyUp' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.KeyboardPolicy' rel='draw2d.policy.canvas.KeyboardPolicy' class='defined-in docClass'>draw2d.policy.canvas.KeyboardPolicy</a><br/><a href='source/KeyboardPolicy.html#draw2d-policy-canvas-KeyboardPolicy-method-onKeyUp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.KeyboardPolicy-method-onKeyUp' class='name expandable'>onKeyUp</a>( <span class='pre'>canvas, keyCode, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Callback if the user release a key ...</div><div class='long'><p>Callback if the user release a key</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'><p>the related canvas</p>\n</div></li><li><span class='pre'>keyCode</span> : Number<div class='sub-desc'><p>the pressed key</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onMouseDown' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseDown' class='name expandable'>onMouseDown</a>( <span class='pre'>canvas, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onMouseDrag' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onMouseDrag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseDrag' class='name expandable'>onMouseDrag</a>( <span class='pre'>canvas, dx, dy, dx2, dy2</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>dx</span> : Number<div class='sub-desc'><p>The x diff between start of dragging and this event</p>\n</div></li><li><span class='pre'>dy</span> : Number<div class='sub-desc'><p>The y diff between start of dragging and this event</p>\n</div></li><li><span class='pre'>dx2</span> : Number<div class='sub-desc'><p>The x diff since the last call of this dragging operation</p>\n</div></li><li><span class='pre'>dy2</span> : Number<div class='sub-desc'><p>The y diff since the last call of this dragging operation</p>\n</div></li></ul></div></div></div><div id='method-onMouseMove' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onMouseMove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseMove' class='name expandable'>onMouseMove</a>( <span class='pre'>canvas, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onMouseUp' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onMouseUp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onMouseUp' class='name expandable'>onMouseUp</a>( <span class='pre'>figure, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>the shape below the mouse or null</p>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onRightMouseDown' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-onRightMouseDown' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-onRightMouseDown' class='name expandable'>onRightMouseDown</a>( <span class='pre'>figure, x, y, shiftKey, ctrlKey</span> )<span class=\"signature\"><span class='template' >template</span></span></div><div class='description'><div class='short'>Called if the user press the right mouse in the canvas. ...</div><div class='long'><p>Called if the user press the right mouse in the canvas.</p>\n        <p>Available since: <b>4.4.0</b></p>\n      <div class='rounded-box template-box'>\n      <p>This is a <a href=\"#!/guide/components\">template method</a>.\n         a hook into the functionality of this class.\n         Feel free to override it in child classes.</p>\n      </div>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a>|<a href=\"#!/api/draw2d.shape.basic.Line\" rel=\"draw2d.shape.basic.Line\" class=\"docClass\">draw2d.shape.basic.Line</a><div class='sub-desc'><p>the figure below the mouse</p>\n</div></li><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>the x-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>the y-coordinate of the mouse down event</p>\n</div></li><li><span class='pre'>shiftKey</span> : Boolean<div class='sub-desc'><p>true if the shift key has been pressed during this event</p>\n</div></li><li><span class='pre'>ctrlKey</span> : Boolean<div class='sub-desc'><p>true if the ctrl key has been pressed during the event</p>\n</div></li></ul></div></div></div><div id='method-onUninstall' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.EditPolicy' rel='draw2d.policy.EditPolicy' class='defined-in docClass'>draw2d.policy.EditPolicy</a><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onUninstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onUninstall' class='name expandable'>onUninstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been uninstalled. ...</div><div class='long'><p>Called by the host if the policy has been uninstalled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-snap' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='defined-in docClass'>draw2d.policy.canvas.CanvasPolicy</a><br/><a href='source/CanvasPolicy.html#draw2d-policy-canvas-CanvasPolicy-method-snap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.canvas.CanvasPolicy-method-snap' class='name expandable'>snap</a>( <span class='pre'>figure, clientPos</span> ) : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Adjust the coordinates to the given constraint. ...</div><div class='long'><p>Adjust the coordinates to the given constraint.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>figure</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>clientPos</span> : <a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.geo.Point\" rel=\"draw2d.geo.Point\" class=\"docClass\">draw2d.geo.Point</a></span><div class='sub-desc'><p>the contraint position of th efigure</p>\n</div></li></ul></div></div></div></div></div></div></div>","parentMixins":[],"subclasses":[],"name":"draw2d.policy.canvas.ExtendedKeyboardPolicy","requires":[],"id":"class-draw2d.policy.canvas.ExtendedKeyboardPolicy","aliases":{},"short_doc":"Extended keyboard policy to delete and group figures in the canvas. ..."});