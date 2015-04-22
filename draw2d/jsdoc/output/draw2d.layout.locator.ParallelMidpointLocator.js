Ext.data.JsonP.draw2d_layout_locator_ParallelMidpointLocator({"uses":[],"alternateClassNames":[],"superclasses":["draw2d.layout.locator.Locator","draw2d.layout.locator.ConnectionLocator"],"extends":"draw2d.layout.locator.ConnectionLocator","meta":{},"mixins":[],"component":false,"tagname":"class","files":[{"href":"ParallelMidpointLocator.html#draw2d-layout-locator-ParallelMidpointLocator","filename":"ParallelMidpointLocator.js"}],"mixedInto":[],"members":[{"owner":"draw2d.layout.locator.ParallelMidpointLocator","meta":{},"tagname":"method","name":"constructor","id":"method-constructor"},{"owner":"draw2d.layout.locator.Locator","meta":{},"tagname":"method","name":"clone","id":"method-clone"},{"owner":"draw2d.layout.locator.ParallelMidpointLocator","meta":{},"tagname":"method","name":"relocate","id":"method-relocate"}],"since":"4.4.4","author":[{"email":null,"tagname":"author","name":"Andreas Herz"}],"autodetected":{},"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/draw2d.layout.locator.Locator' rel='draw2d.layout.locator.Locator' class='docClass'>draw2d.layout.locator.Locator</a><div class='subclass '><a href='#!/api/draw2d.layout.locator.ConnectionLocator' rel='draw2d.layout.locator.ConnectionLocator' class='docClass'>draw2d.layout.locator.ConnectionLocator</a><div class='subclass '><strong>draw2d.layout.locator.ParallelMidpointLocator</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/ParallelMidpointLocator.html#draw2d-layout-locator-ParallelMidpointLocator' target='_blank'>ParallelMidpointLocator.js</a></div></pre><div class='doc-contents'><p>A ParallelMidpointLocator that is used to place label at the midpoint of a  routed\nconnection. The midpoint is always in the center of an edge.\nThe label is aligned to the connection angle.</p>\n        <p>Available since: <b>4.4.4</b></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.locator.ParallelMidpointLocator'>draw2d.layout.locator.ParallelMidpointLocator</span><br/><a href='source/ParallelMidpointLocator.html#draw2d-layout-locator-ParallelMidpointLocator-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.layout.locator.ParallelMidpointLocator-method-constructor' class='name expandable'>draw2d.layout.locator.ParallelMidpointLocator</a>( <span class='pre'>distanceFromConnection</span> ) : <a href=\"#!/api/draw2d.layout.locator.ParallelMidpointLocator\" rel=\"draw2d.layout.locator.ParallelMidpointLocator\" class=\"docClass\">draw2d.layout.locator.ParallelMidpointLocator</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Constructs a ManhattanMidpointLocator with associated Connection c. ...</div><div class='long'><p>Constructs a ManhattanMidpointLocator with associated Connection c.</p>\n\n<p>if the parameter <b>distanceFromConnection</b> is less than zero the label is\nplaced above of the connection. Else the label is below the connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>distanceFromConnection</span> : Number<div class='sub-desc'><p>the distance of the label to the connection.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.layout.locator.ParallelMidpointLocator\" rel=\"draw2d.layout.locator.ParallelMidpointLocator\" class=\"docClass\">draw2d.layout.locator.ParallelMidpointLocator</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.layout.locator.ConnectionLocator-method-constructor\" rel=\"draw2d.layout.locator.ConnectionLocator-method-constructor\" class=\"docClass\">draw2d.layout.locator.ConnectionLocator.constructor</a></p></div></div></div><div id='method-clone' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/draw2d.layout.locator.Locator' rel='draw2d.layout.locator.Locator' class='defined-in docClass'>draw2d.layout.locator.Locator</a><br/><a href='source/Locator.html#draw2d-layout-locator-Locator-method-clone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.locator.Locator-method-clone' class='name expandable'>clone</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Return a clone of the locator object ...</div><div class='long'><p>Return a clone of the locator object</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-relocate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.layout.locator.ParallelMidpointLocator'>draw2d.layout.locator.ParallelMidpointLocator</span><br/><a href='source/ParallelMidpointLocator.html#draw2d-layout-locator-ParallelMidpointLocator-method-relocate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.layout.locator.ParallelMidpointLocator-method-relocate' class='name expandable'>relocate</a>( <span class='pre'>index, target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Relocates the given Figure always in the center of an edge. ...</div><div class='long'><p>Relocates the given Figure always in the center of an edge.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>index</span> : Number<div class='sub-desc'><p>child index of the target</p>\n</div></li><li><span class='pre'>target</span> : <a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'><p>The figure to relocate</p>\n</div></li></ul><p>Overrides: <a href=\"#!/api/draw2d.layout.locator.Locator-method-relocate\" rel=\"draw2d.layout.locator.Locator-method-relocate\" class=\"docClass\">draw2d.layout.locator.Locator.relocate</a></p></div></div></div></div></div></div></div>","parentMixins":[],"subclasses":[],"name":"draw2d.layout.locator.ParallelMidpointLocator","requires":[],"id":"class-draw2d.layout.locator.ParallelMidpointLocator","aliases":{},"short_doc":"A ParallelMidpointLocator that is used to place label at the midpoint of a  routed\nconnection. ..."});