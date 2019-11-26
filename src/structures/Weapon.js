module.exports = class {
    constructor (name = "Assault Rifle") {
        const assaultRifle = {
            name: "Assault Rifle",
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
            recoil: 0.003
        };
    
        const sniperRifle = {
            name: "Sniper Rifle",
            swapTime: 300,
            aimSpeed: 120,
            speedMultiplier: 0.95,
            ammo: 3,
            reloadTime: 1500,
            damage: {
                dropoff: 30,
                damage: 100
            },
            range: 1000
            rateOfFire: 900,
            spread: 260,
            zoom: 2.7,
            recoil: 0.009
        };

        const submachineGun = {
            name: "Submachine Gun",
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
                    return 12;
                }
            },
            range: 700,
            rateOfFire: 70,
            spread: 70,
            zoom: 1.65,
            recoil: 0.0034
        };
        
        return {
            assaultRifle, sniperRifle
        }[str.split(" ")[0].toLowerCase() + (str.split(" ")[1] ? str.split(" ")[1][0].toUpperCase() + str.split(" ")[1].toLowerCase().substring(1) : "")];
    }
}
