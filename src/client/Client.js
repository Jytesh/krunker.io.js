const Player = require("../structures/Player.js");
const KrunkerAPIError = require("../errors/KrunkerAPIError.js");
const ws = require("ws");
const {encode, decode} = require("msgpack-lite");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class {
    constructor (username) {
        if (!username) return;
        
        let userData; // not using async/await because <Promise>.catch is easier than try-catch
        this.fetchPlayer(username).then(u => userData = u).catch(() => {});
        
        userData.forEach((k, v) => this[k] = v);
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
                
                res(new Player(userData));
            };
        });
    }
}
