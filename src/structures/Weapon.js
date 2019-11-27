const Class = require("./Class.js");

// from my BetterJS
Object.prototype.forEach = function (callback) {
    Object.keys(this).forEach((key, index) => {
        callback(key, this[key], index, this);
    });
}

module.exports = class {
    constructor (name = "Assault Rifle") {
        const pistol = {
            name: "Pistol",
            class: null,
            swapTime: 350,
            aimSpeed: 120,
            speedMultiplier: 1.05,
            ammo: 10,
            reloadTime: 700,
            damage: {
                damage: 20,
                dropoff: 10,
                toNumber(){
                    return 20;
                }
                toString(){
                    return "20";
                }
            },
            range: 700,
            rateOfFire: 150,
            zoom: 1.4,
            recoil: 0.006,
            automatic: false,
            baseScore: 75,
            sight: null
        };
        
        const assaultrifle = {
            name: "Assault Rifle",
            class: "Triggerman",
            swapTime: 300,
            aimSpeed: 130,
            speedMultiplier: 0.95,
            ammo: 30,
            reloadTime: 1200,
            damage: {
                dropoff: 5,
                damage: 23,
                toNumber(){
                    return 23;
                }
                toString(){
                    return "23";
                }
            },
            range: 700,
            rateOfFire: 110,
            spread: 100,
            zoom: 1.6,
            recoil: 0.003,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot"
        };
    
        const sniperrifle = {
            name: "Sniper Rifle",
            class: "Hunter",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 0.95,
            ammo: 3,
            reloadTime: 1500,
            damage: {
                dropoff: 30,
                damage: 100,
                toNumber () {
                    return 100;
                }
                toString () {
                    return "100";
                }
            },
            range: 1000
            rateOfFire: 900,
            spread: 260,
            zoom: 2.7,
            recoil: 0.009,
            automatic: false,
            baseScore: 50,
            sight: "Scope"
        };

        const submachinegun = {
            name: "Submachine Gun",
            class: "Run N Gun",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 1.04,
            ammo: 24,
            reloadTime: 1000,
            damage: {
                damage: 18,
                dropoff: 12,
                toNumber(){
                    return 18;
                }
                toString(){
                    return "18";
                }
            },
            range: 700,
            rateOfFire: 70,
            spread: 70,
            zoom: 1.65,
            recoil: 0.0034,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot"
        };

        const lightmachinegun = {
            name: "Light Machine Gun",
            class: "Spray N Pray",
            swapTime: 700,
            aimSpeed: 200,
            speedMultiplier: 0.79,
            ammo: 60,
            reloadTime: 3500,
            damage: {
                damage: 20,
                dropoff: 10,
                toNumber(){
                    return 20;
                }
                toString(){
                    return "20";
                }
            },
            range: 700,
            rateOfFire: 120,
            spread: 300,
            zoom: 1.3,
            recoil: 0.0032,
            automatic: true,
            baseScore: 50,
            sight: "Red Dot"
        };
        
        const obj = {
            assaultrifle, sniperrifle, submachinegun, lightmachinegun
        }[str.split(" ").join("").toLowerCase()];

        obj.forEach((k, v) => {
            this[k] = v;
        });

        return obj;
    }
}
