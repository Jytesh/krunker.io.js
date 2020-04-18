module.exports = class Mod {
    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });
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
    async fetchAuthor() {
        this.author = await this.client.fetchPlayer(this.authorUsername);
        return this.author;
    }
};
