const Class = require("../structures/Class.js");
const Weapon = require("../structures/Weapon.js");

const classArr = ["Triggerman", "Hunter", "Run N Gun", "Spray N Pray", "Vince", "Detective", "Marksman", "Rocketeer", "Agent", "Runner", "Bowman", "Commando"];
const weaponArr = classArr.map(n => new Class(n).weapon.name);
const servers = {
    "fra": "Frankfurt",
    "sv": "Silicon Valley",
    "ny": "New York",
    "mia": "Miami",
    "fl": "Miami",
    "la": "Los Angeles",
    "js": "New Jersey",
    "tx": "Texas",
    "syd": "Sydney",
    "tok": "Tokyo"
};

module.exports = {
    classNameArray(arr) {
        arr = Array.from(new Set(arr));
        if (arr.some(v => Boolean(new Class(v)))) return arr.filter(v => Boolean(new Class(v)));
        if (arr.some(v => v instanceof Class && new Class(v.name))) return arr.filter(v => v instanceof Class && new Class(v.name)).map(v => v.name);
        if (arr.some(v => Boolean(new Weapon(v)))) return arr.filter(v => Boolean(new Class(v))).map(w => w.class);
        if (arr.some(v => v instanceof Weapon && new Weapon(v.name))) return arr.filter(v => v instanceof Weapon && new Weapon(v.name)).map(w => w.class);
        return classArr;
    },
    weaponNameArray(arr) {
        arr = Array.from(new Set(arr));
        if (arr.some(v => Boolean(new Weapon(v)))) return arr.filter(v => Boolean(new Weapon(v)));
        if (arr.some(v => v instanceof Weapon && new Weapon(v.name))) return arr.filter(v => v instanceof Weapon && new Weapon(v.name)).map(v => v.name);
        if (arr.some(v => Boolean(new Class(v)))) return arr.filter(v => Boolean(new Class(v))).map(c => c.weapon.name);
        if (arr.some(v => v instanceof Class && new Class(v.weapon.name))) return arr.filter(v => v instanceof Class && new Class(v.weapon.name)).map(w => w.weapon.name);
        return weaponArr;
    },
    resolveServer: str => servers[str.toLowerCase().trim()] || "",
    resolveWeapon(r) {
        if (r instanceof Weapon) return r;
        if (r instanceof Class) return r.weapon;
        if (typeof r === "string") return new Weapon(r);
        throw new TypeError("Can't resolve " + r + " to a Weapon.")
    },
    resolveRarity: r => ["Uncommon", "Rare", "Epic", "Legendary", "Relic", "Contraband"][r]
};
