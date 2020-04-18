const WebSocketManager = require('./ws/WebSocketManager.js');
const fetch = require('node-fetch');

const Player = require('../structures/Player.js');
const Game = require('../structures/Game.js');
const Changelog = require('../structures/Changelog.js');
const { Class, Weapon } = require('../structures/ClassWeapon.js');
const Clan = require('../structures/Clan.js');
const KrunkerMap = require('../structures/Map.js');
const Mod = require('../structures/Mod.js');
const Skin = require('../structures/Skin.js');

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
            async ([,,, userData, userMaps, userMods ]) => {
                if (!userData || !userData.player_stats) throw new KrunkerAPIError('404_NOT_FOUND', 'Player');
                userData.player_mods = userMods;
                userData.player_maps = userMaps;
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
                if (cache) this.clans.set(c.name + '_' + c.id, c);
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
        const c = [ ...this.clans.values() ].find(obj => [ obj.id, obj.name ].includes(nameOrID));
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
                data = data.map(d => ({
                    username: d.player_name,
                    displayName: d.player_name + (d.player_clan ? ' [' + d.player_clan + ']' : ''),
                    verified: !!d.player_featured,
                    clan: d.player_clan || null,
                    hacker: !!d.player_hack,
                    [orderBy.split('_')[1]]: d[orderBy],
                }));
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
        return found ? new Skin(this, new Weapon(found.weapon), found) : null;
    }
    getSkins({ filter, sort, count, map } = {}) {
        let res = skins.map(d => new Skin(this, new Weapon(d.weapon), d));
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
                (await d.json()).data.map(modData => new Mod(this, modData)),
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
    async fetchMaps({ player, filter, sort, count, map } = {}) {
        if (resolveUsername(player)) filter = m => m.authorUsername === resolveUsername(player);
        let res = await fetch('https://api.krunker.io/maps').then(
            async d =>
                (await d.json()).data
                    .filter(x => x)
                    .map(mapData => new KrunkerMap(this, mapData)),
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
    async getMap({ name, rank, id } = {}) {
        if (!name && !rank && !id) return new ArgumentError('NO_ARGUMENT', 'map name, rank, or ID');
        const prop = Object.keys(arguments[0]).find(x => x);
        const val = name || rank || id;
        return (await this.fetchMaps()).find(m => m[prop] === val);
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

module.exports = Client;