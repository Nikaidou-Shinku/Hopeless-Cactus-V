const com = require('Common');
cc.Class({
    extends: cc.Component,
    properties: {
        sessionId: '',
        isLocal: false,
        addV: false,
        addA: false,

        radar: 12000, // 雷达半径
        accelerationV: 1 / 6, // 最大加速度
        accelerationA: 1 / 6, // 最大角加速度
        currentVelocity: 0, // 当前速度
        currentAngularVelocity: 0, // 当前角速度
        currentGearV: 0, // 当前速度挡位
        currentGearA: 0, // 当前角度挡位
        currentX: 0, // 当前位置 - x
        currentY: 0, // 当前位置 - y
        currentAngle: 90, // 当前角度
        maxHealth: 500, // 最大生命值
        currentHealth: 500 // 当前生命值
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
    },
    onGearA (delta) {
        this.currentGearA += delta;
        this.checkGearA();
    },
    updateState (opt) {
        if (opt['currentGearV'] !== undefined)
            this.currentGearV = opt['currentGearV'];
        if (opt['currentGearA'] !== undefined)
            this.currentGearA = opt['currentGearA'];
    },
    doAddV (aim_V) {
        let currentAcceleration = 0;
        if (this.currentVelocity < aim_V) {
            currentAcceleration = this.accelerationV;
            this.addV = true;
        } if (this.currentVelocity > aim_V) {
            currentAcceleration = -this.accelerationV;
            this.addV = false;
        } this.currentVelocity += currentAcceleration;
    },
    checkV (aim_V) {
        if (this.addV) {
            if (this.currentVelocity > aim_V)
                this.currentVelocity = aim_V;
        } else {
            if (this.currentVelocity < aim_V)
                this.currentVelocity = aim_V;
        }
    },
    doAddA (aim_A) {
        let currentAcceleration = 0;
        if (this.currentAngularVelocity < aim_A) {
            currentAcceleration = this.accelerationA;
            this.addA = true;
        } if (this.currentAngularVelocity > aim_A) {
            currentAcceleration = -this.accelerationA;
            this.addA = false;
        } this.currentAngularVelocity += currentAcceleration;
    },
    checkA (aim_A) {
        if (this.addA) {
            if (this.currentAngularVelocity > aim_A)
                this.currentAngularVelocity = aim_A;
        } else {
            if (this.currentAngularVelocity < aim_A)
                this.currentAngularVelocity = aim_A;
        }
    },
    calcVA () {
        let aim_V = this.currentGearV / 6;
        this.doAddV(aim_V);
        this.checkV(aim_V);

        let aim_A = this.currentGearA * 3 / 4;
        this.doAddA(aim_A);
        this.checkA(aim_A);
    },
    updateFrame () {
        this.calcVA();
        this.currentAngle += this.currentAngularVelocity;
        this.currentX += this.currentVelocity * Math.cos(
            com.jiao2hu(this.currentAngle));
        this.currentY += this.currentVelocity * Math.sin(
            com.jiao2hu(this.currentAngle));
        this.node.x = this.currentX;
        this.node.y = this.currentY;
        this.node.angle = this.currentAngle - 90;
    }
});