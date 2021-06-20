const com = require('Common');
cc.Class({
    extends: cc.Component,
    properties: {
        serverFrameAcc: 3,
        serverFrameRate: 20,
        seed: 51,
        loopInterval: null,
        frame_index: 0,
        frames: [],
        frame_inv: 0,
        localPlayer: null,

        gameNode: {
            default: null,
            type: cc.Node
        },
        mainCamera: {
            default: null,
            type: cc.Camera
        },
        playerPrefab: {
            default: null,
            type: cc.Prefab
        },
        vProgress: {
            default: null,
            type: cc.ProgressBar
        }
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.players = { };
        const _this = this;
        com.room.onMessage('f', (message) => {
            _this.onReceiveFrame(message);
        });
        com.room.onMessage('n', (message) => {
            _this.onReceiveFrame(message);
            _this.nextTick();
        });
        com.readyToControl = false;
        this.frame_inv = 0;
        cc.game.pause();
        com.room.send('n', '0');
    },
    createPlayer (message) { // TODO: 感觉好乱，以后要重构下
        let new_player = cc.instantiate(this.playerPrefab);
        let new_player_script = new_player.getComponent('Boat');
        new_player_script.sessionId = message[0];
        new_player_script.isLocal = message[0] == com.room.sessionId;
        if (new_player_script.isLocal)
            this.localPlayer = new_player;
        new_player_script.currentX = message[1];
        new_player_script.currentY = message[2];
        this.players[message[0]] = new_player_script;
        new_player.parent = this.gameNode;
    },
    onReceiveFrame (message) {
        const _this = this;
        message.forEach((frame) => {
            _this.frames[frame[0]] = frame[1];
        });
    },
    nextTick () {
        this.runTick();
        let frame_delta = this.frames.length - this.frame_index;
        if (frame_delta > 100) {
            this.frame_inv = 0;
        } else if (frame_delta > this.serverFrameAcc) {
            this.frame_inv = 0;
        } else {
            if (!com.readyToControl) {
                com.readyToControl = true;
                com.room.send('n', '1');
            } this.frame_inv = 1000 / (this.serverFrameRate * (this.serverFrameAcc - 1));
        } setTimeout(this.nextTick.bind(this), this.frame_inv);
    },
    runTick () {
        let frame = null;
        if (this.frames.length > 1) {
            frame = this.frames[this.frame_index];
            if (frame === undefined)
                frame = [];
        } let len = frame.length;
        let seed = frame[0];
        for (let i = 1; i < len; ++ i) {
            let this_opt = frame[i];
            if (this_opt[1].addPlayer)
                this.createPlayer([this_opt[0], this_opt[1].random_X, this_opt[1].random_Y]);
            else this.players[this_opt[0]].updateState(this_opt[1])
        } for (let this_player in this.players)
            this.players[this_player].updateFrame();
        ++ this.frame_index;
        if (this.localPlayer) {
            let pScript = this.localPlayer.getComponent('Boat');
            this.mainCamera.node.x = this.localPlayer.x;
            this.mainCamera.node.y = this.localPlayer.y;
            this.vProgress.progress = (pScript.currentVelocity * 6 + 1) / 5;
        } cc.game.step();
    },
    seededRandom(max = 1, min = 0) {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        let rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    }
});