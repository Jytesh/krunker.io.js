const ws = require('ws');
const fetch = require('node-fetch');
const { encode, decode } = require('msgpack-lite');

const Player = require('../structures/Player.js');
const Game = require('../structures/Game.js');
const Changelog = require('../structures/Changelog.js');
const Weapon = require('../structures/Weapon.js');
const Class = require('../structures/Class.js');
const Clan = require('../structures/Clan.js');

const KrunkerAPIError = require('../errors/KrunkerAPIError.js');
const ArgumentError = require('../errors/ArgumentError.js');

const skins = require('../data/skins.json');
const {
    gameIDregex, orderBy: OrderBy,
} = require('../util/index.js');

class Client {
    constructor() {
        this.players = new Map();
        this.leaderboard = new Map();
        this.clans = new Map();
        this._pings = [];
    }
    get ping() {
        return this._pings.reduce((a, b) => a + b, 0);
    }
    fetchPlayer(username, { cache = true, raw = false, mods = false, clan = false } = {}) {
        this._connectWS();
        const start = Date.now();
        return new Promise((res, rej) => {
            if (!username) return rej(new ArgumentError('No username given'));
            this.ws.onopen = () =>
                this.ws.send(
                    encode(['r', 'profile', username, null, null, null, 0, null]).buffer,
                );
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };

            this.ws.onmessage = async buffer => {
                const completeData = decode(new Uint8Array(buffer.data));
                this._disconnectWS();
                this._pings.push(Date.now() - start);
                const [,,, userData,, userMods ] = completeData;
                if (!userData || !userData.player_stats) return rej(new KrunkerAPIError('Player not found'));
                userData.player_mods = userMods;
                if (raw) res(userData);
                const p = await (new Player().setup(this, userData, { mods, clan }));
                if (cache) this.players.set(p.username + '_' + p.id, p);
                res(p);
            };
        });
    }
    fetchClan(name, { raw = false, cache = true } = {}) {
        this._connectWS();
        const start = Date.now();
        return new Promise(res => {
            this.ws.onopen = () =>
                this.ws.send(
                    encode(['r', 'clan', name, null, null]).buffer,
                );

            this.ws.onmessage = buffer => {
                const data = decode(new Uint8Array(buffer.data))[3];
                if (data) {
                    this._disconnectWS();
                    this._pings.push(Date.now() - start);
                    const c = new Clan(this, data);
                    if (cache) this.clans.set(c.name + '_' + c.id);
                    res(raw ? data : c);
                }
            };
        });
    }
    fetchInfected() {
        this._connectWS();
        const start = Date.now();
        return new Promise((res, rej) => {
            this.ws.onopen = () =>
                this.ws.send(
                    encode(['vst', [7]]).buffer,
                );
            this.ws.onerror = err => {
                this.ws.terminate();
                rej(err);
            };

            this.ws.onmessage = buffer =>{
                const stats = decode(new Uint8Array(buffer.data))[1];
                this._disconnectWS();
                this._pings.push(Date.now() - start);
                this.infected = stats.map(d => ({
                    date: new Date(d.dat),
                    infected: d.inf,
                }));
                res(this.infected);
            };
        });
    }
    getClan(nameOrID, { updateCache = true, raw = false } = {}) {
        if (!nameOrID) throw new ArgumentError('No clan name or ID given');
        const c = [ ...this.clans.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!c) return this.fetchClan(nameOrID, { cache: updateCache, raw });
        if (updateCache) this._updateCache();
        return raw ? c.raw : c;
    }
    getPlayer(nameOrID, { updateCache = true, raw = false, mods = false, clan = false } = {}) {
        if (!nameOrID) throw new ArgumentError('No name or ID given');
        const u = [ ...this.players.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!u) return this.fetchPlayer(nameOrID, { cache: updateCache, raw, clan, mods });
        if (updateCache) this._updateCache();
        return raw ? u.raw : u;
    }
    getInfected() {
        return this.infected || this.fetchInfected();
    }
    fetchGame(id, { raw = false } = {}) {
        return new Promise((res, rej) => {
            if (!id) return rej(new ArgumentError('No ID given'));
            [ id ] = `${id}`.match(gameIDregex) || [];
            if (!id) return rej(new ArgumentError('Invalid ID given'));
            fetch('https://matchmaker.krunker.io/game-info?game=' + id).then(async r => {
                if (!r.ok) rej(new KrunkerAPIError('Game not found'));
                res(raw ? await r.json() : new Game(await r.json()));
            });
        });
    }
    async fetchChangelog() {
        this.changelog = new Changelog(
            await (await fetch('https://krunker.io/docs/versions.txt')).text(),
        );
        return this.changelog;
    }
    fetchLeaderboard(orderBy) {
        orderBy = OrderBy[`${orderBy}`.toLowerCase()]
        || Object.values(OrderBy).includes(`${orderBy}`)
            ? `${orderBy}`
            : OrderBy.level;
        this._connectWS();
        const start = Date.now();
        return new Promise((res, rej) => {
            this.ws.onopen = () =>
                this.ws.send(
                    encode(['r', 'leaders', orderBy, null, null]).buffer,
                );
            this.ws.onmessage = buffer => {
                let data = decode(new Uint8Array(buffer.data))[3];
                this._disconnectWS();
                this._pings.push(Date.now() - start);
                if (!data) return rej(new KrunkerAPIError('Something went wrong!'));
                data = data.map(d => d.player_name);
                this.leaderboard.set(orderBy, data);
                res(this.leaderboard.get(orderBy));
            };
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
    getSkins({ filter, sort, count, map } = {}) {
        let res = skins.map(d => new Skin(new Weapon(d.weapon), d));
        if (typeof filter === 'function') res = res.filter(filter);
        if (typeof sort === 'function') res = res.sort(sort);
        if (['string', 'symbol', 'function'].includes(typeof map)) {
            res = res.map(
                typeof map === 'function'
                    ? map
                    : x => x[map],
            );
        }
        return count ? res.slice(0, count) : res;
    }

    _connectWS() {
        this.ws = new ws('wss://social.krunker.io/ws', { handshakeTimeout: 10000 });
    }
    _disconnectWS() {
        if (this.ws) this.ws.close();
    }
    async _updateCache() {
        for (const un of [ ...this.players.values() ].map(d => d.username)) {
            const u = await this.fetchPlayer(un);
            this.players.set(u.username + '_' + u.id, u);
        }
        for (const cn of [ ...this.clans.values() ].map(d => d.name)) {
            const c = await this.fetchClan(cn);
            this.clans.set(c.name + '_' + c.id, c);
        }
    }
}

const { resolveWeapon, resolveRarity } = {
    resolveWeapon(r) {
        if (r && r.constructor.name === 'Class') return r.weapon;
        if (typeof r === 'string') return new Weapon(r);
        return r;
    },
    resolveRarity: r => ['Uncommon', 'Rare', 'Epic', 'Legendary', 'Relic', 'Contraband'][r],
};

class Skin {
    constructor(wResolvable, data) {
        this.weapon = resolveWeapon(wResolvable);
        if (!this.weapon) throw new TypeError('Can\'t resolve ' + wResolvable + ' to a Weapon.');
        this.name = data.name;
        this.id = data.id;
        this.season = data.seas || 1;
        this.rarityI = data.rarity;
        this.rarity = resolveRarity(data.rarity);
        this.authorUsername = data.creator || 'Krunker.io';
        this.glow = !!data.glow;
        this.url = this.weapon.getSkin ? this.weapon.getSkin(this.id) : null;
    }
    toString() {
        return this.name;
    }
    async fetchAuthor(client) {
        if (client instanceof Client === false) client = new Client();
        this.author = await client.fetchPlayer(this.authorUsername);
        return this.author;
    }
}

module.exports = Client;