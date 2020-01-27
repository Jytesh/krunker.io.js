const ws = require("ws");
const fetch = require("node-fetch");
const { encode, decode } = require("msgpack-lite");
const { Collection } = require("discord.js");

const Player = require("../structures/Player.js");
const Game = require("../structures/Game.js");
const Changelog = require("../structures/Changelog.js");
const Weapon = require("../structures/Weapon.js");
const Class = require("../structures/Class.js");

const KrunkerAPIError = require("../errors/KrunkerAPIError.js");
const ArgumentError = require("../errors/ArgumentError.js");

Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class Client {
    constructor() {
        this._cache = new Collection();
        Object.defineProperty(this, "_updateCache", {
            value: async () => {
                const usernames = this._cache.keyArray().map(d => d.username);
            
                for(const un of usernames) {
                    const u = await this.fetchPlayer(un);
                    this._cache.set(u.username + "_" + u.id, u);
                }
            },
            writable: false
        });
    }
    _connectToSocket() {
        this.ws = new ws("wss://krunker_social.krunker.io/ws", {
            handshakeTimeout: 10000
        });
    }
    _disconnectFromSocket() {
        if (this.ws && this.ws.readyState === 1) this.ws.close();
    }
    fetchPlayer(username) {
        this._connectToSocket();
        return new Promise((res, rej) => {
            if (!username) return rej(new ArgumentError("No username given."));
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
                this._cache.set(p.username + "_" + p.id, p);
                res(p);
            };
        });
    }
    getPlayer(nameOrID) {
        if (!nameOrID) throw new ArgumentError("No name or ID given");
        const u = this._cache.find(obj => [obj.id, obj.username].includes(nameOrID));
        if (!u) return this.fetchPlayer(nameOrID);
        this._updateCache();
        return u;
    }
    fetchGame(id) {
        return new Promise(async (res, rej) => {
            if (!id) return rej(new ArgumentError("No ID given"));
            [ id ] = `${id}`.match(/[A-Z]{2,3}:[a-z0-9]{5}/) || [];
            if (!id) return rej(new ArgumentError("Invalid ID given"));
            const r = await fetch("https://matchmaker.krunker.io/game-info?game=" + id);
            if (!r.ok) rej(new KrunkerAPIError("Invalid ID given"));
            res(new Game(await r.json()));
        });
    }
    fetchChangelog() {
        return new Promise(async r => r(new Changelog(await (await fetch("https://krunker.io/docs/versions.txt")).text())));
    }
    getClass(name) {
        return new Class(name);
    }
    getWeapon(name) {
        return new Weapon(name);
    }
}
