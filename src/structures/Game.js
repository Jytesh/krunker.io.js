// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}


module.exports = class Game {
    constructor (data) {
        const obj = {
            players: {
                players: data.clientCount,
                max: data.maxClients,
                toString () {
                    return this.players + "/" + this.max;
                },
                toNumber () {
                    return this.players;
                }
            },
            gameMode: data.i.split("_")[0],
            map: data.i.split("_")[1],
            custom: data.cs
        };
        
        obj.forEach((k, v) => {
            this[k] = v;
        });
        
        return obj;
    }
}
