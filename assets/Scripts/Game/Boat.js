cc.Class({
    extends: cc.Component,
    properties: {
        radar: 12000, // 雷达半径
        accelerationV: 100, // 最大加速度
        accelerationA: 100, // 最大角加速度
        currentVelocity: 0, // 当前速度
        currentAngle: 90, // 当前角度
        currentGearV: 0, // 当前速度挡位
        currentGearA: 0, // 当前角度挡位
        currentX: 0, // 当前位置 - x
        currentY: 0, // 当前位置 - y

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

    },
    update (dt) {

    }
});