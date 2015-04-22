Ext.data.JsonP.draw2d_policy_EditPolicy({"uses":[],"alternateClassNames":[],"superclasses":[],"meta":{},"mixins":[],"component":false,"tagname":"class","files":[{"href":"EditPolicy.html#draw2d-policy-EditPolicy","filename":"EditPolicy.js"}],"mixedInto":[],"members":[{"owner":"draw2d.policy.EditPolicy","meta":{},"tagname":"method","name":"constructor","id":"method-constructor"},{"owner":"draw2d.policy.EditPolicy","meta":{},"tagname":"method","name":"onInstall","id":"method-onInstall"},{"owner":"draw2d.policy.EditPolicy","meta":{},"tagname":"method","name":"onUninstall","id":"method-onUninstall"}],"author":[{"email":null,"tagname":"author","name":"Andreas Herz"}],"autodetected":{},"html":"<div><pre class=\"hierarchy\"><h4>Subclasses</h4><div class='dependency'><a href='#!/api/draw2d.policy.canvas.CanvasPolicy' rel='draw2d.policy.canvas.CanvasPolicy' class='docClass'>draw2d.policy.canvas.CanvasPolicy</a></div><div class='dependency'><a href='#!/api/draw2d.policy.figure.FigureEditPolicy' rel='draw2d.policy.figure.FigureEditPolicy' class='docClass'>draw2d.policy.figure.FigureEditPolicy</a></div><h4>Files</h4><div class='dependency'><a href='source/EditPolicy.html#draw2d-policy-EditPolicy' target='_blank'>EditPolicy.js</a></div></pre><div class='doc-contents'><p>A pluggable contribution implementing a portion of an behavior.</p>\n\n<p>EditPolicies should determine an Canvas or figure editing capabilities. It is possible to implement\nan figure such that it handles all editing responsibility. However, it is much more flexible\nand object-oriented to use EditPolicies. Using policies, you can pick and choose the editing\nbehavior for an figure/canvas without being bound to its class hierarchy. Code management is easier.</p>\n\n<p>This interface is not intended to be implemented by clients. Clients should inherit from <a href=\"#!/api/draw2d.policy.figure.SelectionFeedbackPolicy\" rel=\"draw2d.policy.figure.SelectionFeedbackPolicy\" class=\"docClass\">draw2d.policy.figure.SelectionFeedbackPolicy</a>\nor <a href=\"#!/api/draw2d.policy.canvas.SelectionPolicy\" rel=\"draw2d.policy.canvas.SelectionPolicy\" class=\"docClass\">draw2d.policy.canvas.SelectionPolicy</a>.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.EditPolicy'>draw2d.policy.EditPolicy</span><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/draw2d.policy.EditPolicy-method-constructor' class='name expandable'>draw2d.policy.EditPolicy</a>( <span class='pre'></span> ) : <a href=\"#!/api/draw2d.policy.EditPolicy\" rel=\"draw2d.policy.EditPolicy\" class=\"docClass\">draw2d.policy.EditPolicy</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/draw2d.policy.EditPolicy\" rel=\"draw2d.policy.EditPolicy\" class=\"docClass\">draw2d.policy.EditPolicy</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onInstall' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.EditPolicy'>draw2d.policy.EditPolicy</span><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onInstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onInstall' class='name expandable'>onInstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been installed. ...</div><div class='long'><p>Called by the host if the policy has been installed.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onUninstall' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='draw2d.policy.EditPolicy'>draw2d.policy.EditPolicy</span><br/><a href='source/EditPolicy.html#draw2d-policy-EditPolicy-method-onUninstall' target='_blank' class='view-source'>view source</a></div><a href='#!/api/draw2d.policy.EditPolicy-method-onUninstall' class='name expandable'>onUninstall</a>( <span class='pre'>host</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called by the host if the policy has been uninstalled. ...</div><div class='long'><p>Called by the host if the policy has been uninstalled.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>host</span> : <a href=\"#!/api/draw2d.Canvas\" rel=\"draw2d.Canvas\" class=\"docClass\">draw2d.Canvas</a>/<a href=\"#!/api/draw2d.Figure\" rel=\"draw2d.Figure\" class=\"docClass\">draw2d.Figure</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","parentMixins":[],"subclasses":["draw2d.policy.canvas.CanvasPolicy","draw2d.policy.figure.FigureEditPolicy"],"name":"draw2d.policy.EditPolicy","requires":[],"id":"class-draw2d.policy.EditPolicy","aliases":{},"short_doc":"A pluggable contribution implementing a portion of an behavior. ..."});