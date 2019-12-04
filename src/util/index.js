const Class = require("../structures/Class.js");
const Weapon = require("../structures/Weapon.js");

const avg = (...nums) => nums.reduce((acc, val) => acc + val) / nums.length;

const classes = ["Triggerman", "Hunter", "Run N Gun", "Spray N Pray", "Vince", "Detective", "Marksman", "Rocketeer", "Agent", "Runner", "Bowman", "Commando"];
const weapons = classes.map(n => new Class(n).weapon.name);

module.exports = {
    classes,
    gameIDregExp: /[A-Z]{2,}:[a-z0-9]]+/g,
    averageStat(structure, stat) {
        if (!structure) return;
        structure = structure.trim().toLowerCase();
        switch (structure) {
            case "class":
                const exampleStat = new Class("Triggerman")[stat];
                if (!exampleStat) break;
                if (typeof exampleStat === "number") return avg(...classes.map(n => new Class(n)[stat]));
        }
    }
};
