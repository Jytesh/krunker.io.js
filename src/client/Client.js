const ws = require("ws");
const {encode, decode} = require("msgpack-lite");
const {Collection} = require("discord.js"); // credit to discord.js for Collections, a better version of JS Maps (discord.js.org)

const Player = require("../structures/Player.js");
const KrunkerAPIError = require("../errors/KrunkerAPIError.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class {
    async constructor (username) {
        this._cache = new Collection();
        this._updateCache = () => {
            const usernames = this._cache.keyArray().map(d => d.username);
            
            for (const un in usernames) {
                const u = await this.fetchPlayer(un);
                this._cache.set({
                    id: u.id,
                    username: u.username
                }, u);
            }
        };
        
        if (username) {
        
            let userData; // not using async-await because <Promise>.catch is easier than try-catch
            this.fetchPlayer(username).then(u => userData = u).catch(() => {});
        
            userData.forEach((k, v) => this[k] = v);
        }
    }
    connectToSocket () {
        this.ws = new ws("wss://krunker_social.krunker.io/ws", {
            handshakeTimeout: 10000
        });
    }
    disconnectFromSocket () {
        if (this.ws && this.ws.readyState === 1) this.ws.close();
    }
    
    fetchPlayer (username) {
        if (!username) throw new RangeError("No username given.");
        
        this.connectToSocket();
        
        return new Promise((res, rej) => {
            this.ws.onopen = () => this.ws.send(encode(["r", ["profile", username, "000000", null]]).buffer);
            this.ws.onerror = (err) => {
                this.ws.terminate();
                rej(err);
            };
            
            this.socket.onmessage = buffer => {
                const userData = decode(new Uint8Array(buffer.data))[1][2];
                this.disconnectFromSocket();
                
                if (!userData || !userData.player_stats) return rej(new KrunkerAPIError("Player not found"));
                
                const p = new Player(userData);
                this._cache.set({
                    id: p.id,
                    username: p.username
                }, p);
                res(p);
            };
        });
    }
    
    // using get methods are not recommended because only cached (fetched) users are avaliable
    getUser (nameOrID) {
        const cachedIDs = this._cache.keyArray().map(d => d.id);
        const cachedNames = this._cache.keyArray().map(d => d.username);
        
        let u = cachedIDs.find(id => nameOrID === id);
        if (!u) u = cachedNames.find(n => n === nameOrID);
        
        if (!u) return new Error("Requested user not cached - use fetchPlayer instead");
        
        u = this._cache.get(u);
        
        this._updateCache();
        return u;
    }
}
