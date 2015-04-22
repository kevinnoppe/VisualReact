draw2d.policy.canvas.MouseClickPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: 'draw2d.policy.canvas.MouseClickPolicy',

    init: function () {
        this._super();
    },

    onClick: function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
        this._super(figure, mouseX, mouseY, shiftKey, ctrlKey);
        //alert("MouseClickPolicy click:" + mouseX + "," + mouseY);
        if (figure !== null) {
            figure.click(mouseX, mouseY, shiftKey, ctrlKey);
        }
    },

    onDoubleClick: function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
        this._super(figure, mouseX, mouseY, shiftKey, ctrlKey);
        if (figure !== null) {
            figure.doubleClick(mouseX, mouseY, shiftKey, ctrlKey);
        }
    }
});