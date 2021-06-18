cc.Class({
    extends: cc.Component,
    properties: {
        ip: 'localhost',
        port: 2567,
        roomName: 'iog_room',
        serverFrameAcc: 3,
        serverFrameRate: 20,
        players: [],
        client: null,
        room: null,
        gamePrefab: {
            default: null,
            type: cc.Prefab
        },
        gameContainer: {
            default: null,
            type: cc.Node
        },
        seed: 51,
        readyToControl: false,
        loopInterval: null,
        frame_index: 0,
        frames: [],
        frame_inv: 0,

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
    onLoad () {
        this.client = new Colyseus.Client(`ws://${ this.ip }:${ this.port }`);
        this.getAvailableRooms();
    },
    getAvailableRooms () {
        const _this = this;
        this.client.getAvailableRooms(this.roomName, function (rooms, err) {
            if (err) console.error(err);
            _this.node.emit('getAvailableRooms', {rooms: rooms});
        });
    },
    createRoom () {
        this.joinRoom();
    },
    joinRoom () {
        this.room = this.client.join(this.roomName);
        this.room.onJoin.add(this.onJoinRoom.bind(this));
        this.room.onStateChange.add(function (state) {
            console.log('initial room state:', state);
        });
        this.room.onMessage.add(this.onMessage.bind(this));
    },
    onJoinRoom () {
        this.node.emit('roomJoined', {
            room_id: this.room.id,
            room_session: this.room.sessionId
        });
        this.startGame();
    },
    close () {
        this.client.close(this.client.id);
    },
    startGame () {
        this.readyToControl = false;
        this.players = [];
        let gameNode = cc.instantiate(this.gamePrefab);
        this.frame_inv = 0;
        this.gameContainer.addChild(gameNode);
        cc.game.psuse();
        this.sendToRoom(['n']);
        setInterval(this.sendCMD.bind(this), 1000 / this.serverFrameRate);
    },
    sendCMD() {

    },
    onMessage (message) {
        switch(message[0]) {
            case 'f':
                break;
            case 'n':
                break;
            default:
                console.log('接收到未处理的message:');
                console.log(message);
                break;
        }
    },
    // start () { },
    // update (dt) {},
    seededRandom(max = 1, min = 0) {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        let rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    }
});