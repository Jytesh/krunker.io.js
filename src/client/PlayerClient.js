const EventEmitter = require("events");

const Player = require("../structures/Player.js");
const Client = require("./Client.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

const getDifference = (obj1, obj2) => {
    const differences = {};
    
    obj1.forEach((k, v) => {
        if (obj1[k] !== obj2[k]) differences[k] = {
            old: obj1[k],
            new: obj2[k]
        };
    });
    
    return differences;
};

/*
 * A Client for a single player, including a lot of events.
 * @extends {EventEmitter}
 */
module.exports = class PlayerClient extends EventEmitter {
    /*
     * @param {string|Player} usernameOrPlayer the desired player's username or Player object
     */
    async constructor (usernameOrPlayer = "1s3k3b") {
        super();
        /*
         * The client's player.
         * @private
         * @type {Player}
         */
        this._player = await new Client().fetchPlayer(usernameOrPlayer.username);
        
        if (!this._player) return;
        
        setInterval(async () => {
            const oldPlayer = this._player;
            
            this._player = await new Client().fetchPlayer(usernameOrPlayer.username);
            
            if (oldPlayer === this._player) return;
            
            const diff = getDifference(oldPlayer, this._player);
            
            if (diff.level) this.emit("levelUp", diff.level.new);
            if (diff.lastPlayedClass) this.emit("classSwitch", diff.lastPlayedClass.old, diff.lastPlayedClass.new);
            if (diff.stats) {
            
            }
        }, 1000);
    }
}
