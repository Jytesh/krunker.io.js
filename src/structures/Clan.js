const fetch = require("node-fetch");

Object.prototype.forEach = function(callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class Clan {
    constructor(client, data) {
        this.setup(client, data);
    }
    async setup(client, data) {
        const obj = {
            id: data.id,
            name: data.name,
            score: data.score,
            members: []
        };
        obj.leader = await client.fetchPlayer(obj.leader);
        for (const { username } of obj.members) obj.members.push(await client.fetchPlayer(username));
    }
}
