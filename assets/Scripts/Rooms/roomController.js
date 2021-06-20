const com = require('Common');
cc.Class({
    extends: cc.Component,
    properties: {
        roomId: '',
        joinButton: {
            default: null,
            type: cc.Node
        }
    },
    onLoad () {
        this.joinButton.on('click', this.joinRoom, this);
    },
    joinRoom () {
        com.client.joinById(this.roomId).then(room => {
            com.room = room;
            cc.director.loadScene("Game");
        });
    }
});