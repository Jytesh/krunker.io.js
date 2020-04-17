const Client = require('../client/Client.js');

module.exports = class KrunkerMap {
    constructor(data) {
        this.name = data.map_name;
        this.authorUsername = data.creatorname;
        this.rank = data.map_rank;
        this.id = data.map_id;
        this.votes = data.map_votes;
        this.createdAt = new Date(data.map_date);
        this.featured = !!data.map_featured;
        this.verified = !!data.map_verified;
        Object.defineProperty(this, 'image', {
            value: data.map_image,
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
