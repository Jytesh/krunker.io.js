const WebSocketManager = require('./ws/WebSocketManager.js');
const fetch = require('node-fetch');

const Player = require('../structures/Player.js');
const Game = require('../structures/Game.js');
const Changelog = require('../structures/Changelog.js');
const Weapon = require('../structures/Weapon.js');
const Class = require('../structures/Class.js');
const Clan = require('../structures/Clan.js');

const { KrunkerAPIError, ArgumentError } = require('../errors/index.js');

const skins = require('../data/skins.json');
const { gameIDregex, orderBy: OrderBy } = require('../util/index.js');
const { resolveUsername } = require('./resolver.js');

class Client {
    constructor() {
        this.ws = new WebSocketManager(this);
        this.players = new Map();
        this.leaderboard = new Map();
        this.clans = new Map();
        this.infected = new Map();
    }
    get ping() {
        return this.ws.ping;
    }
    fetchPlayer(username, { cache = true, raw = false, mods = false, clan = false } = {}) {
        if (!username) throw new ArgumentError('NO_ARGUMENT', 'username');
        return this.ws.request(
            ['r', 'profile', username, null, null, null, 0, null],
            x => x,
            async ([,,, userData,, userMods ]) => {
                if (!userData || !userData.player_stats) throw new KrunkerAPIError('404_NOT_FOUND', 'Player');
                userData.player_mods = userMods;
                if (raw) return userData;
                const p = await (new Player().setup(this, userData, { mods, clan }));
                if (cache) this.players.set(p.username + '_' + p.id, p);
                return p;
            },
        );
    }
    fetchClan(name, { raw = false, cache = true } = {}) {
        if (!name) throw new ArgumentError('NO_ARGUMENT', 'clan name');
        return this.ws.request(
            ['r', 'clan', name, null, null],
            x => x[3],
            data => {
                if (!data) return;
                const c = new Clan(this, data);
                if (cache) this.clans.set(c.name + '_' + c.id);
                return raw ? data : c;
            },
            true,
        );
    }
    fetchInfected(days = 7) {
        return this.ws.request(
            ['vst', [days]],
            x => x[1],
            stats => {
                if (!stats) throw new KrunkerAPIError('SOMETHING_WENT_WRONG');
                const data = stats.map(d => ({
                    date: new Date(d.dat),
                    infected: d.inf,
                }));
                this.infected.set(days, data);
                return data;
            },
        );
    }
    getClan(nameOrID, { updateCache = true, raw = false } = {}) {
        if (!nameOrID) throw new ArgumentError('NO_ARGUMENT', 'clan name or ID');
        const c = [ ...this.clans.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!c) return this.fetchClan(nameOrID, { cache: updateCache, raw });
        if (updateCache) this._updateCache();
        return raw ? c.raw : c;
    }
    getPlayer(nameOrID, { updateCache = true, raw = false, mods = false, clan = false } = {}) {
        if (!nameOrID) throw new ArgumentError('NO_ARGUMENT', 'username or ID');
        const u = [ ...this.players.values() ].find(obj => [ obj.id, obj.username ].includes(nameOrID));
        if (!u) return this.fetchPlayer(nameOrID, { cache: updateCache, raw, clan, mods });
        if (updateCache) this._updateCache();
        return raw ? u.raw : u;
    }
    getInfected(days = 7) {
        return this.infected.get(days) || this.infected.get(7) || this.fetchInfected(days);
    }
    fetchGame(id, { raw = false } = {}) {
        return new Promise((res, rej) => {
            if (!id) return rej(new ArgumentError('NO_ARGUMENT', 'game ID'));
            [ id ] = `${id}`.match(gameIDregex) || [];
            if (!id) return rej(new ArgumentError('INVALID_ARGUMENT', 'game ID'));
            fetch('https://matchmaker.krunker.io/game-info?game=' + id).then(async r => {
                if (!r.ok) rej(new KrunkerAPIError('404_NOT_FOUND', 'Game'));
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
        orderBy = OrderBy[`${orderBy}`.toLowerCase()] || (
            Object.values(OrderBy).includes(`${orderBy}`)
                ? `${orderBy}`
                : OrderBy.level
        );
        return this.ws.request(
            ['r', 'leaders', orderBy, null, null],
            x => x[3],
            data => {
                if (!data) throw new KrunkerAPIError('SOMETHING_WENT_WRONG');
                data = data.map(d => d.player_name);
                this.leaderboard.set(orderBy, data);
                return this.leaderboard.get(orderBy);
            },
        );
    }
    getLeaderboard(orderBy) {
        orderBy = OrderBy[`${orderBy}`.toLowerCase()] || (
            Object.values(OrderBy).includes(`${orderBy}`)
                ? `${orderBy}`
                : OrderBy.level
        );
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
    async fetchMods({ player, filter, sort, count, map } = {}) {
        if (resolveUsername(player)) filter = m => m.authorUsername === resolveUsername(player);
        let res = await fetch('https://api.krunker.io/mods').then(
            async d =>
                (await d.json()).data.map(modData => new Mod(modData)),
        );
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
    async getMod({ name, rank, id } = {}) {
        if (!name && !rank && !id) return new ArgumentError('NO_ARGUMENT', 'mod name, rank, or ID');
        const prop = Object.keys(arguments[0]).find(x => x);
        const val = name || rank || id;
        return (await this.fetchMods()).find(m => m[prop] === val);
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
        if (!this.weapon) throw new ArgumentError('CANNOT_RESOLVE', wResolvable, 'Weapon');
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

class Mod {
    constructor(data) {
        this.name = data.mod_name;
        this.authorUsername = data.creatorname;
        this.rank = data.mod_rank;
        this.id = data.mod_id;
        this.url = data.mod_url;
        this.votes = data.mod_votes;
        this.createdAt = new Date(data.mod_date);
        Object.defineProperty(this, 'image', {
            value: data.mod_image,
            writable: true,
            configurable: true,
        });
    }
    async fetchAuthor(client) {
        if (client instanceof Client === false) client = new Client();
        this.author = await client.fetchPlayer(this.authorUsername);
        return this.author;
    }
}

module.exports = Client;