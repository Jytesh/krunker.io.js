const ws = require("ws"); // socket for fetching players
const req = require("request"); // fetching games
const { encode, decode } = require("msgpack-lite"); // encoding and decoding for the socket
const { Collection } = require("discord.js"); // credit to discord.js for Collections, a better version of JS Maps (discord.js.org)

 // more organized than the recieved data
const Player = require("../structures/Player.js");
const Game = require("../structures/Game.js");

// errors
const KrunkerAPIError = require("../errors/KrunkerAPIError.js");
const ArgumentError = require("../errors/ArgumentError.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

/**
 * The Client class which lets you interact with the Krunker API.
 */
module.exports = class Client {
    constructor () {
        this._cache = new Collection();
        this._updateCache = async () => {
            const usernames = this._cache.keyArray().map(d => d.username);
            
            for (const un in usernames) {
                const u = await this.fetchPlayer(un);
                this._cache.set({
                    id: u.id,
                    username: u.username
                }, u);
            }
        };
    }
    _connectToSocket () {
        this.ws = new ws("wss://krunker_social.krunker.io/ws", {
            handshakeTimeout: 10000
        });
    }
    _disconnectFromSocket () {
        if (this.ws && this.ws.readyState === 1) this.ws.close();
    }
    
    /**
     * A method for getting a player's data.
     * @param {String} username the username of the desired player.
     * @returns {Promise<Player>}
     * @example
     * client.fetchPlayer("1s3k3b").then(p => console.log(`1s3k3b's K/D is ${p.kdr}`))
     */
    fetchPlayer (username) {
        if (!username) throw new ArgumentError("No username given.");
        
        this._connectToSocket();
        
        return new Promise((res, rej) => {
            this.ws.onopen = () => this.ws.send(encode(["r", ["profile", username, "000000", null]]).buffer);
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };
            
            this.ws.onmessage = buffer => {
                const userData = decode(new Uint8Array(buffer.data))[1][2];
                this._disconnectFromSocket();
                
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
    /*
     * Gets a user by name or ID from the client's cache. Using this is not recommended, because cache builds up over time.
     * @param {string|number} nameOrID the name or ID of the desired player
     * @returns {?Player}
     */
    getUser (nameOrID) {
        if (!nameOrID) throw new ArgumentError("No name or ID given.");
     
        const cachedIDs = this._cache.keyArray().map(d => d.id);
        const cachedNames = this._cache.keyArray().map(d => d.username);
        
        let u = cachedIDs.find(id => nameOrID === id);
        if (!u) u = cachedNames.find(n => n === nameOrID);
        
        if (!u) return new Error("Requested user not cached - use fetchPlayer instead");
        
        u = this._cache.get(u);
        
        this._updateCache();
        return u;
    }
    
    /**
     * Gets info about a game.
     * @param {string} id The ID of the game - the part in the game's URL after ?game=
     * @returns {Game}
     */
    fetchGame (id) {
        if (!id) throw new ArgumentError("No ID given");
        id = id.match(/[A-Z]{2,}:[a-z0-9]+/g);
        if (!id) return new ArgumentError("Invalid ID given");
        
        return new Promise((res, rej) => {
            req("https://matchmaker.krunker.io/game-info?game=" + id, (err, _, body) => {
                body = JSON.parse(body);
                if (!body[0]) return rej(new KrunkerAPIError("Game not found"));
                
                res(new Game(body));
            });
        });
    }
}
