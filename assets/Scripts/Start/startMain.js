cc.Class({
    extends: cc.Component,
    properties: {
        infoButton: {
            default: null,
            type: cc.Node
        },
        startButton: {
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
        this.infoButton.on('click', this.jumpInfo, this);
        this.startButton.on('click', this.jumpRooms, this);
    },
    jumpInfo () {
        cc.director.loadScene("Info");
    },
    jumpRooms () {
        cc.director.loadScene("Rooms");
    },
    // update (dt) {},
});