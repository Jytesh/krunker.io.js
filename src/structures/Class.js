const Weapon = require("./Weapon.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class {
    constructor (name = "Triggerman") {
        const triggerman = {
            health: 100,
            name: "Triggerman",
            secondary: true,
            weapon: new Weapon("Assault Rifle")
        };
        
        const hunter = {
            health: 60,
            name: "Hunter",
            secondary: true,
            weapon: new Weapon("Sniper Rifle")
        };
        
        const runngun = {
            health: 100,
            name: "Run N Gun",
            secondary: false,
            weapon: new Weapon("Submachine Gun")
        };
        
        const spraynpray = {
            health: 170,
            name: "Spray N Pray",
            secondary: true,
            weapon: new Weapon("Light Machine Gun")
        };
        
        const obj = {
            triggerman, hunter, runngun, spraynpray
        }[name.toLowerCase()];
        
        obj.forEach((k, v) => {
            this[k] = v;
        });
        
        return obj;
    }
}
