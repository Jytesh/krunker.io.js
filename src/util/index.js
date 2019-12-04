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

module.exports = {
    classes,
    gameIDregExp: /[A-Z]{2,}:[a-z0-9]]+/g,
    averageStat(structure, stat, arr) {
        if (!structure) return;
        structure = structure.trim().toLowerCase();
        switch (structure) {
            case "class":
                const exampleStat = new Class("Triggerman")[stat];
                if (!exampleStat) break;
                arr = arr ? resolveClass(arr) : classes;
                if (typeof exampleStat === "number") return avg(...arr.map(n => new Class(n)[stat]));
                if (typeof exampleStat.toNumber === "function") return mostOccurs(arr.map(n => new Class(n)[stat].toNumber()));
        }
    }
};
