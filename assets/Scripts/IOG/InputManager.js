const net = require('NetManager');
cc.Class({
    extends: cc.Component,
    properties: { },
    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    start () {
        this.currentGearV = 0;
        this.currentGearA = 0;
        this.sendData = { };
    },
    sendCMD () {
        net.room.send(['a', this.sendData]);
        this.sendData = { };
    },
    checkGearV () {
        if (this.currentGearV > 4)
            this.currentGearV = 4;
        if (this.currentGearV < -1)
            this.currentGearV = -1;
    },
    checkGearA () {
        if (this.currentGearA > 2)
            this.currentGearA = 2;
        if (this.currentGearA < -2)
            this.currentGearA = -2;
    },
    onGearV (delta) {
        this.currentGearV += delta;
        this.checkGearV();
        this.sendData['currentGearV'] = this.currentGearV;
        this.sendCMD();
    },
    onGearA (delta) {
        this.currentGearA += delta;
        this.checkGearA();
        this.sendData['currentGearA'] = this.currentGearA;
        this.sendCMD();
    },
    onKeyDown (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                this.onGearV(1);
                break;
            case cc.macro.KEY.s:
                this.onGearV(-1);
                break;
            case cc.macro.KEY.a:
                this.onGearA(1);
                break;
            case cc.macro.KEY.d:
                this.onGearA(-1);
                break;
        }
    }
});