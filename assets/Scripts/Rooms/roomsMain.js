const com = require('Common');
cc.Class({
    extends: cc.Component,
    properties: {
        roomName: 'iog_room',
        backButton: {
            default: null,
            type: cc.Node
        },
        createRoomButton: {
            default: null,
            type: cc.Node
        },
        roomContainer: {
            default: null,
            type: cc.Node
        },
        roomPrefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad () {
        this.backButton.on('click', this.jumpStart, this);
        this.createRoomButton.on('click', this.createRoom, this);

        this.getAvailableRooms_interval = setInterval(
            this.getAvailableRooms.bind(this), 1000);
    },
    onDestroy () {
        clearInterval(this.getAvailableRooms_interval);
    },
    createRoom () {
        const _this = this;
        com.client.create(this.roomName, {
            'admin': {
                'name': com.username,
                'id': com.userid
            }
        }).then(room => {
            com.room = room;
            _this.jumpGame();
        });
    },
    getAvailableRooms () {
        const _this = this;
        com.client.getAvailableRooms(this.roomName).then(function (rooms) {
            _this.roomContainer.destroyAllChildren();
            for (let i = 0, len = rooms.length; i < len; ++ i) {
                let this_room = cc.instantiate(_this.roomPrefab);
                this_room.getComponent('roomController').roomId = rooms[i].roomId;
                this_room.parent = _this.roomContainer;
            }
        });
    },
    jumpStart () {
        cc.director.loadScene("Start");
    },
    jumpGame () {
        cc.director.loadScene("Game");
    }
});