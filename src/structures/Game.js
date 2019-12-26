// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class Game {
    constructor (data) {
        const obj = {
            id: data[0],
            players: {
                players: data[2],
                max: data[3],
                toString() {
                    return this.players + "/" + this.max;
                },
                valueOf() {
                    return this.players;
                }
            },
            gameMode: data[4].i.split("_")[0],
            map: data[4].i.split("_")[1],
            custom: data[4].cs
        };
        
        obj.forEach((k, v) => Object.defineProperty(this, k, { value: v, writable: false }));
        
        return obj;
    }
}
