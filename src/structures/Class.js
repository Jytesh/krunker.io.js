const Weapon = require("./Weapon.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class Class {
    constructor (name = "Triggerman") {
        const triggerman = {
            health: 100,
            name: "Triggerman",
            secondary: true,
            weapon: new Weapon("Assault Rifle"),
            toString(){
                return "Triggerman";
            }
        };
        
        const hunter = {
            health: 60,
            name: "Hunter",
            secondary: true,
            weapon: new Weapon("Sniper Rifle"),
            toString(){
                return "Hunter";
            }
        };
        
        const runngun = {
            health: 100,
            name: "Run N Gun",
            secondary: false,
            weapon: new Weapon("Submachine Gun"),
            toString(){
                return "Run N Gun";
            }
        };
        
        const spraynpray = {
            health: 170,
            name: "Spray N Pray",
            secondary: true,
            weapon: new Weapon("Light Machine Gun"),
            toString(){
                return "Spray N Pray";
            }
        };
        
        const vince = {
            health: 100,
            name: "Vince",
            secondary: true,
            weapon: new Weapon("Shotgun"),
            toString(){
                return "Vince";
            }
        };
        
        const detective = {
            health: 100,
            name: "Detective",
            secondary: false,
            weapon: new Weapon("Revolver"),
            toString(){
                return "Detective";
            }
        };
        
        const marksman = {
            health: 90,
            name: "Marksman",
            secondary: true,
            weapon: new Weapon("Semi Auto"),
            toString(){
                return "Marksman";
            }
        };
        
        const rocketeer = {
            health: 130,
            name: "Rocketeer",
            secondary: true,
            weapon: new Weapon("Rocket Launcher"),
            toString(){
                return "Rocketeer";
            }
        };
    
        const agent = {
            health: 100,
            name: "Agent",
            secondary: false,
            weapon: new Weapon("Akimbo Uzi"),
            toString(){
                return "Agent";
            }
        };
        
        const runner = {
            health: 100,
            name: "Runner",
            secondary: false,
            weapon: new Weapon("Combat Knife"),
            toString(){
                return "Runner";
            }
        };
        
        const bowman = {
            health: 100,
            name: "Bowman",
            secondary: true,
            weapon: new Weapon("Crossbow"),
            toString(){
                return "Bowman";
            }
        };
        
        const commando = {
            health: 100,
            name: "Commando",
            secondary: true,
            weapon: new Weapon("Famas"),
            toString(){
                return "Commando";
            }
        };
        
        const obj = {
            triggerman, hunter, runngun, spraynpray, vince, detective, marksman, rocketeer, agent, runner, bowman, commando
        }[name.split(" ").join("").toLowerCase()];
        
        obj.forEach((k, v) => {
            this[k] = v;
        });
        
        return obj;
    }
}
