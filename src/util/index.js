const resolver = require("../client/resolver.js");
const Class = require("../structures/Class.js");
const Weapon = require("../structures/Weapon.js");

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
        cost: 50
    }, 
    elite: {

    }
};

module.exports = {
    classes,
    gameIDregExp: /[A-Z]{2,}:[a-z0-9]]+/g,
    averageStat(structure, stat, arr) {
        if (!structure) return;
        structure = structure.trim().toLowerCase();
        switch (structure) {
            case "class":
                var exampleStat = new Class("Triggerman")[stat];
                if (!exampleStat) break;
                arr = arr ? resolver.classNameArray(arr) : classes;
                if (typeof exampleStat === "number") return avg(...arr.map(n => new Class(n)[stat]));
                if (typeof exampleStat.toNumber === "function") return avg(arr.map(n => new Class(n)[stat].toNumber()));
                return mostOccurs(arr.map(n => new Class(n)[stat])).element;
            case "weapon":
                var exampleStat = new Weapon("Assault Rifle")[stat];
                if (!exampleStat) break;
                arr = arr ? resolver.weaponNameArray(arr) : weapons;
                if (typeof exampleStat === "number") return avg(...arr.map(n => new Weapon(n)[stat]));
                if (typeof exampleStat.toNumber === "function") return avg(arr.map(n => new Weapon(n)[stat].toNumber()));
                return mostOccurs(arr.map(n => new Class(n)[stat])).element;
            default: return void console.error("Invalid structure " + structure);
        }
    },
    spinChance(spin, rarity, kr) {
        spin = spins[spin.toLowerCase().replace("spin", "").trim()];
        rarity = rarity.toLowerCase().trim();
        if (!spin) return 0;
        return kr / spin.cost * spin[rarity];
    },
    nukeChance(kills = 0, deaths = 0) {
        if (kills - deaths < 25) return 0;
        if (deaths >= kills) return 0;
        if (!deaths) return 2;
        if (kills / deaths >= 25 - deaths) return 2;
        if (kills - deaths >= 25 + deaths) return 1;
        return 1;
    }
};
