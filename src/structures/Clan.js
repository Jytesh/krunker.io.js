const { verifiedClans } = require('../util/index.js');

module.exports = class Clan {
    constructor(client, data, partial = false) {
        Object.defineProperty(this, 'client', { value: client });
        const obj = {
            id: partial ? null : data.clan_id,
            name: data.clan_name,
            score: data.clan_score,
            level: Math.max(1, Math.floor(0.03 * Math.sqrt(data.clan_score))),
            memberCount: partial ? data.clan_membercount : data.members.length,
            members: partial ? [] : data.members
                .sort((a, b) =>
                    b.s - a.s,
                )
                .map(m => {
                    const level = Math.max(1, Math.floor(0.03 * Math.sqrt(m.s)));
                    return {
                        username: m.p,
                        hacker: !!m.h,
                        premium: !!m.r,
                        displayName: m.p + ' [' + data.clan_name + ']',
                        score: m.s,
                        level,
                        levelProgress: Math.round(100 * ((0.03 * Math.sqrt(m.s)) - Math.floor(0.03 * Math.sqrt(m.s)))),
                        levelImage: `https://krunker.io/img/levels/${Math.min(level % 2 ? level : level - 1, 101)}.png`,
                        toString: () => m.p,
                    };
                }),
            leaderUsername: data.creatorname,
            verified: verifiedClans.includes(data.clan_name),
        };
        for (const [ k, v ] of Object.entries(obj)) Object.defineProperty(this, k, { value: v, enumerable: true });
        return obj;
    }
    fetchLeader() {
        this.leader = this.client.fetchPlayer(this.leaderUsername);
        return this.leader;
    }
    toString() {
        return this.name;
    }
};