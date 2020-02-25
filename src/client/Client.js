const ws                 = require("ws");
const fetch              = require("node-fetch");
const { encode, decode } = require("msgpack-lite");

const Player             = require("../structures/Player.js");
const Game               = require("../structures/Game.js");
const Changelog          = require("../structures/Changelog.js");
const Weapon             = require("../structures/Weapon.js");
const Class              = require("../structures/Class.js");
const Clan               = require("../structures/Clan.js");

const KrunkerAPIError    = require("../errors/KrunkerAPIError.js");
const ArgumentError      = require("../errors/ArgumentError.js");

module.exports = class Client {
    constructor() {
        this.players = new Map();
        this.clans = new Map();
    }
    fetchPlayer(username, { cache = true, raw = false } = {}) {
        this._connectWS();
        return new Promise((res, rej) => {
            if (!username) return rej(new ArgumentError("No username given"));
            this.ws.onopen = () => this.ws.send(encode(["r", ["profile", username, "000000", null]]).buffer);
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };
            
            this.ws.onmessage = async buffer => {
                const userData = decode(new Uint8Array(buffer.data))[1][2];
                this._disconnectWS();
                if (!userData || !userData.player_stats) return rej(new KrunkerAPIError("Player not found"));
                const p = await (new Player(userData).setup());
                if (cache) this.players.set(p.username + "_" + p.id, p);
                res(raw ? userData : p);
            };
        });
    }
    fetchClan(name, { raw = false, cache = true } = {}) {
        return new Promise(async (res, rej) => {
            if (!name) return rej(new ArgumentError("No clan name given"));
            const r = await fetch("https://krunker.social/api?clan=" + name);
            if (!r.ok) return rej(new KrunkerAPIError("Clan not found"));
            const c = await (new Clan(await r.json()).update());
            if (cache) this.clans.set(c.name + "_" + c.id);
            res(raw ? await r.json() : c);
        });
    }
    getClan(nameOrID, { updateCache = true, raw = false } = {}) {
        if (!nameOrID) throw new ArgumentError("No clan name or ID given");
        const c = [ ...this.clans.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!c) return this.fetchClan(nameOrID, { cache: updateCache, raw });
        if (updateCache) this._updateCache();
        return raw ? c.raw : c;
    }
    getPlayer(nameOrID, { updateCache = true, raw = false } = {}) {
        if (!nameOrID) throw new ArgumentError("No name or ID given");
        const u = [ ...this.players.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!u) return this.fetchPlayer(nameOrID, { cache: updateCache, raw });
        if (updateCache) this._updateCache();
        return raw ? u.raw : u;
    }
    fetchGame(id, { raw = false } = {}) {
        return new Promise(async (res, rej) => {
            if (!id) return rej(new ArgumentError("No ID given"));
            [ id ] = `${id}`.match(/[A-Z]{2,3}:[a-z0-9]{5}/) || [];
            if (!id) return rej(new ArgumentError("Invalid ID given"));
            const r = await fetch("https://matchmaker.krunker.io/game-info?game=" + id);
            if (!r.ok) rej(new KrunkerAPIError("Invalid ID given"));
            res(raw ? await r.json() : new Game(await r.json()));
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
    
    _connectWS() {
        this.ws = new ws("wss://krunker_social.krunker.io/ws", { handshakeTimeout: 10000 });
    }
    _disconnectWS() {
        if (this.ws && this.ws.readyState === 1) this.ws.close();
    }
    async _updateCache() {
        for (const un of [ ...this.players.keys() ].map(d => d.username)) {
            const u = await this.fetchPlayer(un);
            this.players.set(u.username + "_" + u.id, u);
        }
        for (const cn of [ ...this.clans.keys() ].map(d => d.name)) {
            const c = await this.fetchClan(cn);
            this.clans.set(c.name + "_" + c.id, c);
        }
    }
}
