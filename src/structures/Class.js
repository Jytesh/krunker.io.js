const Weapon = require("./Weapon.js");

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
        
        const runNgun = {
            health: 100,
            name: "Run N Gun",
            secondary: false,
            weapon: new Weapon("Submachine Gun")
        };
        
        return {
            triggerman, hunter, runNgun
        }[name.toLowerCase()];        
    }
}
