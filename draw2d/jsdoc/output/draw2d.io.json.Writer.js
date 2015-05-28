Ext.data.JsonP.draw2d_io_json_Writer({"uses":[],"alternateClassNames":[],"superclasses":["draw2d.io.Writer"],"extends":"draw2d.io.Writer","meta":{},"mixins":[],"component":false,"tagname":"class","files":[{"href":"Writer.html#draw2d-io-json-Writer","filename":"Writer.js"}],"mixedInto":[],"members":[{"owner":"draw2d.io.Writer","meta":{"private":true},"tagname":"method","name":"constructor","id":"method-constructor"},{"owner":"draw2d.io.Writer","meta":{},"tagname":"method","name":"formatXml","id":"method-formatXml"},{"owner":"draw2d.io.json.Writer","meta":{},"tagname":"method","name":"marshal","id":"method-marshal"}],"author":[{"email":null,"tagname":"author","name":"Andreas Herz"}],"autodetected":{},"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='docClass'>draw2d.io.Writer</a><div class='subclass '><strong>draw2d.io.json.Writer</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Writer.html#draw2d-io-json-Writer' target='_blank'>Writer.js</a></div></pre><div class='doc-contents'><p>Serialize the canvas document into a JSON object which can be read from the corresponding\n<a href=\"#!/api/draw2d.io.json.Reader\" rel=\"draw2d.io.json.Reader\" class=\"docClass\">draw2d.io.json.Reader</a>.</p>\n\n<pre><code> // Create a JSON writer and convert it into a JSON-String representation.\n //\n var writer = new <a href=\"#!/api/draw2d.io.json.Writer\" rel=\"draw2d.io.json.Writer\" class=\"docClass\">draw2d.io.json.Writer</a>();\n writer.marshal(canvas, function(json){\n    // convert the json object into string representation\n    var jsonTxt = JSON.stringify(json,null,2);\n\n    // insert the json string into a DIV for preview or post\n    // it via ajax to the server....\n    $(\"#json\").text(jsonTxt);\n\n });\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='defined-in docClass'>draw2d.io.Writer</a><br/><a href='source/Writer4.html#draw2d-io-Writer-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.io.Writer-method-constructor' class='name expandable'>draw2d.io.json.Writer</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.io.Writer\" rel=\"draw2d.io.Writer\" class=\"docClass\">draw2d.io.Writer</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.io.Writer\" rel=\"draw2d.io.Writer\" class=\"docClass\">draw2d.io.Writer</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-formatXml' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.io.Writer' rel='draw2d.io.Writer' class='defined-in docClass'>draw2d.io.Writer</a><br/><a href='source/Writer4.html#draw2d-io-Writer-method-formatXml' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.io.Writer-method-formatXml' class='name expandable'>formatXml</a>( <span class='pre'>xml</span> ) : String<span class=\"signature\"></span></div><div class='description'><div class='short'>utility method to format a given XML string. ...</div><div class='long'><p>utility method to format a given XML string.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>xml</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-marshal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.io.json.Writer'>draw2d.io.json.Writer</span><br/><a href='source/Writer.html#draw2d-io-json-Writer-method-marshal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.io.json.Writer-method-marshal' class='name expandable'>marshal</a>( <span class='pre'>canvas, resultCallback</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Export the content to the implemented data format. ...</div><div class='long'><p>Export the content to the implemented data format. Inherit class implements\ncontent specific writer.\n<br>\n<br></p>\n\n<p>Method signature has been changed from version 2.10.1 to version 3.0.0.<br>\nThe parameter <b>resultCallback</b> is required and new. The method calls\nthe callback instead of return the result.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>canvas</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a><div class='sub-desc'>\n</div></li><li><span class='pre'>resultCallback</span> : Function<div class='sub-desc'><p>the method to call on success. The first argument is the result object, the second the base64 representation of the file content</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>json</span> : Object<div class='sub-desc'><p>the canvas document as JSON object</p>\n</div></li><li><span class='pre'>base64</span> : String<div class='sub-desc'><p>the canvas document as base encoded JSON</p>\n</div></li></ul></div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.io.Writer-method-marshal\" rel=\"draw2d.io.Writer-method-marshal\" class=\"docClass\">draw2d.io.Writer.marshal</a></p></div></div></div></div></div></div></div>","parentMixins":[],"subclasses":[],"name":"draw2d.io.json.Writer","requires":[],"id":"class-draw2d.io.json.Writer","aliases":{},"short_doc":"Serialize the canvas document into a JSON object which can be read from the corresponding\ndraw2d.io.json.Reader. ..."});