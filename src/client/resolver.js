const Class = require("../structures/Class.js");
const Weapon = require("../structures/Weapon.js");

const classArr = ["Triggerman", "Hunter", "Run N Gun", "Spray N Pray", "Vince", "Detective", "Marksman", "Rocketeer", "Agent", "Runner", "Bowman", "Commando"];
const weaponArr = classes.map(n => new Class(n).weapon.name);

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
        return classArr;
    }
};
