module.exports = class Clan {
    constructor(data) {
        const obj = {
            id: data.id,
            name: data.name,
            score: data.score,
            members: data.members.map(m => m.username),
            leader: data.leader
        };
        for (const [ k, v ] of Object.entries(obj)) Object.defineProperty(this, k, { value: v, enumerable: true });
        return obj;
    }
}
