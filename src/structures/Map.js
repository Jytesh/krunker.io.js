module.exports = class KrunkerMap {
    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });
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
    async fetchAuthor() {
        this.author = await this.client.fetchPlayer(this.authorUsername);
        return this.author;
    }
};
