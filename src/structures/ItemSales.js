const skins = require('../data/skins.json');

const fromEntries = arr => arr.reduce((o, [ k, v ]) => {
    o[k] = v;
    return o;
}, {});

module.exports = class ItemSales {
    constructor(data, sales, skinName) {
        const getSaleData = d => {
            let totalSales = 0;
            let itemsSold = 0;
            let num = 0;
            while (num < d.length) {
                totalSales += d[num].f;
                itemsSold += d[num].t;
                num++;
            }
            return [itemsSold, totalSales];
        };

        const obj = {
            name: skinName,
            itemNumber: parseInt(data.ind),
            high: data.high,
            low: data.low,
            inCirculation: data.inC,
            onSale: data.onS,
            days: fromEntries([7, 30, 90, 120].map((days, i) => {
                const [ itemsSold, totalSales ] = getSaleData(sales[i]);
                const averagePrice = totalSales / itemsSold;
                return [days, { itemsSold, totalSales, averagePrice }];
            })),
        };

        for (const [ k, v ] of Object.entries(obj)) Object.defineProperty(this, k, { value: v, writable: false, enumerable: true });
        return obj;
    }
    static getItemNum(skinName) {
        let num = 0;
        const arrayLength = skins.length;
        let itemNum = 0;
        while (num < arrayLength) {
            if (skins[num].name.toLowerCase() === skinName.toLowerCase()) itemNum = num;
            num++;
        }
        if (itemNum === 0 && skinName.toLowerCase() !== 'arctic hunt') return;
        return itemNum;
    }
};