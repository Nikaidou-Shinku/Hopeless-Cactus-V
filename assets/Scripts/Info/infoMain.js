cc.Class({
    extends: cc.Component,
    properties: {
        backButton: {
            default: null,
            type: cc.Node
        }
    },
    onLoad () {
        this.backButton.on('click', this.jumpStart, this);
    },
    jumpStart () {
        cc.director.loadScene("Start");
    }
});