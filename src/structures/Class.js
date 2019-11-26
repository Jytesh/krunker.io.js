const Weapon = require("./Weapon.js");

module.exports = class {
    constructor (name = "Triggerman") {
        return {
            "Triggerman": {
                health: 100,
                name: "Triggerman",
                secondary: true,
                weapon: {
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
                    },
                    range: 700,
                    rateOfFire: 110,
                    spread: 100,
                    zoom: 1.6,
                    recoil: 0.003
                }
            }
        }[name];        
    }
}
