const Client = require('../client/Client.js');

module.exports = class Mod {
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
};
