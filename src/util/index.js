const resolver = require('../client/resolver.js');
const Class = require('../structures/Class.js');
const Weapon = require('../structures/Weapon.js');

const round = (n, r) => {
    while (n % r !== 0) n--;
    return n;
};

const avg = (...nums) => nums.reduce((acc, val) => acc + val) / nums.length;
const mostOccurs = arr => {
    const map = new Map();
    const obj = {};

    let mostOccurElem = {
        val: undefined,
        occur: 0,
        arrIndex: 0,
    };

    arr.forEach((o, i) => {
        map.set(o, map.get(o) ? map.get(o) + 1 : 1);
        obj[o] = map.get(o);
        if (map.get(o) > mostOccurElem.occur) {
            mostOccurElem = {
                val: o,
                occur: map.get(o),
                arrIndex: i,
            };
        }
    });

    return {
        count: Math.max(...Object.values(obj)),
        element: this[mostOccurElem.arrIndex],
    };
};

const classes = ['Triggerman', 'Hunter', 'Run N Gun', 'Spray N Pray', 'Vince', 'Detective', 'Marksman', 'Rocketeer', 'Agent', 'Runner', 'Bowman', 'Commando'];
const weapons = classes.map(n => new Class(n).weapon.name).filter(x => x);
const spins = {
    starter: {
        cost: 50,
        uncommon: 75,
        rare: 22,
        epic: 3,
        legendary: 0,
        relic: 0,
        contraband: 0,
    },
    elite: {
        cost: 100,
        uncommon: 50,
        rare: 30,
        epic: 15,
        legendary: 5,
        relic: 0,
        contraband: 0,
    },
    heroic: {
        cost: 500,
        uncommon: 0,
        rare: 48,
        epic: 35,
        legendary: 14,
        relic: 2.4,
        contraband: 0.5,
        unobtainable: 0.1,
    },
    hunter: {
        cost: 600,
        uncommon: 43,
        rare: 33,
        epic: 17,
        legendary: 6,
        relic: 1,
        contraband: 0,
    },
    attire: {
        cost: 750,
        uncommon: 43,
        rare: 33,
        epic: 16,
        legendary: 6,
        relic: 2,
        contraband: 0,
    },
};

const mapToObj = map => {
    const obj = {};
    map.forEach((v, k) => {
        obj[k] = v;
    });
    return obj;
};

const resolveVal = (obj, seperator, lineBreaks) => {
    if (obj === 'true') return 'on';
    if (obj === 'false') return 'off';
    if (typeof obj === 'number' || obj instanceof Number || typeof obj === 'string' || obj instanceof String) return String(obj);
    if (typeof obj === 'boolean' || obj instanceof Boolean) return obj ? 'on' : 'off';
    if (obj instanceof Array) return obj.join(', ');
    return getControls(obj, seperator, lineBreaks);
};

const getControls = (obj, seperator, lineBreaks) => {
    const resolveContrVal = v => {
        if (typeof v === 'number' || v instanceof Number || v instanceof String || typeof v === 'string') return String.fromCharCode(Number(v));
        if (v instanceof Array) return v.map(resolveContrVal).join(', ');
        return v;
    };

    const keys = Object.keys(obj).filter(k => obj[k]).map(k => [resolveKey(k), obj[k], k]);
    const transformed = mapToObj(new Map(keys));
    const str = Object.keys(transformed).map(k => k + seperator + resolveContrVal(transformed[k])).join('\n'.repeat(lineBreaks));
    return str;
};

const resolveKey = txt => txt.split('').map((char, i) => {
    if (i === 0) return char.toUpperCase();
    if (char.toUpperCase() === char && txt[i - 1].toUpperCase() !== txt[i - 1]) return ' ' + char;
    return char;
}).join('');

const orderBy = {
    funds: 'player_funds',
    clans: 'player_clan',
    level: 'player_score',
    kills: 'player_kills',
    time: 'player_timeplayed',
    wins: 'player_wins',
    elo: 'player_elo',
    elo2: 'player_elo2',
    elo4: 'player_elo4',
};

const verifiedClans = ['DEV', 'FaZe', 'Lore', 'nV', 'Oxic', 'Verb', 'Omen', 'ロリ幼女', 'VOID', 'JBP', 'PHIL', 'TIMP', 'g59', '24/7', 'GLXY', 'MMOK', 'KPOP', 'SCTE'];

module.exports = {
    classes,
    weapons,
    spins,
    resolver,
    orderBy,
    verifiedClans,
    gameIDregex: /[A-Z]{1,3}:[a-z0-9]{5}/g,
    averageStat(structure, stat, arr, decimalDigits = 2) {
        if (!structure) return;
        structure = structure.trim().toLowerCase();
        let exampleStat;
        switch (structure) {
        case 'class':
            exampleStat = new Class('Triggerman')[stat];
            if (!exampleStat) break;
            arr = arr ? resolver.classNameArray(arr) : classes;
            if (typeof exampleStat === 'number') return Number(avg(...arr.map(n => new Class(n)[stat])).toFixed(decimalDigits));
            if (!isNaN(Number(exampleStat))) return Number(avg(arr.map(n => Number(new Class(n)[stat]))).toFixed(decimalDigits));
            return mostOccurs(arr.map(n => new Class(n)[stat])).element;
        case 'weapon':
            exampleStat = new Weapon('Assault Rifle')[stat];
            if (!exampleStat) break;
            arr = arr ? resolver.weaponNameArray(arr) : weapons;
            if (!isNaN(Number(exampleStat))) return Number(avg(...arr.map(n => Number(new Weapon(n)[stat]))).toFixed(decimalDigits));
            if (typeof exampleStat === 'number') return Number(avg(...arr.map(n => new Weapon(n)[stat])).toFixed(decimalDigits));
            return mostOccurs(arr.map(n => new Class(n)[stat])).element;
        }
    },
    spinChance(spin, rarity, kr) {
        spin = spins[spin.toLowerCase().replace('spin', '').trim()];
        rarity = rarity.toLowerCase().trim();
        if (!spin) return 0;
        if (kr < spin.cost) return 0;
        kr = round(kr, spin.cost);
        return (kr / spin.cost * spin[rarity]).toFixed(2);
    },
    stringifySettings(str, { lineBreaks = 1, seperator = ': ', includeControls = true } = {}) {
        const data = JSON.parse(str);
        const keys = Object.keys(data).filter(k => (includeControls ? true : k !== 'controls') && data[k]).map(k => [resolveKey(k), data[k], k]);
        const transformed = mapToObj(new Map(keys));
        const outp = Object.keys(transformed).map(k => k + seperator + resolveVal(transformed[k], seperator, lineBreaks)).join('\n'.repeat(lineBreaks));
        return outp;
    },
    skins: require('../data/skins.json'),
};
