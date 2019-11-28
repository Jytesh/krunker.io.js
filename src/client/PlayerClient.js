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

/**
 * A Client for a single player, including a lot of events.
 * @extends {EventEmitter}
 */
module.exports = class PlayerClient extends EventEmitter {
    /**
     * @param {string|Player} usernameOrPlayer the desired player's username or Player object
     */
    async constructor (usernameOrPlayer = "1s3k3b") {
        super();
        /**
         * The client's player.
         * @private
         * @type {Player}
         */
        const username = usernameOrPlayer instanceof Player ? usernameOrPlayer.username : usernameOrPlayer;
        this._player = await new Client().fetchPlayer(username);
        
        if (!this._player) return;
        
        setInterval(async () => {
            const oldPlayer = this._player;
            
            this._player = await new Client().fetchPlayer(username);
            
            if (oldPlayer === this._player) return;
            
            this._player.forEach((k, v) => {
                this[k] = v;
            });
            
            const diff = getDifference(oldPlayer, this._player);
            
            if (diff.level) this.emit("levelUp", diff.level.new);
            if (diff.lastPlayedClass) this.emit("classSwitch", diff.lastPlayedClass.old, diff.lastPlayedClass.new);
            if (diff.stats) {
                const stats = diff.stats;
                
                /* TODO: fix this for non-hitscans */ if (stats.shots) this.emit("shoot", stats.kills ? true : false, stats.hits ? true : false);
                if (stats.kills) this.emit("kill", this._player.lastPlayedClass);
                if (stats.deaths) this.emit("die", this._player.lastPlayedClass);
                if (stats.wins) this.emit("win", this._player.lastPlayedClass);
                if (stats.losses) this.emit("lose", this._player.lastPlayedClass);
            }
        }, 1000);
    }
}
