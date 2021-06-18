cc.Class({
    extends: cc.Component,
    properties: {
        backButton: {
            default: null,
            type: cc.Node
        },
        roomContainer: {
            default: null,
            type: cc.Node
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start () {
        this.backButton.on('click', this.jumpStart, this);
    },
    jumpStart () {
        cc.director.loadScene("Start");
    },
    // update (dt) {},
});