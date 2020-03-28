const { verifiedClans } = require('../util/index.js');

module.exports = class Clan {
	constructor(client, data) {
		Object.defineProperty(this, 'client', { value: client });
		const obj = {
			id: data.clan_id,
			name: data.clan_name,
			score: data.clan_score,
			members: data.members.map(m => m.player_name),
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
};
