Ext.data.JsonP.draw2d_ui_LabelEditor({"uses":[],"alternateClassNames":[],"superclasses":[],"meta":{},"mixins":[],"component":false,"tagname":"class","files":[{"href":"LabelEditor.html#draw2d-ui-LabelEditor","filename":"LabelEditor.js"}],"mixedInto":[],"members":[{"owner":"draw2d.ui.LabelEditor","meta":{},"tagname":"method","name":"constructor","id":"method-constructor"},{"owner":"draw2d.ui.LabelEditor","meta":{},"tagname":"method","name":"start","id":"method-start"}],"author":[{"email":null,"tagname":"author","name":"Andreas Herz"}],"autodetected":{},"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/draw2d.ui.LabelInplaceEditor' rel='draw2d.ui.LabelInplaceEditor' class='docClass'>draw2d.ui.LabelInplaceEditor</a></div><h4>Files</h4><div class='dependency'><a href='source/LabelEditor.html#draw2d-ui-LabelEditor' target='_blank'>LabelEditor.js</a></div></pre><div class='doc-contents'><p>Base class for all <a href=\"#!/api/draw2d.shape.basic.Label\" rel=\"draw2d.shape.basic.Label\" class=\"docClass\">draw2d.shape.basic.Label</a> editors. The default implementation is to open\na simple javascript prompt dialog.<br>\nUse LabelInplaceEditor or your own implementation if you need more comfort.</p>\n\n<pre class='inline-example preview small frame'><code>var label =  new <a href=\"#!/api/draw2d.shape.basic.Label\" rel=\"draw2d.shape.basic.Label\" class=\"docClass\">draw2d.shape.basic.Label</a>({text:\"Double Click on me\"});\n\nlabel.installEditor(new <a href=\"#!/api/draw2d.ui.LabelEditor\" rel=\"draw2d.ui.LabelEditor\" class=\"docClass\">draw2d.ui.LabelEditor</a>({\n   // called after the value has been set to the LabelFigure\n   onCommit: $.proxy(function(value){\n       alert(\"new value set to:\"+value);\n   },this),\n   // called if the user abort the operation\n   onCancel: function(){\n   }\n}));\n\ncanvas.add(label,50,10);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.ui.LabelEditor'>draw2d.ui.LabelEditor</span><br/><a href='source/LabelEditor.html#draw2d-ui-LabelEditor-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.ui.LabelEditor-method-constructor' class='name expandable'>draw2d.ui.LabelEditor</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.ui.LabelEditor\" rel=\"draw2d.ui.LabelEditor\" class=\"docClass\">draw2d.ui.LabelEditor</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Create an label editor with a dedicated callback listener ...</div><div class='long'><p>Create an label editor with a dedicated callback listener</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.ui.LabelEditor\" rel=\"draw2d.ui.LabelEditor\" class=\"docClass\">draw2d.ui.LabelEditor</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.ui.LabelEditor'>draw2d.ui.LabelEditor</span><br/><a href='source/LabelEditor.html#draw2d-ui-LabelEditor-method-start' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.ui.LabelEditor-method-start' class='name expandable'>start</a>( <span class='pre'>label</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Trigger the edit of the label text. ...</div><div class='long'><p>Trigger the edit of the label text.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>label</span> : <a href=\"#!/api/draw2d.shape.basic.Label\" rel=\"draw2d.shape.basic.Label\" class=\"docClass\">draw2d.shape.basic.Label</a><div class='sub-desc'><p>the label to edit</p>\n</div></li></ul></div></div></div></div></div></div></div>","parentMixins":[],"subclasses":["draw2d.ui.LabelInplaceEditor"],"name":"draw2d.ui.LabelEditor","requires":[],"id":"class-draw2d.ui.LabelEditor","aliases":{},"short_doc":"Base class for all draw2d.shape.basic.Label editors. ..."});