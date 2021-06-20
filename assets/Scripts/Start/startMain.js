var com = require('Common');
cc.Class({
    extends: cc.Component,
    properties: {
        ip: 'localhost',
        port: 2567,
        infoButton: {
            default: null,
            type: cc.Node
        },
        startButton: {
            default: null,
            type: cc.Node
        },
        nameInputer: {
            default: null,
            type: cc.EditBox
        }
    },
    onLoad () {
        this.infoButton.on('click', this.jumpInfo, this);
        this.startButton.on('click', this.jumpRooms, this);

        com.client = new Colyseus.Client(`ws://${ this.ip }:${ this.port }`);
    },
    start () {
        com.userid = Math.round(Math.random() * 998244353);
    },
    jumpInfo () {
        cc.director.loadScene("Info");
    },
    jumpRooms () {
        let name = this.nameInputer.string;
        if (name == '') return;
        com.username = name;
        cc.director.loadScene("Rooms");
    }
});