const resolver = require('../client/resolver.js');

module.exports = class Game {
    constructor(data) {
        const obj = {
            id: data[0],
            players: {
                players: data[2],
                max: data[3],
                toString() {
                    return this.players + '/' + this.max;
                },
                valueOf() {
                    return this.players;
                },
            },
            gameMode: data[4].i.split('_')[0],
            map: data[4].i.split('_')[1],
            custom: data[4].cs,
            server: resolver.resolveServer(data[0].split(':')[0]),
        };

        for (const [ k, v ] of Object.entries(obj)) Object.defineProperty(this, k, { value: v, writable: false, enumerable: true });
        return obj;
    }
};
