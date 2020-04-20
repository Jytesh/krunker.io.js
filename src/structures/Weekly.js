module.exports = class Weekly {
    constructor(data) {
        this.raw = data;
        this.arr = data.map(o => ({
            name: o.n,
            date: new Date(o.d.replace(/(\d+)(?:st|nd|th)/, '$1')),
            region: o.r,
            teams: o.t.map(t => ({
                players: t.l,
                name: t.n,
                prize: t.p,
            })),
        }));
    }
};
