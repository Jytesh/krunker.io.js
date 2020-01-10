const resolver = require("../client/resolver.js");
const Class = require("../structures/Class.js");
const Weapon = require("../structures/Weapon.js");

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
        arrIndex: 0
    };

    arr.forEach((o, i) => {
        map.set(o, map.get(o) ? map.get(o) + 1 : 1);
        obj[o] = map.get(o);
        if (map.get(o) > mostOccurElem.occur) {
            mostOccurElem = {
                val: o,
                occur: map.get(o),
                arrIndex: i
            };
        }
    });
    
    return {
        count: Math.max(...Object.values(obj)),
        element: this[mostOccurElem.arrIndex]
    };
};

const classes = ["Triggerman", "Hunter", "Run N Gun", "Spray N Pray", "Vince", "Detective", "Marksman", "Rocketeer", "Agent", "Runner", "Bowman", "Commando"];
const weapons = classes.map(n => new Class(n).weapon.name);
const spins = {
    starter: {
        cost: 50,
        uncommon: 75,
        rare: 22,
        epic: 3,
        legendary: 0,
        relic: 0,
        contraband: 0
    }, 
    elite: {
        cost: 100,
        uncommon: 50,
        rare: 30,
        epic: 15,
        legendary: 5,
        relic: 0,
        contraband: 0
    },
    heroic: {
        cost: 500,
        uncommon: 0,
        rare: 48,
        epic: 35,
        legendary: 14,
        relic: 2.5,
        contraband: 0.5
    },
    hunter: {
        cost: 600,
        uncommon: 43,
        rare: 33,
        epic: 17,
        legendary: 6,
        relic: 1,
        contraband: 0
    },
    attire: {
        cost: 750,
        uncommon: 43,
        rare: 33,
        epic: 16,
        legendary: 6,
        relic: 2,
        contraband: 0
    }
};

module.exports = {
    classes,
    weapons,
    spins,
    resolver,
    gameIDregExp: /[A-Z]{2,3}:[a-z0-9]{5}/,
    averageStat(structure, stat, arr, decimalDigits = 2) {
        if (!structure) return;
        structure = structure.trim().toLowerCase();
        switch (structure) {
            case "class":
                var exampleStat = new Class("Triggerman")[stat];
                if (!exampleStat) break;
                arr = arr ? resolver.classNameArray(arr) : classes;
                if (typeof exampleStat === "number") return avg(...arr.map(n => new Class(n)[stat])).toFixed(decimalDigits);
                if (typeof exampleStat.toNumber === "function") return avg(arr.map(n => new Class(n)[stat].toNumber())).toFixed(decimalDigits);
                return mostOccurs(arr.map(n => new Class(n)[stat])).element;
            case "weapon":
                var exampleStat = new Weapon("Assault Rifle")[stat];
                if (!exampleStat) break;
                arr = arr ? resolver.weaponNameArray(arr) : weapons;
                if (exampleStat.toNumber && typeof exampleStat.toNumber() === "number") return avg(...arr.map(n => new Weapon(n)[stat].toNumber())).toFixed(decimalDigits);
                if (typeof exampleStat === "number") return avg(...arr.map(n => new Weapon(n)[stat])).toFixed(decimalDigits);
                return mostOccurs(arr.map(n => new Class(n)[stat])).element;
            default: return void console.error("Invalid structure " + structure);
        }
    },
    spinChance(spin, rarity, kr) {
        spin = spins[spin.toLowerCase().replace("spin", "").trim()];
        rarity = rarity.toLowerCase().trim();
        if (!spin) return 0;
        if (kr < spin.cost) return 0;
        kr = round(kr, spin.cost);
        return (kr / spin.cost * spin[rarity]).toFixed(2);
    },
    nukeChance(kills = 0, deaths = 0) {
        if (kills < 25) return 0;
        if (deaths >= kills) return 0;
        if (!deaths) return 2;
        if (kills / deaths >= 25 - deaths) return 2;
        if (kills - deaths >= 25 - deaths) return 1;
        return 1;
    }
};
