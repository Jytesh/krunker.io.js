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

const skins              = require("../data/skins.json");

const OrderBy = {
    funds: "player_funds",
    clans: "player_clan",
    level: "player_score",
    kills: "player_kills",
    time: "player_timeplayed",
    wins: "player_wins",
    elo: "player_elo",
    elo2: "player_elo2",
    elo4: "player_elo4"
}

module.exports = class Client {
    constructor() {
        this.players = new Map();
        this.leaderboard = new Map();
        this.clans = new Map();
    }
    fetchPlayer(username, { cache = true, raw = false, mods = false, clan = false } = {}) {
        this._connectWS();
        return new Promise((res, rej) => {
            if (!username) return rej(new ArgumentError("No username given"));
            this.ws.onopen = () =>
              this.ws.send(
                encode(["r", ["profile", username, "000000", null]]).buffer
              );
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };
            
            this.ws.onmessage = async buffer => {
                const userData = decode(new Uint8Array(buffer.data))[1][2];
                this._disconnectWS();
                if (!userData || !userData.player_stats) return rej(new KrunkerAPIError("Player not found"));
                const p = await (new Player().setup(this, userData, { mods, clan }));
                if (cache) this.players.set(p.username + "_" + p.id, p);
                res(raw ? userData : p);
            };
        });
    }
    fetchClan(name, { raw = false, cache = true } = {}) {
        return new Promise((res, rej) => {
            if (!name) return rej(new ArgumentError("No clan name given"));
            fetch("https://krunker.social/api?clan=" + name).then(async r => {
                if (!r.ok) return rej(new KrunkerAPIError("Clan not found"));
                const json = await r.json();
                if (json.error) return rej(new KrunkerAPIError("Clan not found"));
                const c = new Clan(json);
                if (cache) this.clans.set(c.name + "_" + c.id);
                res(raw ? json : c);
            });
        });
    }
    getClan(nameOrID, { updateCache = true, raw = false } = {}) {
        if (!nameOrID) throw new ArgumentError("No clan name or ID given");
        const c = [ ...this.clans.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!c) return this.fetchClan(nameOrID, { cache: updateCache, raw });
        if (updateCache) this._updateCache();
        return raw ? c.raw : c;
    }
    getPlayer(nameOrID, { updateCache = true, raw = false, mods = false, clan = false } = {}) {
        if (!nameOrID) throw new ArgumentError("No name or ID given");
        const u = [ ...this.players.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!u) return this.fetchPlayer(nameOrID, { cache: updateCache, raw, clan, mods });
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
    async fetchChangelog() {
        this.changelog = new Changelog(
          await (await fetch("https://krunker.io/docs/versions.txt")).text()
        );
        return this.changelog;
    }
    fetchLeaderboard(orderBy) {
        orderBy = OrderBy[`${orderBy}`.toLowerCase()]
        || Object.values(OrderBy).includes(`${orderBy}`)
          ? `${orderBy}`
          : OrderBy.level;
        this._connectWS();
        return new Promise((res, rej) => {
            this.ws.onopen = () =>
              this.ws.send(
                encode(["r", ["leaders", orderBy, null, null]]).buffer
              );
            this.ws.onmessage = buffer => {
                let data = decode(new Uint8Array(buffer.data))[1][2];
                this._disconnectWS();
                if (!data) return rej(new KrunkerAPIError("Something went wrong!"));
                data = data.map(d => d.player_name);
                this.leaderboard.set(orderBy, data);
                res(this.leaderboard.get(orderBy));
            }
        });
    }
    getLeaderboard(orderBy) {
        orderBy = OrderBy[`${orderBy}`.toLowerCase()]
        || Object.values(OrderBy).includes(`${orderBy}`)
          ? `${orderBy}`
          : OrderBy.level;
        return this.leaderboard.get(orderBy) || this.fetchLeaderboard(orderBy);
    }
    getChangelog() {
        return this.changelog || this.fetchChangelog();
    }
    getClass(name) {
        return new Class(name);
    }
    getWeapon(name) {
        return new Weapon(name);
    }
    getSkin(name) {
        const found = skins.find(s => s.name.toLowerCase() === `${name}`.toLowerCase());
        return found ? new Skin(new Weapon(found.weapon), found) : null;
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

const { resolveWeapon, resolveRarity } = {
    resolveWeapon(r) {
        if (r && r.constructor.name === "Class") return r.weapon;
        if (typeof r === "string") return new Weapon(r);
        return r
    },
    resolveRarity: r => ["Uncommon", "Rare", "Epic", "Legendary", "Relic", "Contraband"][r]
};

class Skin {
    constructor(wResolvable, data) {
        this.weapon = resolveWeapon(wResolvable);
        if (!this.weapon) throw new TypeError("Can't resolve " + wResolvable + " to a Weapon.");
        this.name = data.name;
        this.id = data.id;
        this.tex = data.tex;
        this.key = data.key;
        this.season = data.seas;
        this.rarityI = data.rarity;
        this.rarity = resolveRarity(data.rarity);
        this.authorUsername = data.creator || "";
        this.glow = !!data.glow;
        this.url = this.weapon.getSkin(this.id);
    }
    async fetchAuthor(client) {
        if (client instanceof Client === false) client = new Client();
        this.author = await client.fetchPlayer(this.authorUsername);
        return this.author;
    }
}